import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {materials} from '../laser-materials.js';
import {initialProfile, emptyWorkspace, upgradeStudioProfile, clone, limitErrors, profileSignature} from '../src/domain.js';
import {importMachineSettings} from '../src/sync.js';
import {profileStartingSettings, exportRows, libraryXml, singleRecipeExport} from '../src/exports.js';
import {studioProfilePatch} from '../src/studio-profile.js';

test('Studio defaults match the supplied Ruida backup without inferring optical or job limits', () => {
  const bytes = readFileSync(new URL('fixtures/laser-axis-calibrated.lbset', import.meta.url));
  const imported = importMachineSettings(bytes.toString(), 'laser-axis-calibrated.lbset').changes;
  imported.machineSettings.sourceSha256 = createHash('sha256').update(bytes).digest('hex');
  assert.deepEqual(studioProfilePatch, imported);
  const p = initialProfile();
  assert.deepEqual([p.controller,p.widthMm,p.heightMm,p.xMaxSpeed,p.yMaxSpeed], ['Ruida',400,400,500,400]);
  assert.deepEqual([p.xStepLengthUm,p.yStepLengthUm,p.xAcceleration,p.yAcceleration], [3.178801,3.182771,8000,2000]);
  assert.deepEqual([p.machineSettings.laser1MinPercent,p.machineSettings.laser1MaxPercent], [1,99]);
  assert.equal(p.maxPowerPercent,null); assert.equal(p.firingPercent,null); assert.equal(p.tubeCurrentMa,null);
  assert.equal(p.maxCutSpeed,null); assert.equal(p.maxEngraveSpeed,null); assert.equal(p.lensConfirmed,false);
  assert.equal(p.motorizedZ,false); assert.equal(p.air,''); assert.equal(p.watts,60);
});

test('returning Studio workspaces receive measured fields while retaining limits and history', () => {
  const w=emptyWorkspace(); w.profiles=[initialProfile({machine:false})];
  w.profiles[0].maxPowerPercent=75; w.profiles[0].maxCutSpeed=120;
  w.tests=[{id:'past',profileSnapshot:clone(w.profiles[0])}]; w.pins=[{id:'pin',profileSignature:profileSignature(w.profiles[0])}];
  const history=JSON.stringify({tests:w.tests,pins:w.pins});
  assert.equal(upgradeStudioProfile(w),true);
  assert.equal(w.profiles[0].xMaxSpeed,500); assert.equal(w.profiles[0].maxPowerPercent,75); assert.equal(w.profiles[0].maxCutSpeed,120);
  assert.equal(JSON.stringify({tests:w.tests,pins:w.pins}),history);
  assert.equal(upgradeStudioProfile(w),false);
});

test('a repurposed or conflicting Studio profile is not silently overwritten', () => {
  for(const patch of [{watts:80},{widthMm:600},{controller:'Trocen'},{xMaxSpeed:300}]) {
    const w=emptyWorkspace(); w.profiles=[{...initialProfile({machine:false}),...patch}];
    const before=JSON.stringify(w); assert.equal(upgradeStudioProfile(w),false); assert.equal(JSON.stringify(w),before);
  }
  const blank=initialProfile({machine:false}); assert.equal(blank.xMaxSpeed,null); assert.equal(blank.machineSettings,undefined);
});

test('range conversion respects motion limits without changing measured tests or extrapolating', () => {
  const p=initialProfile(),recipe={passes:'1',speedMmPerSec:{min:400,max:600},powerPercent:{min:8,max:15},intervalMm:0.15};
  assert.equal(profileStartingSettings(recipe,p,'engraving').speed,500);
  assert.equal(profileStartingSettings(recipe,{...p,maxEngraveSpeed:450},'engraving').speed,450);
  assert.equal(profileStartingSettings({...recipe,exactTest:true},p,'engraving').speed,600);
  const above={...recipe,speedMmPerSec:{min:550,max:600}};
  assert.equal(profileStartingSettings(above,p,'engraving').speed,600);
  assert.ok(limitErrors(profileStartingSettings(above,p,'engraving'),p,'engraving').length);
  assert.ok(limitErrors({...profileStartingSettings(recipe,p,'engraving'),speed:450},p,'cutting').some(e=>e.includes('Y-axis')));
});

test('online library export uses named surface folders and labels machine-limited reference speeds', () => {
  const p=initialProfile(),rows=exportRows(materials,p,emptyWorkspace());
  const paper=rows.find(r=>r.material.id==='paper'&&r.option.recipe.id==='E28') || rows.find(r=>r.option.recipe.id==='E28');
  assert.equal(paper.settings.speed,500); assert.equal(paper.option.recipe.speedMmPerSec.max,600);
  const selected=rows.filter(r=>['E06','E17','E18','E19'].includes(r.option.recipe.id));
  selected.push(paper);
  const xml=libraryXml(selected,new Set(selected.map(r=>r.key)),p);
  for(const title of ['Engraving','Surface marking','Coating removal','Glass frosting']) assert.ok(xml.includes(`NoThickTitle="${title}"`));
  assert.match(xml,/\/Engraving\//); assert.doesNotMatch(xml,/\/-1\.0000\//);
  assert.match(xml,/within the original 400–600 mm\/s range/);
  assert.ok(rows.filter(r=>r.speedAdjustment!=null).length>=6);
});

test('individual downloads contain only the selected thickness or surface recipe and merge under the existing material name', () => {
  const p=initialProfile(),w=emptyWorkspace(),mdf=materials.find(m=>m.id==='mdf');
  for(const [thickness,id] of [[3,'C02'],[4,'C03']]) {
    const file=singleRecipeExport(mdf,'cutting',thickness,id,'',p,w);
    assert.match(file.filename,new RegExp(`mdf-${thickness}mm-cut-${id.toLowerCase()}\\.clb$`));
    assert.equal((file.xml.match(/<Material /g)||[]).length,1);
    assert.equal((file.xml.match(/<Entry /g)||[]).length,1);
    assert.ok(file.xml.includes(`<Material name="Wood — MDF">`));
    assert.ok(file.xml.includes(`Thickness="${thickness}.0000"`));
    assert.match(file.xml,/Reported 2026-09-22: 1 pass through-cut; exact speed\/power not recorded/);
    assert.doesNotMatch(file.xml,/NoThickTitle=/);
  }
  const surface=singleRecipeExport(mdf,'engraving','E06','E06','',p,w);
  assert.equal((surface.xml.match(/<Entry /g)||[]).length,1);
  assert.match(surface.xml,/Thickness="-1.0000" NoThickTitle="Engraving"/);
  assert.match(surface.xml,/Wood — MDF\/Engraving\//);
  assert.throws(()=>singleRecipeExport(mdf,'cutting',4,'C02','',p,w),/No matching recipe/);
  assert.throws(()=>singleRecipeExport(mdf,'cutting',3,'TL-60-mdf-2','',p,w),/incomplete|unspecified/);
  assert.throws(()=>singleRecipeExport(mdf,'cutting',3,'C02','',{...p,maxPowerPercent:50},w),/allowed command limit/);
});
