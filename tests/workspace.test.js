import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { materials } from '../laser-materials.js';
import { emptyWorkspace, initialProfile, clone, speedDisplay, speedStorage, stockSignature, testComplete, testMatches, testSuccess, choicesFor, duplicateMaterial, deleteMaterial, parseWorkspace, validateTest } from '../src/domain.js';
import { startingSettings, exportRows, libraryXml, selectionSummary, parentSelection, testPattern, projectXml, patternSvg } from '../src/exports.js';
import { importMachineSettings, GitHubConnection } from '../src/sync.js';

const mdf=materials.find(m=>m.id==='mdf');
function exactTest(overrides={}) {
  const p=initialProfile();return {id:'test-1',materialId:'mdf',process:'cutting',date:'2026-09-23',profileId:p.id,profileSnapshot:clone(p),thicknessMm:3,variant:'',stockSignature:stockSignature(mdf,3,''),speed:18,minPower:70,maxPower:75,passes:1,focusMm:0,lensInches:2,air:'Firm dry air',intervalMm:null,outcome:'through',...overrides};
}
function config(overrides={}) {return {type:'cutting',thicknessMm:3,rows:3,cols:3,speedMin:10,speedMax:20,powerMin:60,powerMax:80,minMode:'fixed',controllerMin:10,passes:1,intervalMm:0.1,cellMm:10,gapMm:6,marginMm:5,scrapWidth:100,scrapHeight:100,overscanMm:10,fitMin:-0.2,fitMax:0.2,...overrides};}

