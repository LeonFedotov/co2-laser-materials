import { materials, catalogMeta } from '../laser-materials.js';
import { materialPreview } from './preview.js';
import { STORAGE_KEY, clone, uid, today, numberOrNull, positive, speedDisplay, speedStorage, esc, fmt, safeUrl, initialProfile, emptyWorkspace, profileSignature, stockSignature, validateProfile, testComplete, testSuccess, testMatches, validateTest, testRecipe, allMaterials, materialThicknesses, choicesFor, materialMethods, recipeContext, recipeKey, duplicateMaterial, deleteMaterial, validateMaterial, parseWorkspace, limitErrors } from './domain.js';
import { startingSettings, exportRows, selectionSummary, parentSelection, libraryXml, recipeDescription, testPattern, patternSvg, projectXml } from './exports.js';
import { GitHubConnection, importMachineSettings } from './sync.js';

const root = document.querySelector('#laser-catalog-v4');
const $ = selector => root.querySelector(selector);
const icon = name => `<i data-lucide="${esc(name)}" aria-hidden="true"></i>`;
const icons = () => { if (typeof lucide !== 'undefined') lucide.createIcons({attrs:{width:16,height:16}}); };
const optionHtml = (items,selected) => items.map(item => { const [v,label] = Array.isArray(item) ? item : [item,item]; return `<option value="${esc(v)}" ${String(v)===String(selected)?'selected':''}>${esc(label)}</option>`; }).join('');
const field = (name,label,value='',attrs='',hint='') => `<label>${esc(label)}<input name="${name}" value="${esc(value ?? '')}" ${attrs}>${hint?`<small>${esc(hint)}</small>`:''}</label>`;
const num = (name,label,value,attrs='',hint='') => field(name,label,value,`type="number" step="any" ${attrs}`,hint);
const selectField = (name,label,items,value) => `<label>${esc(label)}<select name="${name}">${optionHtml(items,value)}</select></label>`;
const textArea = (name,label,value='',attrs='') => `<label class="lc-span">${esc(label)}<textarea name="${name}" ${attrs}>${esc(value)}</textarea></label>`;
const sourceLink = source => safeUrl(source?.url) ? `<a href="${esc(safeUrl(source.url))}" target="_blank" rel="noopener noreferrer">${esc(source.title || source.url)}</a>` : '';
const rangeText = (r,unit=false) => r?.min == null ? '—' : `${fmt(unit?speedDisplay(r.min,profile().unit):r.min)}${r.max!==r.min?'–'+fmt(unit?speedDisplay(r.max,profile().unit):r.max):''}`;
const processName = process => process === 'cutting' ? 'Cut' : 'Engrave';
let workspace = emptyWorkspace(), shared = {schemaVersion:1,materialEdits:{},customMaterials:[],archivedIds:[],tests:[]};
let loadError = '', saveError = '', expandedId = '', dialogContext = null, toastTimer, undoArchive = null, storageRevision = null;
let catalog = [], connection = null, remotePrivate = null, sharedRevision = null, sharedUnavailable = false;
let exportState = null, generatorState = null, testDraft = null, profileDraft = null;
try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) workspace = parseWorkspace(raw,materials); } catch (error) { loadError = `Stored data could not be loaded: ${error.message} Download the recovery copy before restoring a backup.`; }
storageRevision = workspace.updatedAt;
function profile() { return workspace.profiles.find(p => p.id === workspace.activeProfileId); }
function archivedIds() { return [...new Set([...(shared.archivedIds || []),...workspace.archivedIds])].filter(id => !workspace.restoredIds?.includes(id)); }
function allTests() { return [...workspace.tests,...shared.tests.filter(t => !workspace.tests.some(local=>local.id===t.id))]; }
function materialById(id) { return catalog.find(m => m.id === id); }
function stock(m) {
  if (!workspace.selections[m.id]) workspace.selections[m.id] = { thickness:m.preview.defaultThicknessMm, variant:m.preview.variants[0] || '', method:materialMethods(m,allTests())[0].id, cuttingRecipe:'', engravingRecipe:'' };
  return workspace.selections[m.id];
}
function save(replacing=false) {
  workspace.updatedAt = new Date().toISOString();
  if (loadError) { saveError = 'Recovery needed · changes in memory'; updateSaveState(); return false; }
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (!replacing && current && JSON.parse(current).updatedAt !== storageRevision) {
      saveError='Another tab changed this workspace · back up and reload';updateSaveState();return false;
    }
    localStorage.setItem(STORAGE_KEY,JSON.stringify(workspace)); storageRevision=workspace.updatedAt;saveError='';
  }
  catch { saveError='Storage full or unavailable · download a backup'; }
  updateSaveState(); return !saveError;
}
function updateSaveState() { $('#save-state').textContent = saveError || (connection ? 'Saved locally · sync on request' : 'Saved on this device'); }
function toast(message,action='') {
  clearTimeout(toastTimer); $('#toast').innerHTML=esc(message)+(action?` <button data-action="${action}">Undo</button>`:''); $('#toast').hidden=false;
  toastTimer=setTimeout(()=>$('#toast').hidden=true,7000);
}
function download(name,text,type='application/octet-stream') {
  const href=URL.createObjectURL(new Blob([text],{type})); const a=document.createElement('a'); a.href=href;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(href),1000);
}
function openPanel(title,html,wide=false,eyebrow='YOUR WORKSPACE') {
  $('#panel-title').textContent=title;$('#panel-eyebrow').textContent=eyebrow;$('#panel-body').innerHTML=html;
  $('#panel').classList.toggle('lc-wide',wide); if (!$('#panel').open) $('#panel').showModal();$('#panel').scrollTop=0;icons();
}
function formError(messages) { const box=$('#form-error');if(box){box.textContent=Array.isArray(messages)?messages.join(' '):messages;box.scrollIntoView({block:'nearest'});}else toast(String(messages)); }
const errorsBox = '<div id="form-error" class="lc-error" role="alert"></div>';
const formActions = label => `<div class="lc-form-actions"><button type="button" class="lc-btn" data-action="close">Cancel</button><button class="lc-btn lc-primary" type="submit">${label}</button></div>`;
const dataOf = form => Object.fromEntries(new FormData(form));
const readNum = (data,key) => numberOrNull(data[key]);

