import { resolveSettings, thicknessOptions, engravingOptions } from './references.js';
import { studioProfilePatch } from './studio-profile.js';

export const STORAGE_KEY = 'co2-material-workspace-v1';
export const clone = value => structuredClone(value);
export const uid = prefix => `${prefix}-${crypto.randomUUID()}`;
export const today = () => new Date().toLocaleDateString('en-CA');
export const numberOrNull = value => value === '' || value == null ? null : Number(value);
export const positive = value => Number.isFinite(value) && value > 0;
export const speedDisplay = (value, unit) => value == null ? null : value * (unit === 'mm/min' ? 60 : 1);
export const speedStorage = (value, unit) => value == null ? null : value / (unit === 'mm/min' ? 60 : 1);
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const fmt = value => value == null ? '—' : String(Number(Number(value).toFixed(3)));
export const safeUrl = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };

export function initialProfile({ machine = true } = {}) {
  const p = { id: 'studio-co2', name: 'Studio CO₂', model: 'Custom', source: 'co2-glass', widthMm: 400, heightMm: 400,
    watts: 60, maxPowerPercent: null, maxCutSpeed: null, maxEngraveSpeed: null, controller: '', lensInches: 2,
    lensConfirmed: false, air: '', unit: 'mm/s', origin: '', motorizedZ: false, xMaxSpeed: null, yMaxSpeed: null,
    xAcceleration: null, yAcceleration: null, tubeCurrentMa: null, firingPercent: null,
    provenance: { widthMm: 'Known setup', heightMm: 'Known setup', watts: 'Known setup', source: 'Known setup', lensInches: 'Suggested · unconfirmed' } };
  return machine ? applyStudioProfile(p) : p;
}
export function applyStudioProfile(p) {
  const patch = clone(studioProfilePatch), provenance = {...p.provenance};
  for (const key of Object.keys(patch)) provenance[key] = `Imported · ${patch.machineSettings.sourceFile}`;
  return {...clone(p), ...patch, provenance};
}
export function upgradeStudioProfile(workspace) {
  const p = workspace.profiles.find(p => p.id === 'studio-co2');
  if (!p || p.machineSettings?.sourceSha256 === studioProfilePatch.machineSettings.sourceSha256) return false;
  // Only update the original Studio machine, preserving custom limits and every historical snapshot.
  if (p.watts !== 60 || p.source !== 'co2-glass' || p.widthMm !== 400 || p.heightMm !== 400) return false;
  for (const key of Object.keys(studioProfilePatch).filter(key => key !== 'machineSettings')) {
    if (p[key] != null && p[key] !== '' && p[key] !== studioProfilePatch[key]) return false;
  }
  workspace.profiles[workspace.profiles.indexOf(p)] = applyStudioProfile(p);
  return true;
}
export function emptyWorkspace() {
  return { schemaVersion: 1, profiles: [initialProfile()], activeProfileId: 'studio-co2', materialEdits: {}, customMaterials: [],
    archivedIds: [], deletedIds: [], tests: [], pins: [], preferred: {}, selections: {}, generatedTests: [], allowEstimates: false, updatedAt: null };
}
export function profileSignature(p) {
  const original = ['source','watts','widthMm','heightMm','controller','lensInches','air','maxPowerPercent',
    'maxCutSpeed','maxEngraveSpeed','origin','motorizedZ','xMaxSpeed','yMaxSpeed','xAcceleration','yAcceleration','tubeCurrentMa','firingPercent'].map(k => p[k] ?? null);
  const recorded = [p.xStepLengthUm,p.yStepLengthUm,p.machineSettings?.startSpeed,p.machineSettings?.laser1MinPercent,p.machineSettings?.laser1MaxPercent].map(value => value ?? null);
  return JSON.stringify(recorded.some(value => value != null) ? original.concat(recorded) : original);
}
export function stockSignature(m, thickness, variant = '') {
  return JSON.stringify([m.id, m.composition || '', m.grade || '', m.supplier || '', thickness, variant]);
}
export function validateProfile(p) {
  const errors = [];
  if (!p.name?.trim()) errors.push('Give this laser a name.');
  for (const [key,label] of [['widthMm','Work width'],['heightMm','Work height'],['watts','Rated watts']]) if (!positive(p[key])) errors.push(`${label} must be greater than zero.`);
  for (const key of ['maxCutSpeed','maxEngraveSpeed','lensInches','xMaxSpeed','yMaxSpeed','xAcceleration','yAcceleration','tubeCurrentMa','xStepLengthUm','yStepLengthUm']) {
    if (p[key] != null && !positive(p[key])) errors.push(`${key} must be positive or unspecified.`);
  }
  for (const key of ['maxPowerPercent','firingPercent']) if (p[key] != null && (!Number.isFinite(p[key]) || p[key] <= 0 || p[key] > 100)) errors.push('Power limits must be between 0 and 100%.');
  if (p.maxPowerPercent != null && p.firingPercent != null && p.firingPercent > p.maxPowerPercent) errors.push('Firing threshold exceeds the maximum allowed power.');
  if (!['co2-glass','co2-rf'].includes(p.source)) errors.push('Choose a supported CO₂ source.');
  if (!['mm/s','mm/min'].includes(p.unit)) errors.push('Choose mm/s or mm/min.');
  return errors;
}
export function testComplete(t) {
  return positive(t.speed) && Number.isFinite(t.minPower) && t.minPower >= 0 && positive(t.maxPower) && t.minPower <= t.maxPower && t.maxPower <= 100 &&
    Number.isInteger(t.passes) && t.passes > 0 && positive(t.thicknessMm) && positive(t.lensInches) && Number.isFinite(t.focusMm) &&
    Boolean(t.air?.trim()) && (t.process !== 'engraving' || positive(t.intervalMm));
}
export const testSuccess = t => t.process === 'cutting' ? t.outcome === 'through' : t.outcome === 'good';
export function testMatches(t, p, m) {
  return t.profileId === p.id && profileSignature(t.profileSnapshot) === profileSignature(p) && t.lensInches === p.lensInches && t.stockSignature === stockSignature(m, t.thicknessMm, t.variant);
}
export function validateTest(t) {
  const errors = [];
  if (!['cutting','engraving'].includes(t.process)) errors.push('Choose an operation.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t.date || '') || Number.isNaN(Date.parse(t.date))) errors.push('Enter a test date.');
  if (!positive(t.thicknessMm)) errors.push('Enter the stock thickness.');
  for (const key of ['speed','lensInches','intervalMm','actualThicknessMm']) if (t[key] != null && !positive(t[key])) errors.push(`${key} must be positive or left blank.`);
  for (const key of ['minPower','maxPower']) if (t[key] != null && (!Number.isFinite(t[key]) || t[key] < 0 || t[key] > 100)) errors.push('Controller power must be between 0 and 100%.');
  if (t.minPower != null && t.maxPower != null && t.minPower > t.maxPower) errors.push('Controller Min cannot exceed Max.');
  if (t.passes != null && (!Number.isInteger(t.passes) || t.passes < 1)) errors.push('Passes must be a positive whole number.');
  if (t.focusMm != null && !Number.isFinite(t.focusMm)) errors.push('Focus must be a number or blank.');
  if (t.kerfMm != null && (!Number.isFinite(t.kerfMm) || t.kerfMm < 0)) errors.push('Measured kerf cannot be negative.');
  if (!(t.process === 'cutting' ? ['through','partial','failed','observation'] : ['good','fair','poor','observation']).includes(t.outcome)) errors.push('Choose the physical outcome.');
  return errors;
}
export function testRecipe(t) {
  return { id: t.id, process: t.process, method: t.method || 'User test', thicknessMm: t.thicknessMm,
    speedMmPerSec: { min: t.speed, max: t.speed }, powerPercent: { min: t.maxPower, max: t.maxPower },
    controllerPowerPercent: { min: t.minPower, max: t.maxPower }, passes: String(t.passes),
    focusBelowTopMm: t.focusMm, lensInches: t.lensInches,
    intervalMm: t.intervalMm, airAssist: t.air, evidence: `Tested on ${t.profileSnapshot.name} · ${t.date}`,
    notes: t.notes || '', testDate: t.date, testId: t.id, exactTest: true, source: null };
}
export function allMaterials(base, workspace, shared = {}) {
  const edit = shared.materialEdits || {};
  const values = [...base, ...(shared.customMaterials || []), ...workspace.customMaterials];
  const unique = new Map(values.map(m => [m.id, { ...clone(m), ...clone(edit[m.id] || {}), ...clone(workspace.materialEdits[m.id] || {}) }]));
  return [...unique.values()].filter(m => !workspace.deletedIds.includes(m.id));
}
export function materialThicknesses(m, tests = []) {
  return [...new Set([...thicknessOptions(m), ...(m.availableThicknesses || []), ...tests.filter(t => t.materialId === m.id).map(t => t.thicknessMm), m.preview.defaultThicknessMm])].filter(positive).sort((a,b) => a-b);
}
export function choicesFor(m, process, selection, profile, workspace, variant = '', sharedTests = []) {
  const refs = profile.source === 'co2-glass' ? resolveSettings(m, process, selection, profile.watts, workspace.allowEstimates, variant).choices : [];
  const matching = [...workspace.tests, ...sharedTests].filter(t => t.materialId === m.id && t.process === process && testComplete(t) && testSuccess(t) && testMatches(t, profile, m) &&
    (process === 'cutting' ? t.thicknessMm === selection : (t.methodId === selection || !selection)));
  const preferred = workspace.preferred[recipeContext(m.id,process,selection,profile.id,variant)];
  matching.sort((a,b) => (b.id === preferred) - (a.id === preferred) || b.date.localeCompare(a.date));
  return [...matching.map(t => ({ recipe: testRecipe(t), kind: 'tested', watts: profile.watts })), ...refs];
}
export function materialMethods(m, tests = []) {
  const methods = engravingOptions(m);
  for (const t of tests.filter(t => t.materialId === m.id && t.process === 'engraving')) if (!methods.some(x => x.id === t.methodId)) methods.push({id:t.methodId || 'user-engrave',label:t.method || 'User engraving'});
  return methods.length ? methods : [{id:'user-engrave',label:'Surface engraving'}];
}
export const recipeContext = (materialId,process,selection,profileId,variant='') => JSON.stringify([materialId,process,selection,profileId,variant]);
export const recipeKey = (materialId, process, recipeId, variant='') => JSON.stringify([materialId,process,recipeId,variant]);
export function duplicateMaterial(m, id) {
  const copied = clone(m);
  copied.id = id; copied.name += ' (copy)'; copied.tileName = copied.name;
  copied.qualification = 'Copied material — qualify this grade and stock separately. ' + (m.qualification || '');
  for (const row of [...copied.cutting, ...copied.engraving, ...copied.laserProfiles.flatMap(p => [...p.cutting,...p.engraving])]) {
    row.testReport = null; row.testDate = null; row.testedRecipe = null; row.exactTest = false;
    row.evidence = 'Copied reference · untested for this material';
    row.passes = row.passes?.replace(/tested/ig,'reference');
  }
  return copied;
}
export function deleteMaterial(workspace, id) {
  const next = clone(workspace);
  next.customMaterials = next.customMaterials.filter(m => m.id !== id);
  delete next.materialEdits[id]; delete next.selections[id];
  next.tests = next.tests.filter(t => t.materialId !== id);
  next.generatedTests = next.generatedTests.filter(t => t.materialId !== id);
  next.archivedIds = next.archivedIds.filter(x => x !== id);
  if (!next.deletedIds.includes(id)) next.deletedIds.push(id);
  for (const key of Object.keys(next.preferred)) if (JSON.parse(key)[0] === id) delete next.preferred[key];
  // Keep pins as visibly unavailable shortcuts until explicitly unpinned.
  return next;
}
export function validateMaterial(m) {
  const errors = [];
  if (!/^[a-zA-Z0-9_-]+$/.test(m.id)) errors.push('Invalid material ID.');
  if (!m.name?.trim() || !m.family?.trim()) errors.push('Material name and family are required.');
  if (!m.preview || !positive(m.preview.defaultThicknessMm) || m.preview.defaultThicknessMm > 40) errors.push('Preview thickness must be greater than zero and no more than 40 mm.');
  if (!Array.isArray(m.preview?.variants)) errors.push('Preview variants must be an array.');
  if (!['face','edge','highlight'].every(k => /^#[0-9a-f]{6}$/i.test(m.preview?.colors?.[k] || ''))) errors.push('Use six-digit preview colors.');
  if (!Array.isArray(m.cutting) || !Array.isArray(m.engraving) || !Array.isArray(m.warnings) || !Array.isArray(m.laserProfiles)) errors.push('Material recipe arrays are required.');
  if (m.availableThicknesses?.some(t => !positive(t) || t > 40)) errors.push('Stock thicknesses must be greater than zero and no more than 40 mm.');
  return errors;
}
function assertSafeData(value, depth = 0) {
  if (depth > 30) throw new Error('Backup is too deeply nested.');
  if (value && typeof value === 'object') for (const [key,item] of Object.entries(value)) {
    if (['__proto__','prototype','constructor'].includes(key)) throw new Error('Unsupported backup key.');
    assertSafeData(item, depth + 1);
  }
}
export function parseWorkspace(text, base = []) {
  if (text.length > 15_000_000) throw new Error('Backup exceeds 15 MB.');
  const data = JSON.parse(text); assertSafeData(data);
  if (data.schemaVersion !== 1) throw new Error('This backup version is not supported.');
  for (const key of ['profiles','customMaterials','tests','pins','archivedIds','deletedIds','generatedTests']) if (!Array.isArray(data[key])) throw new Error(`Backup is missing ${key}.`);
  for (const key of ['materialEdits','preferred','selections']) if (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key])) throw new Error(`Invalid ${key}.`);
  if (!data.profiles.length || !data.profiles.some(p => p.id === data.activeProfileId)) throw new Error('The active laser is missing.');
  for (const p of data.profiles) if (!p.id || validateProfile(p).length) throw new Error('Backup contains an invalid laser profile.');
  for (const m of data.customMaterials) if (validateMaterial(m).length) throw new Error('Backup contains an invalid material.');
  for (const [id,edit] of Object.entries(data.materialEdits)) {
    const original = [...base, ...data.customMaterials].find(m => m.id === id);
    if (original && validateMaterial({...original,...edit}).length) throw new Error('Backup contains an invalid material edit.');
  }
  for (const t of data.tests) if (!t.id || !t.materialId || !t.profileSnapshot || validateProfile(t.profileSnapshot).length || validateTest(t).length ||
    (t.photo && !/^data:image\/(jpeg|png|webp);base64,[a-zA-Z0-9+/=]+$/.test(t.photo))) throw new Error('Backup contains an invalid test.');
  for (const key of ['profiles','customMaterials','tests','pins']) if (new Set(data[key].map(v => v.id)).size !== data[key].length) throw new Error(`Duplicate IDs in ${key}.`);
  for (const pin of data.pins) if (!pin.id || !pin.materialId || !pin.profileId || !['cutting','engraving'].includes(pin.process)) throw new Error('Invalid quicklist item.');
  for (const p of data.profiles) p.provenance ||= {};
  return { ...emptyWorkspace(), ...data };
}
export function limitErrors(settings, profile, process) {
  const errors = [];
  if (!positive(settings.speed)) errors.push('Exact speed is missing.');
  if (!positive(settings.maxPower) || settings.maxPower > 100 || !Number.isFinite(settings.minPower) || settings.minPower < 0 || settings.minPower > settings.maxPower) errors.push('Valid controller Min/Max power is required.');
  if (!Number.isInteger(settings.passes) || settings.passes < 1) errors.push('A whole pass count is required.');
  const speedLimit = process === 'cutting' ? profile.maxCutSpeed : profile.maxEngraveSpeed;
  if (speedLimit != null && settings.speed > speedLimit) errors.push(`Speed exceeds this laser’s ${fmt(speedLimit)} mm/s ${process} limit.`);
  if (profile.xMaxSpeed != null && settings.speed > profile.xMaxSpeed) errors.push('Speed exceeds the X-axis motion limit.');
  if (process === 'cutting' && profile.yMaxSpeed != null && settings.speed > profile.yMaxSpeed) errors.push('Speed exceeds the Y-axis motion limit.');
  if (profile.maxPowerPercent != null && settings.maxPower > profile.maxPowerPercent) errors.push('Power exceeds the allowed command limit.');
  if (profile.firingPercent != null && settings.minPower < profile.firingPercent) errors.push('Minimum power is below the recorded firing threshold.');
  if (process === 'engraving' && !positive(settings.intervalMm)) errors.push('Engraving line interval is missing.');
  return errors;
}