test('the original MDF observations remain one-pass reports with unknown exact settings',()=>{
  for(const thickness of [3,4]) {const r=mdf.cutting.find(r=>r.thicknessMm===thickness);assert.equal(r.testDate,'2026-09-22');assert.equal(r.testReport.passes,1);assert.equal(r.testReport.exactSpeedMmPerSec,null);assert.equal(r.testReport.exactPowerPercent,null);assert.match(r.testedRecipe,/exact speed and power pair not recorded/);}
});
test('unit changes round-trip canonical speeds; blanks remain missing',()=>{
  assert.equal(speedDisplay(12.5,'mm/min'),750);assert.equal(speedStorage(750,'mm/min'),12.5);assert.equal(speedStorage(null,'mm/min'),null);
  const p=initialProfile();assert.equal(p.maxPowerPercent,null);assert.equal(p.maxCutSpeed,null);assert.equal(p.maxEngraveSpeed,null);assert.equal(p.lensConfirmed,false);
});
test('complete successful tests qualify only their original laser, lens and stock',()=>{
  const p=initialProfile(),t=exactTest(),w=emptyWorkspace();w.tests.push(t);
  assert.ok(testComplete(t)&&testSuccess(t)&&testMatches(t,p,mdf));
  assert.equal(choicesFor(mdf,'cutting',3,p,w)[0].kind,'tested');
  assert.ok(!testMatches(t,{...p,watts:80},mdf));assert.equal(t.profileSnapshot.watts,60);
  assert.ok(!testMatches({...t,lensInches:1.5},p,mdf));assert.ok(!testMatches(t,p,{...mdf,grade:'Different batch grade'}));
  assert.ok(!testComplete({...t,minPower:null}));assert.ok(!testComplete({...t,air:''}));assert.ok(!testSuccess({...t,outcome:'partial'}));
  w.tests.push(exactTest({id:'failed',outcome:'failed'}));assert.ok(!choicesFor(mdf,'cutting',3,p,w).some(c=>c.recipe.id==='failed'));
});
test('RF and different wattages do not inherit glass-tube tested status',()=>{
  const p=initialProfile(),w=emptyWorkspace();w.tests=[exactTest()];
  assert.equal(choicesFor(mdf,'cutting',3,{...p,source:'co2-rf'},w).length,0);
  const choices=choicesFor(mdf,'cutting',3,{...p,watts:40},{...w,allowEstimates:true});
  assert.ok(choices.length);assert.ok(choices.every(c=>c.kind==='estimate' && c.recipe.testReport===null));
});
test('duplicate and delete preserve the original data and leave unavailable pins',()=>{
  const copied=duplicateMaterial(mdf,'copy');assert.equal(copied.cutting.find(r=>r.id==='C02').testReport,null);assert.match(copied.cutting[0].evidence,/untested/);
  assert.equal(mdf.cutting.find(r=>r.id==='C02').testDate,'2026-09-22');
  const w=emptyWorkspace();w.tests=[exactTest()];w.archivedIds=['mdf'];w.pins=[{id:'pin',materialId:'mdf'}];
  const next=deleteMaterial(w,'mdf');assert.equal(next.tests.length,0);assert.equal(next.pins.length,1);assert.deepEqual(next.deletedIds,['mdf']);assert.equal(w.tests.length,1);
});
test('backups round-trip data and reject malformed versions, profiles, tests and prototype keys',()=>{
  const w=emptyWorkspace();w.tests=[exactTest()];const round=parseWorkspace(JSON.stringify(w),materials);assert.deepEqual(round,w);
  assert.throws(()=>parseWorkspace('{"schemaVersion":999}'),/version/);
  assert.throws(()=>parseWorkspace(JSON.stringify({...w,activeProfileId:'missing'}),materials),/active laser/);
  assert.throws(()=>parseWorkspace(JSON.stringify({...w,tests:[exactTest({speed:-1})]}),materials),/invalid test/);
  assert.throws(()=>parseWorkspace('{"__proto__": {"polluted":true}}'),/Unsupported/);
  assert.ok(validateTest(exactTest({minPower:90,maxPower:70})).length);
});
test('LightBurn export preserves controller Min/Max and distinguishes evidence and surface entries',()=>{
  const w=emptyWorkspace(),p=initialProfile(),rows=exportRows(materials,p,w);
  const mdfRow=rows.find(r=>r.material.id==='mdf'&&r.option.recipe.id==='C02');
  assert.deepEqual([mdfRow.settings.speed,mdfRow.settings.minPower,mdfRow.settings.maxPower],[20,70,70]);
  const delrin=rows.find(r=>r.material.id==='acetal'&&r.option.recipe.id==='C32');assert.equal(delrin.reason,'');assert.equal(delrin.settings.minPower,10);assert.equal(delrin.settings.maxPower,90);
  const engrave=rows.find(r=>r.material.id==='mdf'&&r.option.recipe.id==='E06');
  const xml=libraryXml(rows,new Set([mdfRow.key,delrin.key,engrave.key]),p);
  assert.match(xml,/<Entry Thickness="-1.0000"/);assert.match(xml,/<minPower Value="10"\/><maxPower Value="90"/);assert.match(xml,/formaldehyde/i);
  assert.match(xml,/exact speed\/power not recorded/);assert.match(xml,/TEST STARTING POINT/);assert.doesNotMatch(xml,/TESTED 2026-09-22/);
  assert.match(xml,/<zOffset Value="0"/);assert.match(xml,/<runBlower Value="1"/);
  const mos=rows.find(r=>r.option.recipe.id==='E32');assert.match(mos.reason,/No verified numeric/);assert.throws(()=>libraryXml(rows,new Set([mos.key]),p),/No verified numeric/);
  assert.throws(()=>libraryXml(rows,new Set(),p),/Select at least/);
});
test('export identifiers remain unique for shared recipe IDs, variants and methods',()=>{
  const rows=exportRows(materials,initialProfile(),emptyWorkspace());assert.equal(new Set(rows.map(r=>r.key)).size,rows.length);
  const shared=rows.filter(r=>r.option.recipe.id==='C16');assert.ok(shared.length>=2);assert.notEqual(shared[0].key,shared[1].key);
  for(const row of rows.filter(r=>!r.reason))assert.doesNotThrow(()=>libraryXml([row],new Set([row.key]),initialProfile()));
});
test('select-all state, hidden selected counts and mixed parent state are independent of filtering',()=>{
  const rows=exportRows([mdf],initialProfile(),emptyWorkspace()).filter(r=>!r.reason);const selected=new Set(rows.map(r=>r.key));
  assert.ok(parentSelection(rows,selected).checked);selected.delete(rows[0].key);assert.ok(parentSelection(rows,selected).indeterminate);
  const summary=selectionSummary(rows,selected,[]);assert.equal(summary.hidden,selected.size);assert.equal(selected.size,rows.length-1);
  selected.clear();assert.equal(selectionSummary(rows,selected,rows).recipes,0);
});
test('grid geometry fits actual scrap, applies limits and rejects overscan overflow',()=>{
  const p=initialProfile(),c=config(),pattern=testPattern(c,p);assert.deepEqual(pattern.errors,[]);assert.equal(pattern.cells.length,9);
  assert.equal(pattern.cells[0].settings.speed,20);assert.equal(pattern.cells[0].settings.maxPower,60);
  for(const s of pattern.shapes){assert.ok(s.x>=c.marginMm);assert.ok(s.x+s.w<=pattern.width-c.marginMm);assert.ok(s.y+s.h<=pattern.height-c.marginMm);}
  assert.ok(testPattern(config({scrapWidth:30}),p).errors.length);
  assert.ok(testPattern(c,{...p,maxCutSpeed:15}).errors.some(e=>e.includes('speed')||e.includes('Speed')));
  assert.ok(testPattern(c,{...p,maxPowerPercent:70}).errors.some(e=>e.includes('Power')));
  assert.ok(testPattern(config({type:'engraving',scrapWidth:65}),p).errors.some(e=>e.includes('too small')));
  assert.equal(testPattern(config({type:'engraving',speedMax:200}),{...p,xAcceleration:100}).overscan,200);
  assert.ok(testPattern(config({rows:0}),p).errors.length);assert.ok(testPattern(config({cols:6}),p).errors.length);
});
test('native projects attach layers to geometry, retain notes, and turn label output off',()=>{
  const p=initialProfile(),c=config(),pattern=testPattern(c,p),xml=projectXml(pattern,c,p,mdf);
  assert.match(xml,/<LightBurnProject /);assert.equal((xml.match(/<Shape Type="Rect"/g)||[]).length,9);assert.equal((xml.match(/<CutSetting /g)||[]).length,10);
  assert.match(xml,/<index Value="29"\/><name Value="Labels — OUTPUT OFF"/);assert.match(xml,/<enableLaser1 Value="0"/);assert.match(xml,/<doOutput Value="0"/);
  assert.match(xml,/<Notes ShowOnLoad="1"/);assert.doesNotMatch(xml,/zOffset Value="[1-9]/);
  const svg=patternSvg(pattern,c);assert.match(svg,/width="52mm"/);assert.match(svg,/Geometry only/);
  const k=testPattern(config({type:'kerf',rows:1,cols:3,cellMm:10,scrapWidth:150}),p);assert.deepEqual(k.errors,[]);assert.equal(k.shapes.length,9);assert.equal(k.shapes[1].w,2.8);assert.equal(k.shapes[2].w,k.shapes[1].h);
});
test('Ruida and GRBL imports map observed IDs, converting GRBL speeds from mm/min',()=>{
  const result=importMachineSettings(JSON.stringify({Name:'Ruida',Settings:[{ID:'0x26',Desc:'Max travel (mm)',Value:900},{ID:'0x36',Desc:'Max travel (mm)',Value:600},{ID:'0x23',Desc:'Max speed (mm/sec)',Value:1200},{ID:'0x225',Desc:'X acceleration',Value:5000},{ID:'0x13',Desc:'Laser 1 maximum power (%)',Value:96}]}));
  assert.equal(result.changes.widthMm,900);assert.equal(result.changes.xMaxSpeed,1200);assert.equal(result.changes.maxPowerPercent,undefined);assert.equal(result.changes.watts,undefined);
  const grbl=importMachineSettings(JSON.stringify({Name:'GRBL',Settings:[{ID:'0x6e',Value:18000},{ID:'0x82',Value:400}]}));assert.equal(grbl.changes.xMaxSpeed,300);
  assert.throws(()=>importMachineSettings('{}'),/Settings array/);assert.throws(()=>importMachineSettings('not json'),/JSON/);
});
test('private sync rejects public repos and prevents stale writes',async()=>{
  const calls=[],request=async(url,options)=>{calls.push({url,options});return {ok:true,json:async()=>url.includes('/contents/')?{sha:'new-sha',encoding:'base64',content:btoa('{}')}:{private:false,permissions:{push:true}}};};
  const client=new GitHubConnection('test-token',request);
  await assert.rejects(()=>client.writeFile('owner/repo','laser-workspace.json','{}',null,'sync',true),/private repository/);assert.ok(!calls.some(c=>c.options.method==='PUT'));
  const privateClient=new GitHubConnection('test-token',async(url,options)=>({ok:true,json:async()=>url.includes('/contents/')?{sha:'new-sha',encoding:'base64',content:btoa('{}')}:{private:true,permissions:{push:true}}}));
  await assert.rejects(()=>privateClient.writeFile('owner/repo','laser-workspace.json','{}','old-sha','sync',true),/Remote data changed/);
  assert.throws(()=>client.repoPath('owner/repo/../../bad'),/owner\/repository/);
});
test('standalone build has parseable scripts, preserved analytics, and one source-data copy',()=>{
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))assert.doesNotThrow(()=>new vm.Script(match[1]));
  assert.match(html,/metrics\.localheist\.com/);assert.match(html,/setSiteId', '11'/);assert.equal((html.match(/const materials =/g)||[]).length,1);
});