function currentChoice(m,process) {
  const s=stock(m), choices=choicesFor(m,process,process==='cutting'?s.thickness:s.method,profile(),workspace,s.variant,shared.tests);
  return { choices, selected: choices.find(c=>c.recipe.id===s[process+'Recipe']) || choices[0] };
}
function renderHeader() {
  const p=profile();$('#profile-select').innerHTML=optionHtml(workspace.profiles.map(p=>[p.id,p.name]),p.id);
  $('#profile-summary').textContent=`${p.widthMm} × ${p.heightMm} mm · ${p.watts} W ${p.source==='co2-glass'?'glass tube':'RF CO₂'} · ${p.controller || 'controller unspecified'}`;
  $('#estimates').checked=workspace.allowEstimates;
  $('#reference-note').textContent=`${p.watts} W references${p.source==='co2-rf'?' unavailable for RF; only your matching tests are shown':''}. ${workspace.allowEstimates?'Speed estimates are labeled; test on scrap.':'Estimates are off.'} ${p.maxPowerPercent==null || p.maxCutSpeed==null || p.maxEngraveSpeed==null ? 'Machine limits are unconfirmed — review Laser setup.' : ''}`;
  const value=$('#catalog-family').value;$('#catalog-family').innerHTML=optionHtml([['','All families'],...[...new Set(catalog.map(m=>m.family))].sort()],value);
  $('#archive-count').textContent=archivedIds().length?`(${archivedIds().length})`:''; updateSaveState();
}
function pinStatus(pin) {
  const m=materialById(pin.materialId), p=workspace.profiles.find(p=>p.id===pin.profileId);
  if (!m || archivedIds().includes(pin.materialId)) return 'Material unavailable';
  if (!p || profileSignature(p)!==pin.profileSignature) return 'Laser setup changed';
  const choices=choicesFor(m,pin.process,pin.process==='cutting'?pin.thicknessMm:pin.methodId,p,workspace,pin.variant,shared.tests);
  const match=choices.find(c=>c.recipe.id===pin.recipeId);
  if (!match || JSON.stringify(match.recipe)!==pin.recipeSnapshot) return 'Recipe changed or unavailable';
  return '';
}
function renderQuicklist() {
  $('#quicklist').innerHTML=`<div class="lc-quick-title"><h3>${icon('pin')}Quicklist <span class="lc-minor">${workspace.pins.length || ''}</span></h3><span class="lc-minor">Pinned recipes & setups</span></div>`+
    (workspace.pins.length?`<div class="lc-quick-items">${workspace.pins.map(pin=>{const stale=pinStatus(pin);return `<div class="lc-pin-item" data-stale="${Boolean(stale)}"><button data-action="open-pin" data-id="${esc(pin.id)}"><b>${esc(pin.materialName)} · ${fmt(pin.thicknessMm)} mm · ${processName(pin.process)}</b><small>${esc(stale || pin.profileName)}</small></button><button aria-label="Unpin ${esc(pin.materialName)} ${processName(pin.process)}" data-action="unpin" data-id="${esc(pin.id)}">${icon('x')}</button></div>`;}).join('')}</div>`:
    '<p class="lc-minor">Open a material and pin a cutting or engraving recipe to keep it here.</p>');
}
function processPanel(m,process) {
  const s=stock(m),cut=process==='cutting',{choices,selected}=currentChoice(m,process),r=selected?.recipe;
  const control=cut?`<label>Stock thickness · mm<select data-stock="${m.id}">${optionHtml(materialThicknesses(m,allTests()).map(t=>[t,`${fmt(t)} mm`]),s.thickness)}</select></label>`:
    `<label>Engraving method<select data-method="${m.id}">${optionHtml(materialMethods(m,allTests()).map(t=>[t.id,t.label]),s.method)}</select></label>`;
  const recipeControl=choices.length>1?`<label>Recipe / reference<select data-recipe="${m.id}" data-process="${process}">${optionHtml(choices.map(c=>[c.recipe.id,`${c.recipe.id} · ${c.recipe.exactTest?'Your tested recipe':c.kind==='estimate'?'Speed estimate':c.kind==='published'?'Thunder Nova':'Original catalog'}`]),r?.id)}</select></label>`:'';
  const settings=r?startingSettings(r):null;
  const speed=r?`${rangeText(r.speedMmPerSec,true)} ${profile().unit}`:'—';
  const power=r?.controllerPowerPercent?`${fmt(r.controllerPowerPercent.max)}% max / ${fmt(r.controllerPowerPercent.min)}% min`:r?`${rangeText(r.powerPercent)}% window`:'—';
  const pin=workspace.pins.find(p=>p.materialId===m.id && p.recipeId===r?.id && p.profileId===profile().id && p.thicknessMm===s.thickness && p.variant===s.variant && p.process===process);
  const metrics=r?[['Speed',speed],['Power',power],['Passes',r.passes || 'Unspecified'],['Focus below top',settings.focusMm==null?'Unspecified':`${fmt(settings.focusMm)} mm`],['Lens',r.lensInches?`${r.lensInches}″`:'Unspecified'],...(cut?[]:[['Interval',r.intervalMm?`${fmt(r.intervalMm)} mm`:'Unspecified']])]:[];
  return `<section class="lc-process" aria-label="${cut?'Cutting':'Engraving'}"><h3>${icon(cut?'scissors':'scan-line')}${cut?'Cutting':'Engraving & marking'}</h3><div class="lc-inline-fields">${control}${recipeControl}</div>
    ${r?`<p class="lc-evidence" data-kind="${selected.kind}">${esc(r.evidence)}</p><dl class="lc-settings">${metrics.map(([label,value])=>`<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>
    ${r.testReport?`<p class="lc-notice">${r.testReport.thicknessMm} mm MDF: through-cut in one pass · 22 Sep 2026. Exact speed/power pair was not recorded.</p>`:''}
    ${r.warning?`<p class="lc-unverified">${esc(r.warning)}</p>`:''}
    <details class="lc-recipe-detail"><summary>Setup notes & sources</summary><p>${esc(r.notes)}</p><p>Air: ${esc(r.airAssist || 'Unspecified')}${r.sourceAirValue?` · Source air value ${esc(r.sourceAirValue)} (unit unspecified)`:''}</p>${r.betweenPasses?`<p>Between passes: ${esc(r.betweenPasses)}</p>`:''}<p>${sourceLink(r.source)}</p>${(r.additionalSources||[]).map(source=>`<p>${sourceLink(source)}</p>`).join('')}${r.testedRecipe?`<p>${esc(r.testedRecipe)}</p>`:''}${selected.kind==='estimate'?`<p>Estimated speed = original 60 W speed × ${profile().watts}/60. No measured transfer between machines.</p>`:''}</details>`:
    `<p class="lc-no-settings">${esc(m[process+'Availability'] || 'No matching recipe for this laser and stock.')}</p>`}
    <div class="lc-process-actions"><button class="lc-btn" data-action="record-test" data-id="${m.id}" data-process="${process}">${icon('clipboard-plus')}Record test</button><button class="lc-btn" data-action="generate" data-id="${m.id}" data-process="${process}">${icon('grid-3x3')}Generate test</button>${r?`<button class="lc-btn" aria-pressed="${Boolean(pin)}" data-action="pin" data-id="${m.id}" data-process="${process}" aria-label="${pin?'Unpin':'Pin'} ${esc(m.name)} ${processName(process)}">${icon('pin')}${pin?'Pinned':'Pin'}</button>`:''}</div>
  </section>`;
}
function materialInfo(m) {
  const s=stock(m),tests=allTests().filter(t=>t.materialId===m.id);
  return `<details class="lc-material-info"><summary>Material information & test history${tests.length?' · '+tests.length+' records':''}</summary>
    <p>${esc(m.qualification)}</p><p>${esc([m.composition,m.grade,m.supplier].filter(Boolean).join(' · '))}</p><p><b>Face:</b> ${esc(m.surface)} <b>Edge:</b> ${esc(m.edge)}</p>
    ${m.preview.variants.length?`<label>Stock variant<select data-variant="${m.id}">${optionHtml(m.preview.variants,s.variant)}</select></label>`:''}
    ${m.warnings.map(w=>`<p class="lc-warning-detail"><b>${esc(w.label)}.</b> ${esc(w.reason)} ${esc(w.nextStep)} ${sourceLink(w.source)}</p>`).join('')}
    ${tests.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(t=>`<div class="lc-history-item"><b>${esc(t.date)} · ${fmt(t.thicknessMm)} mm · ${processName(t.process)} · ${esc(t.outcome)}</b><p>${esc(t.profileSnapshot.name)} · ${t.profileSnapshot.watts} W · ${fmt(t.speed)} mm/s · ${fmt(t.minPower)}/${fmt(t.maxPower)}% Min/Max · ${fmt(t.passes)} passes</p><p>${testComplete(t)?(testMatches(t,profile(),m)?'Exact settings on this laser setup':'Recorded on a different setup'):'Partial observation — exact preset unavailable'}</p><p>${esc(t.notes || '')}</p>${t.photo?`<img class="lc-photo" src="${esc(t.photo)}" alt="Test result for ${esc(m.name)} on ${esc(t.date)}">`:''}${testComplete(t)&&testSuccess(t)&&testMatches(t,profile(),m)?`<button class="lc-btn" data-action="prefer" data-id="${t.id}">Use as preferred recipe</button>`:''}</div>`).join('') || '<p class="lc-minor">Record a test to keep the exact settings and result here.</p>'}
  </details>`;
}
function card(m) {
  const s=stock(m),expanded=expandedId===m.id,w=m.warnings[0];
  return `<article class="lc-material" id="material-${m.id}" aria-label="${esc(m.name)}" data-id="${m.id}" data-expanded="${expanded}">
    <div class="lc-tile-wrap"><button class="lc-tile-button" data-action="toggle" data-id="${m.id}" aria-expanded="${expanded}" aria-controls="detail-${m.id}" aria-label="${expanded?'Collapse':'Expand'} ${esc(m.name)} cutting and engraving instructions">
      <span class="lc-tile-heading">${icon(m.icon || 'layers')}<span class="lc-tile-name">${esc(m.tileName || m.name)}</span></span>
      <span class="lc-tile-pictures"><span class="lc-tile-isometric">${materialPreview(m,s.thickness,'iso-'+m.id,s.variant)}</span><span class="lc-tile-profile"><span>Edge</span><span>${materialPreview(m,s.thickness,'edge-'+m.id,s.variant,'edge-profile')}</span></span></span>
      <span class="lc-tile-footer">${w?`<span class="lc-red-tag">${icon('triangle-alert')}${esc(m.id==='acetal'?'Formaldehyde':w.label)}</span>`:'<span>View settings</span>'}<span>${fmt(s.thickness)} mm</span></span>
    </button><details class="lc-card-menu"><summary aria-label="Manage ${esc(m.name)}">${icon('ellipsis')}</summary><div class="lc-menu-items">${[['edit-material','pencil','Edit'],['duplicate','copy','Duplicate'],['archive','archive','Archive']].map(([action,glyph,label])=>`<button class="lc-btn lc-quiet" data-action="${action}" data-id="${m.id}">${icon(glyph)}${label}</button>`).join('')}</div></details></div>
    <div class="lc-detail-panel" id="detail-${m.id}" ${expanded?'':'hidden'}>${expanded?`<div class="lc-panel-bar"><h2>${esc(profile().name)} · ${profile().watts} W</h2><button class="lc-btn lc-quiet" data-action="toggle" data-id="${m.id}">${icon('chevron-up')}Collapse</button></div>
      ${m.id==='acetal'?'<p class="lc-hazard">Formaldehyde fumes: effective source extraction is required. Air assist is not fume capture.</p>':m.warnings.some(w=>w.label==='Do not laser')?`<p class="lc-hazard">${esc(m.warnings[0].reason)}</p>`:''}
      <div class="lc-processes">${processPanel(m,'cutting')}${processPanel(m,'engraving')}</div>${materialInfo(m)}`:''}</div></article>`;
}
function filterCatalog() {
  const words=$('#catalog-search').value.trim().toLowerCase().normalize('NFKD').split(/\s+/).filter(Boolean),family=$('#catalog-family').value,quick=$('#quick-only').checked,archive=archivedIds();
  let count=0;
  for (const el of $('#material-list').querySelectorAll('article')) {
    const m=materialById(el.dataset.id),text=[m.name,m.family,m.grade,m.composition,m.qualification,...m.warnings.map(w=>w.label)].join(' ').toLowerCase().normalize('NFKD');
    el.hidden=archive.includes(m.id)||(family&&m.family!==family)||!words.every(w=>text.includes(w))||(quick&&!workspace.pins.some(p=>p.materialId===m.id));if(!el.hidden)count++;
  }
  $('#material-count').textContent=`${count} of ${catalog.length-archive.filter(id=>materialById(id)).length} materials`;
  $('#no-results').hidden=count!==0;
}
function renderCatalog() {
  catalog=allMaterials(materials,workspace,shared); renderHeader();renderQuicklist();
  $('#material-list').innerHTML=catalog.map(card).join('')+'<p id="no-results" class="lc-no-results" hidden>No materials match. Try another search or turn off Quicklist only.</p>';
  filterCatalog();icons();
}
function renderMaterial(id) {
  const element=$('#material-'+id),m=materialById(id);if(element&&m)element.outerHTML=card(m);icons();filterCatalog();
}

function openProfile(id=profile().id) {
  profileDraft=clone(workspace.profiles.find(p=>p.id===id) || {...initialProfile(),id:uid('laser'),name:'New laser',model:'Custom',provenance:{widthMm:'Template · unconfirmed',heightMm:'Template · unconfirmed',watts:'Template · unconfirmed',lensInches:'Suggested · unconfirmed'}});
  profileForm();
}
function profileForm() {
  const p=profileDraft;
  openPanel('Laser setup',`<div class="lc-toolbar-actions"><button class="lc-btn" data-action="new-profile">${icon('plus')}New laser</button><label class="lc-btn">${icon('upload')}Import .lbset<input type="file" id="machine-file" accept=".lbset,.json" hidden></label></div>
    <p class="lc-notice">Rated watts describe the laser. The maximum command percentage and speed limits describe your allowed settings. Leave unknown limits blank.</p>
    <form id="profile-form">${errorsBox}<div class="lc-form-grid">
      ${field('name','Laser name',p.name,'required maxlength="80"')}${field('model','Model / template',p.model,'list="model-presets" autocomplete="off"','Templates suggest dimensions and watts; confirm them on your machine.')}
      <datalist id="model-presets"><option>Custom</option><option>Studio CO₂ — 400 × 400 / 60 W</option><option>Generic desktop — 300 × 200 / 40 W</option><option>Generic cabinet — 600 × 400 / 60 W</option><option>Generic cabinet — 900 × 600 / 100 W</option></datalist>
      ${selectField('source','Laser source',[['co2-glass','CO₂ DC glass tube'],['co2-rf','CO₂ RF']],p.source)}${field('controller','Controller',p.controller,'list="controllers" placeholder="Unspecified"')}
      <datalist id="controllers"><option>Ruida</option><option>Trocen</option><option>TopWisdom</option><option>GRBL</option><option>Other</option></datalist>
      ${num('widthMm','Work width X · mm',p.widthMm,'min="1" required list="sizes"',p.provenance.widthMm)}${num('heightMm','Work height Y · mm',p.heightMm,'min="1" required list="sizes"',p.provenance.heightMm)}
      <datalist id="sizes">${[200,300,400,500,600,900,1000,1200].map(x=>`<option>${x}</option>`).join('')}</datalist>
      ${num('watts','Rated optical output · W',p.watts,'min="1" required list="watts"',p.provenance.watts)}${num('maxPowerPercent','Maximum allowed command · %',p.maxPowerPercent,'min="0.01" max="100" placeholder="Unspecified"')}
      <datalist id="watts">${[40,50,60,80,100,120,150].map(x=>`<option>${x}</option>`).join('')}</datalist>
      ${selectField('unit','Speed display units',['mm/s','mm/min'],p.unit)}<p class="lc-minor">All stored speeds use mm/s. Switching units converts existing values.</p>
      ${num('maxCutSpeed','Cutting speed limit · '+p.unit,speedDisplay(p.maxCutSpeed,p.unit),'min="0.001" placeholder="Unspecified"')}${num('maxEngraveSpeed','Engraving speed limit · '+p.unit,speedDisplay(p.maxEngraveSpeed,p.unit),'min="0.001" placeholder="Unspecified"')}
      ${num('lensInches','Lens focal length · inches',p.lensInches,'min="0.1" list="lenses"',p.lensConfirmed?'Confirmed':'Suggested · confirm your installed lens')}<datalist id="lenses"><option>1.5</option><option>2</option><option>2.5</option><option>4</option></datalist>
      ${selectField('air','Air assist',[['','Unspecified'],['manual','Manual'],['switchable','Controller switchable'],['adjustable','Adjustable']],p.air)}
      <label class="lc-check lc-span"><input type="checkbox" name="lensConfirmed" ${p.lensConfirmed?'checked':''}>I confirmed the installed lens</label>
    </div><details class="lc-section"><summary>Advanced machine settings</summary><div class="lc-form-grid">
      ${selectField('origin','Origin',[['','Unspecified'],'rear-left','rear-right','front-left','front-right'],p.origin)}<label class="lc-check"><input type="checkbox" name="motorizedZ" ${p.motorizedZ?'checked':''}>Motorized Z confirmed</label>
      ${num('xMaxSpeed','X-axis max speed · '+p.unit,speedDisplay(p.xMaxSpeed,p.unit),'min="0.001"')}${num('yMaxSpeed','Y-axis max speed · '+p.unit,speedDisplay(p.yMaxSpeed,p.unit),'min="0.001"')}
      ${num('xAcceleration','X acceleration · mm/s²',p.xAcceleration,'min="0.001"')}${num('yAcceleration','Y acceleration · mm/s²',p.yAcceleration,'min="0.001"')}
      ${num('tubeCurrentMa','Tube-current limit · mA',p.tubeCurrentMa,'min="0.001"')}${num('firingPercent','Minimum firing command · %',p.firingPercent,'min="0.01" max="100"')}
    </div><p class="lc-minor">These values are records of your setup. Import and export do not write firmware settings or command Z motion.</p></details>${formActions('Save laser')}</form>`);
}
function readProfileForm(form) {
  const data=dataOf(form),next={...clone(profileDraft),name:data.name.trim(),model:data.model.trim(),source:data.source,controller:data.controller.trim(),air:data.air,origin:data.origin,unit:data.unit,lensConfirmed:Boolean(data.lensConfirmed),motorizedZ:Boolean(data.motorizedZ)};
  for(const key of ['widthMm','heightMm','watts','maxPowerPercent','lensInches','xAcceleration','yAcceleration','tubeCurrentMa','firingPercent']) next[key]=readNum(data,key);
  for(const key of ['maxCutSpeed','maxEngraveSpeed','xMaxSpeed','yMaxSpeed']) next[key]=speedStorage(readNum(data,key),profileDraft.unit);
  for(const key of Object.keys(next)) if(['string','number'].includes(typeof next[key]) && next[key]!==profileDraft[key]) next.provenance[key]='User entered';
  return next;
}

function openMaterialForm(id) {
  const m=id?clone(materialById(id)):{id:uid('material'),name:'',family:'Wood & fiber',icon:'layers',surface:'',edge:'',qualification:'',composition:'',grade:'',supplier:'',cutting:[],engraving:[],laserProfiles:[],warnings:[],availableThicknesses:[3],preview:{kind:'fiber',colors:{face:'#b79563',edge:'#7a5737',highlight:'#d9c498'},defaultThicknessMm:3,variants:[],footprintMm:[60,40],views:['isometric','edge-profile']}};
  dialogContext={type:'material',material:m,editing:Boolean(id)};
  openPanel(id?'Edit material':'Add material',`<p class="lc-notice">Keep the material identity here. Use Record test for exact settings and results; source recipes keep their original evidence.</p><form id="material-form">${errorsBox}<div class="lc-form-grid">
    ${field('name','Material name',m.name,'required maxlength="120"')}${field('family','Family',m.family,'required list="families" maxlength="80"')}<datalist id="families">${[...new Set(catalog.map(x=>x.family))].map(x=>`<option>${esc(x)}</option>`).join('')}</datalist>
    ${field('composition','Composition',m.composition,'maxlength="300"')}${field('grade','Grade',m.grade,'maxlength="150"')}${field('supplier','Supplier',m.supplier,'maxlength="150"')}${field('thicknesses','Available thicknesses · mm',(m.availableThicknesses || materialThicknesses(m)).join(', '),'required','Comma separated, for example 3, 4, 6')}
    ${num('defaultThickness','Default preview thickness · mm',m.preview.defaultThicknessMm,'min="0.05" max="40" required')}${selectField('kind','Preview texture',['fiber','wood','plywood','bamboo','clear','glass','metal','coated','paper','corrugated','leather','felt','foam','cork','slate','granite','ceramic','rubber','weave','laminate'],m.preview.kind)}
    ${field('face','Face color',m.preview.colors.face,'type="color"')}${field('edgeColor','Edge color',m.preview.colors.edge,'type="color"')}${field('highlight','Highlight color',m.preview.colors.highlight,'type="color"')}${selectField('icon','Material icon',['layers','trees','leaf','box','hexagon','square','gem','shirt','disc','flask-conical'],m.icon)}
    ${textArea('surface','Face / grain description',m.surface)}${textArea('edge','Cut edge description',m.edge)}${textArea('qualification','Material qualifications',m.qualification)}${textArea('additionalWarning','Additional warning',m.additionalWarning || '')}
    ${field('sourceUrl','Additional supporting source URL',m.sourceUrl || '','type="url" class="lc-span"')}
  </div>${m.warnings.length?`<p class="lc-notice lc-warning">${m.warnings.length} existing source warning(s) stay attached. New warnings add to them.</p>`:''}${formActions(id?'Save material':'Add material')}</form>`);
}

function openTest(id,process,seed=null) {
  const m=materialById(id),s=stock(m),r=currentChoice(m,process).selected?.recipe,values=startingSettings(r);
  const exact = r?.exactTest || (r?.speedMmPerSec?.min===r?.speedMmPerSec?.max && positive(r?.speedMmPerSec?.min));
  testDraft={ materialId:id, process, thicknessMm:s.thickness,variant:s.variant,methodId:s.method,method:process==='engraving'?materialMethods(m,allTests()).find(x=>x.id===s.method)?.label:'Through cutting',
    baseRecipeId:r?.id || '',date:today(), speed:exact?values.speed:null, minPower:r?.controllerPowerPercent?.min??null,maxPower:r?.controllerPowerPercent?.max??(r?.powerPercent?.min===r?.powerPercent?.max?values.maxPower:null),
    passes:values.passes,focusMm:values.focusMm,lensInches:profile().lensConfirmed?profile().lensInches:values.lensInches,air:values.air,intervalMm:values.intervalMm,
    outcome:'observation',notes:'',supplier:m.supplier || '',batch:'',kerfMm:null,actualThicknessMm:null,photo:null,...seed };
  testForm(m,r);
}
function testForm(m,r) {
  const t=testDraft,p=profile(),cut=t.process==='cutting';
  openPanel('Record a material test',`<p class="lc-test-context">${esc(m.name)} · ${fmt(t.thicknessMm)} mm · ${processName(t.process)} · ${esc(p.name)}</p>
    <p class="lc-notice">${t.cellLabel?`Cell ${esc(t.cellLabel)} settings are prefilled. Record the result after running it.`:'Enter the actual settings used. Unknown exact values may stay blank; the result will be a partial observation.'}${r?.speedMmPerSec?.min!==r?.speedMmPerSec?.max?` Reference speed: ${rangeText(r?.speedMmPerSec,true)} ${p.unit}.`:''}</p>
    <form id="test-form">${errorsBox}<div class="lc-form-grid">
      ${field('date','Test date',t.date,'type="date" required')}${num('thicknessMm','Nominal stock thickness · mm',t.thicknessMm,'required min="0.001"')}
      ${num('speed','Actual speed · '+p.unit,speedDisplay(t.speed,p.unit),'min="0.001" placeholder="Unknown"')}${num('passes','Passes used',t.passes,'step="1" min="1" placeholder="Unknown"')}
      ${num('minPower','Controller Min · %',t.minPower,'min="0" max="100" placeholder="Unknown"')}${num('maxPower','Controller Max · %',t.maxPower,'min="0" max="100" placeholder="Unknown"')}
      ${num('focusMm','Focus below top · mm',t.focusMm,'placeholder="Unknown"')}${num('lensInches','Installed lens · inches',t.lensInches,'min="0.1" placeholder="Unknown"')}
      ${field('air','Air assist used',t.air,'placeholder="Pressure / flow, manual or off" maxlength="150"')}${cut?'':num('intervalMm','Line interval · mm',t.intervalMm,'min="0.001" placeholder="Unknown"')}
      ${selectField('outcome','Physical result',cut?[['observation','Observation only'],['through','Cut through'],['partial','Partial cut'],['failed','Failed']]:[['observation','Observation only'],['good','Good / usable'],['fair','Fair'],['poor','Poor / failed']],t.outcome)}
      ${textArea('notes','Notes / edge quality',t.notes,'maxlength="5000"')}
    </div><details class="lc-section"><summary>Stock, measurements & photo</summary><div class="lc-form-grid">
      ${field('supplier','Supplier',t.supplier,'maxlength="150"')}${field('batch','Batch / lot',t.batch,'maxlength="150"')}${num('actualThicknessMm','Measured thickness · mm',t.actualThicknessMm,'min="0.001"')}${num('kerfMm','Measured kerf · mm',t.kerfMm,'min="0"')}
      <label class="lc-span">Result photo · JPEG, PNG or WebP, up to 600 KB<input name="photo" type="file" accept="image/jpeg,image/png,image/webp"></label>
    </div></details><label class="lc-check"><input name="preferred" type="checkbox">Use as preferred recipe when the result is successful and complete</label>
    <p class="lc-minor">The laser and stock setup used today will stay attached to this record even if you edit them later.</p>${formActions('Save test')}</form>`);
}

function openExport() {
  const rows=exportRows(catalog,profile(),workspace,archivedIds(),shared.tests).map(r=>({...r,baseReason:r.reason}));
  exportState={rows,selected:new Set(),filter:'all',search:''};
  refreshExportEligibility();for(const row of rows)if(!row.reason)exportState.selected.add(row.key);
  openPanel('Export LightBurn library',`<p class="lc-test-context">${esc(profile().name)} · ${profile().watts} W · .clb material library</p><p class="lc-notice">Ranges become the single starting values shown below. Controller Min and Max are separate. A reported MDF cut does not verify the chosen point in its range.</p>
    <div class="lc-export-tools"><div class="lc-inline-fields"><label>Filter recipes<select id="export-filter">${optionHtml([['all','All operations'],['cutting','Cutting'],['engraving','Engraving'],['quick','Quicklist'],['tested','Tested on this laser']],'all')}</select></label><label>Find material<input type="search" id="export-search" placeholder="Material name"></label></div><div class="lc-toolbar-actions"><button class="lc-btn" data-action="export-all">Select all eligible</button><button class="lc-btn" data-action="export-none">Deselect all</button><button class="lc-btn" data-action="export-filtered">Select filtered results</button></div><p id="export-count" class="lc-test-context" aria-live="polite"></p></div>
    ${errorsBox}<div id="export-rows"></div><div class="lc-form-actions"><button class="lc-btn" data-action="export-notes">Download setup notes</button><button class="lc-btn lc-primary" id="export-download" data-action="export-download">${icon('download')}Download .clb</button></div>`,true);
  renderExport();
}
function refreshExportEligibility() {
  for(const row of exportState.rows) row.reason=row.baseReason || limitErrors(row.settings,profile(),row.process).join(' ');
}
function filteredExportRows() {
  const {filter,search,rows}=exportState;
  return rows.filter(r=>r.material.name.toLowerCase().includes(search.toLowerCase()) && (filter==='all'||r.process===filter||filter==='tested'&&r.option.recipe.exactTest||filter==='quick'&&workspace.pins.some(p=>p.materialId===r.material.id && p.recipeId===r.option.recipe.id && p.profileId===profile().id && p.variant===r.variant && !pinStatus(p))));
}
function renderExport() {
  const visible=filteredExportRows(),grouped=new Map();for(const row of visible){if(!grouped.has(row.material.id))grouped.set(row.material.id,[]);grouped.get(row.material.id).push(row);}
  $('#export-rows').innerHTML=[...grouped.values()].map(rows=>`<details class="lc-export-group" open><summary><input type="checkbox" data-export-parent="${rows[0].material.id}" aria-label="Select ${esc(rows[0].material.name)} recipes"><b>${esc(rows[0].material.name)}</b><span class="lc-minor">${rows.length} recipes</span></summary>
    ${rows[0].material.warnings.length?`<p class="lc-warning-detail lc-minor">${rows[0].material.warnings.map(w=>esc(w.label+': '+w.reason)).join(' ')}</p>`:''}
    ${rows.map(row=>{const index=exportState.rows.indexOf(row),r=row.option.recipe,s=row.settings;return `<div class="lc-export-row"><label class="lc-check"><input type="checkbox" data-export-row="${index}" ${exportState.selected.has(row.key)?'checked':''} ${row.reason?'disabled':''}><span><b>${row.process==='cutting'?fmt(r.thicknessMm)+' mm · Cut':'Surface · Engrave'}${row.variant?' · '+esc(row.variant):''}</b> · ${esc(r.id)}<small>${esc(row.reason || (r.exactTest?'Exact successful test · '+r.testDate:'Starting point · '+r.evidence))}</small></span></label>
      ${row.baseReason?'':`<div class="lc-export-values">${[['speed','Speed · '+profile().unit,speedDisplay(s.speed,profile().unit)],['minPower','Min · %',s.minPower],['maxPower','Max · %',s.maxPower],['passes','Passes',s.passes]].map(([key,label,value])=>`<label>${label}<input type="number" step="${key==='passes'?'1':'any'}" min="${key==='minPower'?'0':'0.001'}" ${key.includes('Power')?'max="100"':''} value="${fmt(value)}" data-export-value="${index}" data-key="${key}" aria-label="${esc(row.material.name)} ${esc(r.id)} ${label}"></label>`).join('')}</div>`}
    </div>`;}).join('')}</details>`).join('') || '<p class="lc-notice">No matching recipes. Try another filter.</p>';
  updateExportCounts();icons();
}
function updateExportCounts() {
  const visible=filteredExportRows(),counts=selectionSummary(exportState.rows,exportState.selected,visible),invalid=exportState.rows.filter(r=>exportState.selected.has(r.key)&&r.reason).length;
  $('#export-count').textContent=`${counts.recipes} recipes · ${counts.materials} materials selected${counts.hidden?` · ${counts.hidden} selected outside this filter`:''}${invalid?` · ${invalid} need attention`:''}`;
  $('#export-download').disabled=!counts.recipes||Boolean(invalid);
  for(const input of root.querySelectorAll('[data-export-parent]'))Object.assign(input,parentSelection(visible.filter(r=>r.material.id===input.dataset.exportParent),exportState.selected));
}
function openGenerator(id,process,restored=null) {
  const m=materialById(id),s=stock(m),r=currentChoice(m,process).selected?.recipe,values=startingSettings(r),p=profile();
  generatorState=restored || {id:uid('grid'),materialId:id,profileId:p.id,profileSnapshot:clone(p),variant:s.variant,methodId:s.method,method:materialMethods(m,allTests()).find(x=>x.id===s.method)?.label,baseRecipeId:r?.id || '',date:today(),
    config:{type:process,thicknessMm:s.thickness,rows:3,cols:3,speedMin:r?.speedMmPerSec?.min??null,speedMax:r?.speedMmPerSec?.max??null,powerMin:r?.powerPercent?.min??null,powerMax:r?.powerPercent?.max??null,
      minMode:r?.controllerPowerPercent?'fixed':'same',controllerMin:r?.controllerPowerPercent?.min??null,passes:values.passes??1,intervalMm:values.intervalMm,
      cellMm:10,gapMm:6,marginMm:5,scrapWidth:100,scrapHeight:100,overscanMm:process==='engraving'?10:0,focusMm:values.focusMm,lensInches:values.lensInches,air:values.air,airOn:values.airOn,fitMin:-0.2,fitMax:0.2}};
  const c=generatorState.config;
  openPanel('Generate a test',`<p class="lc-test-context">${esc(m.name)} · ${fmt(c.thicknessMm)} mm · ${esc(p.name)} · ${p.watts} W</p>
    ${m.warnings.length?`<p class="lc-notice lc-warning">${m.warnings.map(w=>esc(w.label+': '+w.reason)).join(' ')}</p>`:''}
    <p class="lc-notice">Each grid cell gets its own editable LightBurn layer. Downloading a file does not record a successful test. Labels are included with Output OFF.</p>
    <form id="generator-form">${errorsBox}<div class="lc-form-grid">
      ${selectField('type','Test type',[['cutting','Cutting speed / power'],['engraving','Engraving speed / power'],['kerf','Kerf / fit coupons']],c.type)}${num('thicknessMm','Stock thickness · mm',c.thicknessMm,'required min="0.001"')}
      ${num('speedMin','Lowest speed · '+p.unit,speedDisplay(c.speedMin,p.unit),'required min="0.001"')}${num('speedMax','Highest speed · '+p.unit,speedDisplay(c.speedMax,p.unit),'required min="0.001"')}
      ${num('powerMin','Lowest Max power · %',c.powerMin,'required min="0.01" max="100"')}${num('powerMax','Highest Max power · %',c.powerMax,'required min="0.01" max="100"')}
      ${selectField('minMode','Controller Min power',[['same','Same as each cell’s Max'],['fixed','Fixed controller Min']],c.minMode)}${num('controllerMin','Fixed controller Min · %',c.controllerMin,'min="0" max="100"')}
      ${num('rows','Speed steps / rows',c.rows,'min="1" max="5" step="1" required')}${num('cols','Power / fit steps',c.cols,'min="1" max="5" step="1" required')}
      ${num('passes','Passes',c.passes,'min="1" step="1" required')}${num('intervalMm','Engraving interval · mm',c.intervalMm,'min="0.001"')}
      ${num('scrapWidth','Scrap width · mm',c.scrapWidth,'min="1" required')}${num('scrapHeight','Scrap height · mm',c.scrapHeight,'min="1" required')}
      ${num('cellMm','Cell size · mm',c.cellMm,'min="4" required')}${num('gapMm','Gap · mm',c.gapMm,'min="0" required')}
      ${num('marginMm','Outside margin · mm',c.marginMm,'min="0" required')}${num('overscanMm','Engraving travel allowance / side · mm',c.overscanMm,'min="0" required','Confirmed X acceleration adds its calculated deceleration distance if larger. Review DSP overscan in LightBurn.')}
    </div><details class="lc-section"><summary>Focus, air & fit allowances</summary><div class="lc-form-grid">
      ${num('focusMm','Manual focus below top · mm',c.focusMm)}${num('lensInches','Installed lens · inches',c.lensInches,'min="0.1"')}${field('air','Air setup',c.air,'maxlength="150"')}<label class="lc-check"><input name="airOn" type="checkbox" ${c.airOn?'checked':''}>Air-assist layer output on</label>
      ${num('fitMin','Minimum slot allowance · mm',c.fitMin)}${num('fitMax','Maximum slot allowance · mm',c.fitMax)}
    </div><p class="lc-minor">Fit tests pair a slotted coupon with a tab. Slot width = stock thickness + allowance; kerf compensation is off. They use one speed and power (the highest speed / lowest power fields). No automatic Z motion.</p></details>
    <button class="lc-btn" type="submit">${icon('refresh-cw')}Update preview</button></form>
    <div id="pattern-result"></div>
    <label class="lc-check"><input type="checkbox" id="test-review">I reviewed the material, stock size, extraction and machine limits</label>
    <p class="lc-minor">.lbrn2 export is a beta: verify the project in LightBurn Preview and frame the job before running. Native desktop import has not yet been verified on this machine.</p>
    <div class="lc-form-actions"><button class="lc-btn" data-action="test-svg" id="svg-download">SVG geometry only</button><button class="lc-btn lc-primary" data-action="test-project" id="project-download">Download .lbrn2</button></div>
    <section class="lc-section"><h3>After running the test</h3><p>Select a cell to record its physical result. Failed and partial cuts are useful too.</p><div class="lc-grid-cells" id="grid-cells"></div></section>`,true);
  renderPattern();
}
function readGenerator() {
  const data=dataOf($('#generator-form')),c={...generatorState.config,type:data.type,minMode:data.minMode,air:data.air,airOn:Boolean(data.airOn)};
  for(const key of ['thicknessMm','rows','cols','powerMin','powerMax','controllerMin','passes','intervalMm','cellMm','gapMm','marginMm','scrapWidth','scrapHeight','overscanMm','focusMm','lensInches','fitMin','fitMax'])c[key]=readNum(data,key);
  for(const key of ['speedMin','speedMax'])c[key]=speedStorage(readNum(data,key),profile().unit);
  if(c.type==='kerf'){c.speedMin=c.speedMax;c.powerMax=c.powerMin;}
  return c;
}
function renderPattern() {
  const c=generatorState.config,m=materialById(generatorState.materialId),pattern=testPattern(c,profile());generatorState.pattern=pattern;
  if(m.warnings.some(w=>w.label==='Do not laser'))pattern.errors.unshift('This material is marked “Do not laser”. A runnable project is unavailable.');
  $('#pattern-result').innerHTML=(pattern.width?patternSvg(pattern,c):'')+`<p class="lc-test-context">Footprint ${fmt(pattern.width)} × ${fmt(pattern.height)} mm · scrap ${fmt(c.scrapWidth)} × ${fmt(c.scrapHeight)} mm${c.type==='engraving'?` · ${fmt(pattern.overscan)} mm travel allowance each side`:''}</p>`+
    (pattern.errors.length?`<p class="lc-error">${pattern.errors.map(esc).join(' ')}</p>`:'<p class="lc-positive lc-minor">Pattern fits the specified scrap and the recorded machine limits.</p>');
  $('#grid-cells').style.setProperty('--columns',Math.min(c.cols || 3,5));$('#grid-cells').innerHTML=pattern.cells.map(cell=>`<button class="lc-btn" data-action="record-cell" data-index="${cell.index}"><b>${cell.label}${cell.fit!=null?' · '+fmt(cell.fit)+' mm allowance':''}</b>${fmt(speedDisplay(cell.settings.speed,profile().unit))} ${profile().unit}<br>${fmt(cell.settings.minPower)}/${fmt(cell.settings.maxPower)}% Min/Max</button>`).join('');
  $('#svg-download').disabled=Boolean(pattern.errors.length);$('#project-download').disabled=Boolean(pattern.errors.length)||!$('#test-review').checked;icons();
}
function saveGeneratedTest() {
  const record=clone(generatorState);delete record.pattern;record.downloadedAt=new Date().toISOString();
  workspace.generatedTests=[record,...workspace.generatedTests.filter(x=>x.id!==record.id)].slice(0,30);save();
}

function openArchive() {
  const archived=catalog.filter(m=>archivedIds().includes(m.id));
  openPanel('Archived materials',`<p class="lc-notice">Archive hides a material while preserving its recipes, history and pins. Restore brings it back.</p>${archived.map(m=>`<div class="lc-history-item"><h3>${esc(m.name)}</h3><div class="lc-process-actions"><button class="lc-btn" data-action="restore-material" data-id="${m.id}">Restore</button><button class="lc-btn lc-quiet" data-action="delete-material" data-id="${m.id}">Delete permanently…</button></div></div>`).join('') || '<p>No archived materials.</p>'}`);
}
function openWorkspace() {
  openPanel('Backup, restore & sync',`${errorsBox}${loadError?`<p class="lc-error">${esc(loadError)}</p><button class="lc-btn" data-action="recovery">Download original stored data</button>`:''}${saveError?`<p class="lc-error">${esc(saveError)}</p>`:''}
    <h3>${icon('hard-drive')}Saved on this device</h3><p class="lc-notice">${workspace.profiles.length} laser profiles · ${workspace.tests.length} personal tests · ${workspace.pins.length} pins. ${workspace.updatedAt?'Last change '+esc(new Date(workspace.updatedAt).toLocaleString()):'Your workspace saves as you make changes.'}</p>
    <div class="lc-toolbar-actions"><button class="lc-btn" data-action="backup">${icon('download')}Download JSON backup</button><label class="lc-btn">${icon('upload')}Restore backup<input id="restore-file" type="file" accept=".json" hidden></label></div>
    <section class="lc-section"><h3>Recent test projects</h3><p>Reopen a generated grid after cutting to record individual cells.</p>${workspace.generatedTests.map(g=>`<p><button class="lc-text-btn" data-action="resume-grid" data-id="${g.id}">${esc(materialById(g.materialId)?.name || 'Removed material')} · ${g.config.thicknessMm} mm · ${esc(g.date)} · ${esc(g.config.type)}</button></p>`).join('') || '<p>No test projects downloaded yet.</p>'}</section>
    <section class="lc-section"><h3>${icon('cloud')}Optional GitHub connection</h3><p>Sync a personal workspace through a private repository, or publish shared material updates to this catalog. The token stays in memory until you close or refresh this page; it is never saved in a backup.</p>
      ${connection?`<p class="lc-positive">Connected as ${esc(connection.user.login)}</p><button class="lc-btn" data-action="disconnect">Disconnect</button>`:`<form id="connect-form"><div class="lc-form-grid"><label class="lc-span">Fine-grained personal access token<input name="token" type="password" autocomplete="off" required placeholder="GitHub token"></label></div><p class="lc-minor">Grant Contents read/write only for the repositories you choose. <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">Create a GitHub token</a></p><div class="lc-form-actions"><button class="lc-btn" type="submit">Connect to GitHub</button></div></form>`}
      ${connection?`<form id="sync-load-form"><div class="lc-form-grid">${field('repo','Private sync repository',remotePrivate?.repo || `${connection.user.login}/laser-workspace`,'required placeholder="owner/repository"')}</div><button class="lc-btn" type="submit">Load remote status</button></form><div id="sync-review"></div>`:''}
    </section>
    <section class="lc-section"><h3>Shared catalog updates</h3><p>Shared publishing writes material edits and selected test reports to LeonFedotov/co2-laser-materials. Profiles, pins and photos stay personal. Published source references are preserved.</p>${connection?.user.login.toLowerCase()==='leonfedotov'?'<button class="lc-btn" data-action="review-publish">Review catalog updates</button>':'<p class="lc-minor">Connect as the repository owner to publish shared changes.</p>'}</section>`);
}

function sharedData(value) {
  const checked=parseWorkspace(JSON.stringify({...emptyWorkspace(),...value}),materials);
  return {schemaVersion:1,materialEdits:checked.materialEdits,customMaterials:checked.customMaterials,archivedIds:checked.archivedIds,tests:checked.tests,publishedAt:value.publishedAt || null};
}
async function reviewPublish() {
  if(connection?.user.login.toLowerCase()!=='leonfedotov')throw new Error('Only the repository owner can publish this catalog.');
  if(sharedUnavailable)throw new Error('The shared catalog could not be loaded. Reload the page before publishing.');
  await connection.repository('LeonFedotov/co2-laser-materials');
  const remote=await connection.readFile('LeonFedotov/co2-laser-materials','catalog-overrides.json');
  if(remote.text && JSON.stringify(sharedData(JSON.parse(remote.text)))!==JSON.stringify(sharedData(shared)))throw new Error('The shared catalog changed since you opened this page. Download a backup and reload before publishing.');
  const payload={schemaVersion:1,materialEdits:{...shared.materialEdits,...workspace.materialEdits},customMaterials:[...new Map([...shared.customMaterials,...workspace.customMaterials].map(m=>[m.id,m])).values()],archivedIds:archivedIds(),tests:clone(shared.tests),publishedAt:new Date().toISOString()};
  dialogContext={type:'publish',payload,sha:remote.sha};
  openPanel('Review public catalog updates',`<p class="lc-notice lc-warning">This publishes to the public catalog and GitHub history. Review material edits and select any test reports you want to share. Shared tests include their laser setup, stock details, dates and notes. Photos are excluded.</p>${errorsBox}
    <p>${Object.keys(workspace.materialEdits).length} edited materials · ${workspace.customMaterials.length} added materials · ${workspace.archivedIds.length} archived materials.</p>
    <details class="lc-section"><summary>Material changes to publish</summary><pre class="lc-json-review">${esc(JSON.stringify({materialEdits:workspace.materialEdits,customMaterials:workspace.customMaterials,archivedIds:workspace.archivedIds},null,2))}</pre></details>
    <h3 class="lc-section">Optional test reports</h3>${workspace.tests.filter(t=>!shared.tests.some(s=>s.id===t.id)).map(t=>`<label class="lc-check"><input type="checkbox" data-publish-test="${t.id}">${esc(materialById(t.materialId)?.name || t.materialId)} · ${t.thicknessMm} mm · ${esc(t.date)} · ${esc(t.outcome)}</label>`).join('') || '<p class="lc-minor">No new personal tests to publish.</p>'}
    <div class="lc-form-actions"><button class="lc-btn" data-action="close">Cancel</button><button class="lc-btn lc-primary" data-action="publish">Publish catalog updates</button></div>`);
}
async function restoreReview(text,label) {
  const restored=parseWorkspace(text,materials);dialogContext={type:'restore',restored};
  openPanel('Review workspace restore',`<p class="lc-notice">${esc(label)} contains ${restored.profiles.length} lasers, ${restored.tests.length} tests, ${restored.customMaterials.length} custom materials and ${restored.pins.length} pins.</p><p>Restoring replaces this device’s personal workspace. Download the current backup first if you want to keep it.</p>${errorsBox}<div class="lc-form-actions"><button class="lc-btn" data-action="backup">Back up current data</button><button class="lc-btn" data-action="close">Cancel</button><button class="lc-btn lc-primary" data-action="restore-confirm">Replace local workspace</button></div>`);
}

const actions = {
  close:()=>$('#panel').close(),
  profile:()=>openProfile(),
  'new-profile':()=>openProfile('new'),
  'add-material':()=>openMaterialForm(),
  'edit-material':button=>openMaterialForm(button.dataset.id),
  toggle:button=>{const id=button.dataset.id,previous=expandedId;expandedId=expandedId===id?'':id;if(previous&&previous!==id)renderMaterial(previous);renderMaterial(id);$('#material-'+id)?.querySelector('.lc-tile-button')?.focus({preventScroll:true});},
  duplicate:button=>{const copy=duplicateMaterial(materialById(button.dataset.id),uid('material'));workspace.customMaterials.push(copy);save();renderCatalog();openMaterialForm(copy.id);},
  archive:button=>{const id=button.dataset.id;undoArchive=id;if(!workspace.archivedIds.includes(id))workspace.archivedIds.push(id);workspace.restoredIds=(workspace.restoredIds || []).filter(x=>x!==id);save();renderCatalog();toast('Material archived. History and pins are preserved.','undo-archive');},
  'undo-archive':()=>{if(undoArchive){workspace.archivedIds=workspace.archivedIds.filter(id=>id!==undoArchive);(workspace.restoredIds ||= []).push(undoArchive);save();renderCatalog();toast('Material restored.');undoArchive=null;}},
  'archive-view':openArchive,
  'restore-material':button=>{workspace.archivedIds=workspace.archivedIds.filter(id=>id!==button.dataset.id);(workspace.restoredIds ||= []).push(button.dataset.id);save();renderCatalog();openArchive();},
  'delete-material':button=>{const m=materialById(button.dataset.id);dialogContext={type:'delete',id:m.id};openPanel('Delete material permanently',`<p class="lc-error">Delete ${esc(m.name)}, its ${workspace.tests.filter(t=>t.materialId===m.id).length} personal test records and generated test history from this workspace? Pins will show “Material unavailable”. Published reference data remains in the shared catalog.</p><p>Download a backup before deleting if you may need these records again.</p><div class="lc-form-actions"><button class="lc-btn" data-action="backup">Download backup</button><button class="lc-btn" data-action="archive-view">Cancel</button><button class="lc-btn" data-action="delete-confirm">Delete from this workspace</button></div>`);},
  'delete-confirm':()=>{if(dialogContext?.type!=='delete')return;workspace=deleteMaterial(workspace,dialogContext.id);save();renderCatalog();openArchive();},
  'record-test':button=>openTest(button.dataset.id,button.dataset.process),
  prefer:button=>{const t=allTests().find(t=>t.id===button.dataset.id),m=materialById(t.materialId);if(!testComplete(t)||!testSuccess(t)||!testMatches(t,profile(),m))throw new Error('This test does not qualify the active laser and stock setup.');workspace.preferred[recipeContext(t.materialId,t.process,t.process==='cutting'?t.thicknessMm:t.methodId,profile().id,t.variant)]=t.id;stock(m)[t.process+'Recipe']=t.id;save();renderMaterial(m.id);toast('Preferred recipe saved for this laser and stock.');},
  pin:button=>{const m=materialById(button.dataset.id),process=button.dataset.process,s=stock(m),r=currentChoice(m,process).selected?.recipe;if(!r)return;const index=workspace.pins.findIndex(p=>p.materialId===m.id&&p.recipeId===r.id&&p.profileId===profile().id&&p.thicknessMm===s.thickness&&p.variant===s.variant&&p.process===process);if(index>=0)workspace.pins.splice(index,1);else workspace.pins.push({id:uid('pin'),materialId:m.id,materialName:m.name,process,thicknessMm:s.thickness,variant:s.variant,methodId:s.method,recipeId:r.id,recipeSnapshot:JSON.stringify(r),profileId:profile().id,profileName:profile().name,profileSignature:profileSignature(profile())});save();renderQuicklist();renderMaterial(m.id);filterCatalog();},
  unpin:button=>{workspace.pins=workspace.pins.filter(p=>p.id!==button.dataset.id);save();renderQuicklist();if(expandedId)renderMaterial(expandedId);filterCatalog();icons();},
  'open-pin':button=>{const pin=workspace.pins.find(p=>p.id===button.dataset.id),stale=pinStatus(pin);if(stale){toast(stale+'. The saved shortcut has not been redirected.');return;}workspace.activeProfileId=pin.profileId;const m=materialById(pin.materialId),s=stock(m);Object.assign(s,{thickness:pin.thicknessMm,variant:pin.variant,method:pin.methodId,[pin.process+'Recipe']:pin.recipeId});expandedId=m.id;$('#catalog-search').value='';$('#catalog-family').value='';save();renderCatalog();$('#material-'+m.id).scrollIntoView({block:'center',behavior:'smooth'});},
  export:openExport,
  'export-all':()=>{for(const r of exportState.rows)if(!r.reason)exportState.selected.add(r.key);renderExport();},
  'export-none':()=>{exportState.selected.clear();renderExport();},
  'export-filtered':()=>{for(const r of filteredExportRows())if(!r.reason)exportState.selected.add(r.key);renderExport();},
  'export-download':()=>{download(`CO2-${profile().watts}W-Material-Library.clb`,libraryXml(exportState.rows,exportState.selected,profile()),'application/xml');toast('LightBurn library downloaded. Review setup notes before using the presets.');},
  'export-notes':()=>download(`CO2-${profile().watts}W-Setup-Notes.txt`,exportState.rows.filter(r=>exportState.selected.has(r.key)).map(r=>`${r.material.name}\n${recipeDescription(r,r.settings,profile())}\n`).join('\n'),'text/plain'),
  generate:button=>openGenerator(button.dataset.id,button.dataset.process),
  'test-svg':()=>{if(generatorState.pattern.errors.length)throw new Error('Resolve the pattern errors first.');download(`${generatorState.materialId}-test.svg`,patternSvg(generatorState.pattern,generatorState.config),'image/svg+xml');saveGeneratedTest();},
  'test-project':()=>{if(!$('#test-review').checked)throw new Error('Review the test setup first.');download(`${generatorState.materialId}-${generatorState.config.type}-test.lbrn2`,projectXml(generatorState.pattern,generatorState.config,profile(),materialById(generatorState.materialId)),'application/xml');saveGeneratedTest();toast('Test project downloaded. Open it in LightBurn and verify Preview.');},
  'record-cell':button=>{const cell=generatorState.pattern.cells[Number(button.dataset.index)],g=generatorState;if(!cell)return;saveGeneratedTest();const m=materialById(g.materialId);Object.assign(stock(m),{thickness:g.config.thicknessMm,variant:g.variant,method:g.methodId});openTest(g.materialId,cell.process,{...cell.settings,thicknessMm:g.config.thicknessMm,variant:g.variant,methodId:g.methodId,method:g.method,gridId:g.id,cellLabel:cell.label,notes:cell.fit!=null?`Fit allowance ${cell.fit} mm; slot width ${g.config.thicknessMm+cell.fit} mm.`:'',outcome:'observation'});},
  'resume-grid':button=>{const g=workspace.generatedTests.find(g=>g.id===button.dataset.id),p=workspace.profiles.find(p=>p.id===g.profileId);if(!p||profileSignature(p)!==profileSignature(g.profileSnapshot))throw new Error('The laser setup for this saved grid has changed. Its original settings are retained in the JSON backup.');if(!materialById(g.materialId))throw new Error('The material is unavailable.');workspace.activeProfileId=p.id;save();renderCatalog();openGenerator(g.materialId,g.config.type,clone(g));},
  workspace:openWorkspace,
  backup:()=>download(`laser-workspace-${today()}.json`,JSON.stringify(workspace,null,2),'application/json'),
  recovery:()=>download(`laser-workspace-recovery-${today()}.json`,localStorage.getItem(STORAGE_KEY) || '{}','application/json'),
  'restore-confirm':()=>{if(dialogContext?.type!=='restore')return;workspace=dialogContext.restored;loadError='';save(true);expandedId='';renderCatalog();openWorkspace();toast(saveError || 'Workspace restored.');},
  disconnect:()=>{connection=null;remotePrivate=null;openWorkspace();updateSaveState();},
  'sync-push':async()=>{if(!remotePrivate)throw new Error('Load remote status first.');const payload=clone(workspace);for(const t of payload.tests)delete t.photo;remotePrivate.sha=await connection.writeFile(remotePrivate.repo,'laser-workspace.json',JSON.stringify(payload,null,2),remotePrivate.sha,'Sync personal laser workspace',true);remotePrivate.text=JSON.stringify(payload);openWorkspace();toast('Workspace synchronized to your private repository. Photos remain in your local backup.');},
  'sync-pull':()=>restoreReview(remotePrivate.text,'Private repository'),
  'review-publish':reviewPublish,
  publish:async()=>{if(dialogContext?.type!=='publish'||connection?.user.login.toLowerCase()!=='leonfedotov')return;const {payload,sha}=dialogContext;for(const input of root.querySelectorAll('[data-publish-test]:checked')){const test=clone(workspace.tests.find(t=>t.id===input.dataset.publishTest));delete test.photo;payload.tests.push(test);}await connection.writeFile('LeonFedotov/co2-laser-materials','catalog-overrides.json',JSON.stringify(payload,null,2)+'\n',sha,'Update shared material catalog');shared=payload;sharedRevision=JSON.stringify(payload);save();renderCatalog();openWorkspace();toast('Catalog updates committed. GitHub Pages will publish them shortly.');}
};

root.addEventListener('click',async event=>{
  const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
  const action=actions[button.dataset.action];if(!action)return;event.preventDefault();
  for(const menu of root.querySelectorAll('.lc-card-menu[open]'))menu.open=false;
  button.disabled=true;try{await action(button);}catch(error){formError(error.message);}finally{if(button.isConnected)button.disabled=false;}
});
root.addEventListener('input',event=>{
  const target=event.target;
  if(target.id==='catalog-search')filterCatalog();
  if(target.id==='export-search'){exportState.search=target.value;renderExport();}
  if(target.closest('#generator-form')){$('#project-download').disabled=true;$('#svg-download').disabled=true;$('#grid-cells').innerHTML='<p class="lc-minor">Update the preview to use the changed settings.</p>';$('#test-review').checked=false;}
});
root.addEventListener('change',async event=>{
  const target=event.target;
  try {
    if(target.id==='profile-select'){workspace.activeProfileId=target.value;save();renderCatalog();}
    if(['catalog-family','quick-only'].includes(target.id))filterCatalog();
    if(target.id==='estimates'){workspace.allowEstimates=target.checked;save();renderCatalog();}
    if(target.dataset.stock){stock(materialById(target.dataset.stock)).thickness=Number(target.value);save();renderMaterial(target.dataset.stock);}
    if(target.dataset.method){stock(materialById(target.dataset.method)).method=target.value;save();renderMaterial(target.dataset.method);}
    if(target.dataset.recipe){stock(materialById(target.dataset.recipe))[target.dataset.process+'Recipe']=target.value;save();renderMaterial(target.dataset.recipe);}
    if(target.dataset.variant){stock(materialById(target.dataset.variant)).variant=target.value;save();renderMaterial(target.dataset.variant);}
    if(target.closest('#profile-form')&&target.name==='unit'){const next=readProfileForm($('#profile-form'));profileDraft=next;profileForm();}
    if(target.closest('#profile-form')&&target.name==='model'){
      profileDraft=readProfileForm($('#profile-form'));const presets={'Studio CO₂ — 400 × 400 / 60 W':[400,400,60],'Generic desktop — 300 × 200 / 40 W':[300,200,40],'Generic cabinet — 600 × 400 / 60 W':[600,400,60],'Generic cabinet — 900 × 600 / 100 W':[900,600,100]};
      if(presets[target.value]){[profileDraft.widthMm,profileDraft.heightMm,profileDraft.watts]=presets[target.value];for(const key of ['widthMm','heightMm','watts'])profileDraft.provenance[key]='Model template · unconfirmed';profileForm();}
    }
    if(target.id==='machine-file'&&target.files[0]){
      if($('#profile-form'))profileDraft=readProfileForm($('#profile-form'));
      const result=importMachineSettings(await target.files[0].text());Object.assign(profileDraft,result.changes);for(const key of Object.keys(result.changes))profileDraft.provenance[key]='Imported · review before saving';profileForm();$('#form-error').className='lc-notice';$('#form-error').textContent='Imported for review: '+result.details.map(d=>`${d.field}: ${d.value}`).join('; ')+'. Rated watts, job limits, lens and origin are unchanged. Save laser to apply.';
    }
    if(target.id==='export-filter'){exportState.filter=target.value;renderExport();}
    if(target.dataset.exportRow!=null){const row=exportState.rows[Number(target.dataset.exportRow)];target.checked?exportState.selected.add(row.key):exportState.selected.delete(row.key);updateExportCounts();}
    if(target.dataset.exportParent){const rows=filteredExportRows().filter(r=>r.material.id===target.dataset.exportParent&&!r.reason);for(const row of rows)target.checked?exportState.selected.add(row.key):exportState.selected.delete(row.key);renderExport();}
    if(target.dataset.exportValue!=null){const row=exportState.rows[Number(target.dataset.exportValue)],key=target.dataset.key;row.settings[key]=key==='speed'?speedStorage(numberOrNull(target.value),profile().unit):numberOrNull(target.value);refreshExportEligibility();renderExport();}
    if(target.id==='test-review')$('#project-download').disabled=generatorState.pattern.errors.length>0||!target.checked;
    if(target.id==='restore-file'&&target.files[0])await restoreReview(await target.files[0].text(),target.files[0].name);
  } catch(error){formError(error.message);}
});
root.addEventListener('submit',async event=>{
  event.preventDefault();const form=event.target,data=dataOf(form),submit=form.querySelector('[type=submit]');if(submit)submit.disabled=true;
  try {
    if(form.id==='profile-form'){
      const next=readProfileForm(form),errors=validateProfile(next);if(errors.length)return formError(errors);
      const index=workspace.profiles.findIndex(p=>p.id===next.id);if(index>=0)workspace.profiles[index]=next;else workspace.profiles.push(next);workspace.activeProfileId=next.id;save();renderCatalog();$('#panel').close();toast('Laser saved. Historical test setups are preserved.');
    }
    if(form.id==='material-form'){
      const original=dialogContext.material,thicknesses=data.thicknesses.split(/[,;\s]+/).filter(Boolean).map(Number);
      const edit={name:data.name.trim(),tileName:data.name.trim(),family:data.family.trim(),composition:data.composition.trim(),grade:data.grade.trim(),supplier:data.supplier.trim(),availableThicknesses:thicknesses,icon:data.icon,surface:data.surface,edge:data.edge,qualification:data.qualification,additionalWarning:data.additionalWarning,sourceUrl:data.sourceUrl,
        preview:{...original.preview,kind:data.kind,defaultThicknessMm:readNum(data,'defaultThickness'),colors:{face:data.face,edge:data.edgeColor,highlight:data.highlight}},
        warnings:[...original.warnings.filter(w=>w.id!=='personal-warning'),...(data.additionalWarning.trim()?[{id:'personal-warning',label:'User qualification',severity:'red',reason:data.additionalWarning.trim(),nextStep:'',source:safeUrl(data.sourceUrl)?{title:'Supporting source',url:safeUrl(data.sourceUrl)}:null}]:[])]};
      const m={...original,...edit},errors=validateMaterial(m);if(!thicknesses.length)errors.push('Enter at least one available thickness.');if(errors.length)return formError(errors);
      const index=workspace.customMaterials.findIndex(x=>x.id===m.id);if(index>=0)workspace.customMaterials[index]=m;else if(dialogContext.editing)workspace.materialEdits[m.id]=edit;else workspace.customMaterials.push(m);
      workspace.selections[m.id]={...stock(m),thickness:m.preview.defaultThicknessMm};save();renderCatalog();$('#panel').close();toast('Material saved on this device.');
    }
    if(form.id==='test-form'){
      const m=materialById(testDraft.materialId),test={...testDraft,id:uid('test'),date:data.date,profileId:profile().id,profileSnapshot:clone(profile()),materialSnapshot:{name:m.name,composition:m.composition || '',grade:m.grade || '',supplier:m.supplier || ''},air:data.air.trim(),notes:data.notes,supplier:data.supplier,batch:data.batch,outcome:data.outcome};
      for(const key of ['thicknessMm','minPower','maxPower','passes','focusMm','lensInches','intervalMm','kerfMm','actualThicknessMm'])test[key]=readNum(data,key);
      test.speed=speedStorage(readNum(data,'speed'),profile().unit);test.stockSignature=stockSignature({...m,supplier:test.supplier || m.supplier},test.thicknessMm,test.variant);
      if (positive(test.lensInches)) test.profileSnapshot.lensInches=test.lensInches;
      const errors=validateTest(test);if(errors.length)return formError(errors);
      const photo=form.elements.photo?.files[0];if(photo){if(photo.size>600_000 || !['image/jpeg','image/png','image/webp'].includes(photo.type))return formError('Choose a JPEG, PNG or WebP image no larger than 600 KB.');test.photo=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(photo);});}
      workspace.tests.push(test);const qualifies=testComplete(test)&&testSuccess(test)&&testMatches(test,profile(),m);
      if(data.preferred&&qualifies){workspace.preferred[recipeContext(m.id,test.process,test.process==='cutting'?test.thicknessMm:test.methodId,profile().id,test.variant)]=test.id;stock(m)[test.process+'Recipe']=test.id;}
      stock(m).thickness=test.thicknessMm;expandedId=m.id;save();renderCatalog();$('#panel').close();toast(qualifies?'Successful exact test saved.':'Test observation saved; it remains separate from exact successful presets.');
    }
    if(form.id==='generator-form'){generatorState.config=readGenerator();renderPattern();}
    if(form.id==='connect-form'){const candidate=new GitHubConnection(data.token.trim());await candidate.authenticate();connection=candidate;form.elements.token.value='';openWorkspace();updateSaveState();}
    if(form.id==='sync-load-form'){
      const repo=data.repo.trim();await connection.repository(repo,true);const remote=await connection.readFile(repo,'laser-workspace.json');if(remote.text)parseWorkspace(remote.text,materials);remotePrivate={repo,...remote};
      $('#sync-review').innerHTML=`<p class="lc-notice">${remote.text?'A remote workspace exists. Choose which copy to use.':'No remote workspace exists yet.'} Personal sync excludes photos; the JSON backup includes them.</p><div class="lc-toolbar-actions"><button class="lc-btn" data-action="sync-push">Upload this workspace</button>${remote.text?'<button class="lc-btn" data-action="sync-pull">Review remote workspace</button>':''}</div>`;
    }
  } catch(error){formError(error.message);}finally{if(submit?.isConnected)submit.disabled=false;}
});
root.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#panel').open&&expandedId){const id=expandedId;expandedId='';renderMaterial(id);$('#material-'+id)?.querySelector('.lc-tile-button')?.focus();}});
window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY&&event.newValue){if($('#panel').open){saveError='Another tab changed this workspace · back up and reload';updateSaveState();toast(saveError);}else{try{workspace=parseWorkspace(event.newValue,materials);storageRevision=workspace.updatedAt;renderCatalog();toast('Workspace updated from another tab.');}catch{toast('Another tab saved incompatible data. Download a backup before reloading.');}}}});

renderCatalog();
if(loadError){saveError='Recovery needed · stored data preserved';updateSaveState();toast(loadError);}
if(location.protocol==='http:'||location.protocol==='https:'){
  fetch('./catalog-overrides.json',{cache:'no-store'}).then(async response=>{if(!response.ok)throw new Error('Shared catalog unavailable');const text=await response.text();shared=sharedData(JSON.parse(text));sharedRevision=text;renderCatalog();}).catch(()=>{sharedUnavailable=true;$('#reference-note').textContent+=' Shared updates could not be loaded; showing bundled references and local edits.';});
}
