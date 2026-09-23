import { esc, fmt, positive, limitErrors, recipeKey, choicesFor, materialThicknesses, materialMethods } from './domain.js';

export function startingSettings(row) {
  const passMatch = String(row?.passes || '').match(/^(\d+)\b|test (\d+)\b/i);
  const power = row?.controllerPowerPercent;
  return { speed: row?.speedMmPerSec?.max ?? null, maxPower: power?.max ?? row?.powerPercent?.min ?? null,
    minPower: power?.min ?? row?.powerPercent?.min ?? null, passes: passMatch ? Number(passMatch[1] || passMatch[2]) : null,
    intervalMm: row?.intervalMm ?? null, focusMm: typeof row?.focusBelowTopMm === 'number' ? row.focusBelowTopMm : row?.focusBelowTopMm?.min ?? null,
    lensInches: row?.lensInches ?? null, air: row?.airAssist || '', airOn: Boolean(row?.airAssist && !/^(off|none|no air)/i.test(row.airAssist)) };
}
export function profileStartingSettings(recipe, profile, process) {
  const settings = startingSettings(recipe);
  const limits = [process === 'cutting' ? profile.maxCutSpeed : profile.maxEngraveSpeed, profile.xMaxSpeed,
    process === 'cutting' ? profile.yMaxSpeed : null].filter(positive);
  const limit = limits.length ? Math.min(...limits) : Infinity;
  // Choose a value inside the published range. Never rewrite a measured exact test or
  // extrapolate a recipe whose entire speed range exceeds the machine's limit.
  if (!recipe?.exactTest && positive(recipe?.speedMmPerSec?.min) && recipe.speedMmPerSec.min <= limit && settings.speed > limit) settings.speed = limit;
  return settings;
}
export function surfaceTitle(recipe) {
  if (recipe.method === 'Coating removal') return 'Coating removal';
  if (recipe.method === 'Surface frosting') return 'Glass frosting';
  if (recipe.method === 'Anodized-layer marking') return 'Surface marking';
  return 'Engraving';
}
export function materialLibraryName(material) {
  const families = {'Wood & cork':'Wood','Paper & board':'Paper & Cardboard','Metals':'Metal'};
  const category = material.family === 'Foam & rubber' ? (/rubber|neoprene/.test(material.id) ? 'Rubber' : 'Foam') :
    material.family === 'Glass & stone' ? (['slate','granite'].includes(material.id) ? 'Stone' : 'Glass & Ceramics') :
    families[material.family] || material.family;
  const qualifications = {acetal:' [FORMALDEHYDE - EXTRACTION REQUIRED]',eva:' [LASER-COMPATIBLE GRADE]',rubber:' [HALOGEN-FREE ONLY]',leatherette:' [LASER-RATED ONLY]'};
  return `${category ? category + ' — ' : ''}${material.name.replace(/\s*\/\s*/g,' · ')}${qualifications[material.id] || ''}`;
}
export function recipeExportRow(material, process, selection, option, variant, profile) {
  if (!option) return null;
  const r = option.recipe, settings = profileStartingSettings(r,profile,process);
  const reason = !positive(r.speedMmPerSec?.min) || !positive(r.powerPercent?.min) ? 'No verified numeric settings supplied.' :
    /incomplete|unverified/i.test(r.evidence) && option.kind !== 'estimate' ? 'Reference has an incomplete setup. Record a complete test to create a preset.' :
    !settings.passes ? 'Pass count is unspecified.' : process === 'engraving' && !positive(settings.intervalMm) ? 'Line interval is unspecified.' :
    /stage|multi/i.test(r.passes || '') ? 'Staged recipes need separate, explicitly recorded settings.' : '';
  return {key:recipeKey(material.id,process,r.id,variant),material,process,selection,variant,option,settings,reason,
    speedAdjustment:settings.speed !== startingSettings(r).speed ? settings.speed : null};
}
export function singleRecipeExport(material, process, selection, recipeId, variant, profile, workspace, sharedTests = []) {
  const option = choicesFor(material,process,selection,profile,workspace,variant,sharedTests).find(o => o.recipe.id === recipeId);
  const row = recipeExportRow(material,process,selection,option,variant,profile);
  if (!row) throw new Error('No matching recipe for this laser and stock.');
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9.-]+/g,'-').replace(/^-|-$/g,'');
  return {filename:`CO2-${profile.watts}W-${slug(material.id)}-${process === 'cutting' ? selection+'mm-cut' : slug(surfaceTitle(option.recipe))}-${slug(recipeId)}.clb`,
    xml:libraryXml([row],new Set([row.key]),profile)};
}
export function exportRows(catalog, profile, workspace, archived = [], sharedTests = []) {
  const rows = new Map();
  for (const m of catalog.filter(m => !archived.includes(m.id))) {
    for (const variant of m.preview.variants.length ? m.preview.variants : ['']) {
      for (const process of ['cutting','engraving']) {
        const selections = process === 'cutting' ? materialThicknesses(m, workspace.tests) : materialMethods(m, workspace.tests).map(v => v.id);
        for (const selection of selections) for (const option of choicesFor(m,process,selection,profile,workspace,variant,sharedTests)) {
          const row = recipeExportRow(m,process,selection,option,variant,profile);
          rows.set(row.key,row);
        }
      }
    }
  }
  return [...rows.values()];
}
export function selectionSummary(rows, selected, visible) {
  const chosen = rows.filter(r => selected.has(r.key));
  const visibleKeys = new Set(visible.map(r => r.key));
  return { recipes: chosen.length, materials: new Set(chosen.map(r => r.material.id)).size, hidden: chosen.filter(r => !visibleKeys.has(r.key)).length };
}
export function parentSelection(rows, selected) {
  const eligible = rows.filter(r => !r.reason);
  const count = eligible.filter(r => selected.has(r.key)).length;
  return { checked: eligible.length > 0 && count === eligible.length, indeterminate: count > 0 && count < eligible.length, disabled: !eligible.length };
}
export function cutSettingXml(settings, process, index, name, { output = true, linkPath = '', overscanMm = 0 } = {}) {
  const values = { index, name, ...(linkPath ? {LinkPath:linkPath} : {}), minPower: settings.minPower, maxPower: settings.maxPower,
    minPower2: 0, maxPower2: 0, speed: settings.speed, enableLaser1: output ? 1 : 0, enableLaser2: 0, doOutput: output ? 1 : 0,
    runBlower: settings.airOn ? 1 : 0, numPasses: settings.passes, zOffset: 0, zPerPass: 0, kerf: 0,
    enableCutThroughStart: 0, enableCutThroughEnd: 0, startDelay: 0, endDelay: 0, tabsEnabled: 0, perforate: 0, dotMode: 0,
    rampLength: 0, priority: index,
    ...(process === 'engraving' ? {interval: settings.intervalMm, scanOpt: 'mergeAll', bidir: 1, angle: 0, crossHatch: 0,
      overscan: overscanMm > 0 ? 1 : 0, overscanPercent: overscanMm > 0 ? overscanMm / settings.speed * 100 : 2.5} : {}) };
  return `<CutSetting type="${process === 'engraving' ? 'Scan' : 'Cut'}">${Object.entries(values).map(([key,value]) => `<${key} Value="${esc(typeof value === 'number' ? fmt(value) : value)}"/>`).join('')}</CutSetting>`;
}
export function recipeDescription(row, settings, profile) {
  const r = row.option.recipe;
  const unchanged = JSON.stringify(settings) === JSON.stringify(startingSettings(r));
  const evidence = r.exactTest && unchanged ? `TESTED ${r.testDate}` : 'TEST STARTING POINT — not an exact verified preset';
  return [r.id, row.process === 'cutting' ? `${r.thicknessMm} mm cut` : `Surface engraving · ${r.method}`, row.variant,
    evidence, `${profile.name}, ${profile.watts} W ${profile.source}`, `${settings.speed} mm/s; Min ${settings.minPower}%, Max ${settings.maxPower}%; ${settings.passes} pass(es)`,
    row.speedAdjustment != null && settings.speed === row.speedAdjustment ? `Speed chosen within the original ${r.speedMmPerSec.min}–${r.speedMmPerSec.max} mm/s range to respect recorded machine limits; not a new physical test.` : '',
    `Focus below top: ${settings.focusMm ?? 'unspecified'} mm (manual); lens ${settings.lensInches ?? 'unspecified'} in; air ${settings.air || 'unspecified'}`,
    !r.controllerPowerPercent ? 'Controller Min=Max is a provisional choice, not a reported controller setting.' : '',
    r.testReport ? `Reported ${r.testDate}: ${r.testReport.passes} pass through-cut; exact speed/power not recorded.` : '',
    r.notes, row.material.qualification, ...row.material.warnings.map(w => `${w.label}: ${w.reason} ${w.nextStep}`),
    r.warning, r.source?.url, ...(r.additionalSources || []).map(s => s.url)].filter(Boolean).join(' | ');
}
export function libraryXml(rows, selected, profile) {
  const chosen = rows.filter(row => selected.has(row.key));
  if (!chosen.length) throw new Error('Select at least one eligible recipe.');
  for (const row of chosen) {
    const errors = [row.reason, ...limitErrors(row.settings,profile,row.process)].filter(Boolean);
    if (errors.length) throw new Error(`${row.material.name}: ${errors.join(' ')}`);
  }
  const groups = new Map();
  for (const row of chosen) {
    if (!groups.has(row.material.id)) groups.set(row.material.id,[]);
    groups.get(row.material.id).push(row);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<LightBurnLibrary DisplayName="${esc(profile.name)} ${profile.watts} W">\n` + [...groups.values()].map(group => {
    const name = materialLibraryName(group[0].material);
    return `<Material name="${esc(name)}">\n` + group.map(row => {
      const thickness = row.process === 'cutting' ? row.option.recipe.thicknessMm.toFixed(4) : '-1.0000';
      const title = row.process === 'engraving' ? surfaceTitle(row.option.recipe) : null;
      const desc = recipeDescription(row,row.settings,profile);
      return `<Entry Thickness="${thickness}"${title ? ` NoThickTitle="${esc(title)}"` : ''} Desc="${esc(desc)}">${cutSettingXml(row.settings,row.process,0,desc,{linkPath:`${name}/${title || thickness}/${desc}`})}</Entry>`;
    }).join('\n') + '\n</Material>';
  }).join('\n') + '\n</LightBurnLibrary>\n';
}

const interpolate = (a,b,count) => Array.from({length:count},(_,i) => Math.round((a + (b-a) * (count === 1 ? 0 : i/(count-1))) * 1000)/1000);
export function testPattern(config, profile) {
  const errors = [], cells = [], shapes = [];
  const kerf = config.type === 'kerf', process = config.type === 'engraving' ? 'engraving' : 'cutting';
  const rows = kerf ? 1 : config.rows, cols = config.cols;
  if (![rows,cols].every(n => Number.isInteger(n) && n >= 1 && n <= 5)) errors.push('Choose 1–5 rows and columns (25 layers maximum).');
  for (const key of ['cellMm','scrapWidth','scrapHeight','thicknessMm']) if (!positive(config[key])) errors.push(`${key} must be greater than zero.`);
  if (config.cellMm < 4) errors.push('Use cells at least 4 mm across.');
  if (![config.marginMm, config.gapMm,config.overscanMm].every(n => Number.isFinite(n) && n >= 0)) errors.push('Margins, gaps and overscan must be zero or positive.');
  if (!positive(config.speedMin) || !positive(config.speedMax) || config.speedMax < config.speedMin) errors.push('Speed range is invalid.');
  if (!positive(config.powerMin) || config.powerMax > 100 || config.powerMax < config.powerMin) errors.push('Power range is invalid.');
  if (kerf && (!Number.isFinite(config.fitMin) || !Number.isFinite(config.fitMax) || config.fitMax < config.fitMin)) errors.push('Fit allowance range is invalid.');
  if (errors.length) return {errors,cells,shapes,width:0,height:0,overscan:0};
  const maxSpeed = config.speedMax;
  const motionAllowance = process === 'engraving' && positive(profile.xAcceleration) ? maxSpeed ** 2 / (2*profile.xAcceleration) : 0;
  const overscan = process === 'engraving' ? Math.max(config.overscanMm,motionAllowance) : 0;
  const slotWidths = kerf ? interpolate(config.fitMin,config.fitMax,cols).map(fit => config.thicknessMm + fit) : [];
  if (slotWidths.some(w => !positive(w) || w >= config.cellMm - 2)) errors.push('Fit slots must be positive and leave at least 1 mm of material on each side. Increase cell size or reduce allowance.');
  const pitchX = (kerf ? config.cellMm * 2 + 4 : config.cellMm) + config.gapMm;
  const pitchY = config.cellMm + config.gapMm + 5;
  const width = 2*(config.marginMm + overscan) + cols*pitchX - config.gapMm;
  const height = 2*config.marginMm + rows*pitchY - config.gapMm;
  if (width > config.scrapWidth || height > config.scrapHeight) errors.push(`Pattern needs ${fmt(width)} × ${fmt(height)} mm including margins and travel allowance; scrap is too small.`);
  if (config.scrapWidth > profile.widthMm || config.scrapHeight > profile.heightMm || width > profile.widthMm || height > profile.heightMm) errors.push('The scrap or pattern exceeds the laser work area.');
  const speeds = interpolate(config.speedMax,config.speedMin,rows), powers = interpolate(config.powerMin,config.powerMax,cols);
  for (let r=0;r<rows;r++) for (let c=0;c<cols;c++) {
    const index = r*cols+c, label = `${String.fromCharCode(65+r)}${c+1}`;
    const settings = { speed: speeds[r], minPower: config.minMode === 'same' ? powers[c] : config.controllerMin,
      maxPower: powers[c], passes: config.passes, intervalMm: config.intervalMm, airOn: config.airOn,
      focusMm: config.focusMm, lensInches: config.lensInches, air: config.air };
    for (const message of limitErrors(settings,profile,process)) if (!errors.includes(message)) errors.push(message);
    const x = config.marginMm+overscan+c*pitchX, y = config.marginMm+r*pitchY;
    const fit = kerf ? interpolate(config.fitMin,config.fitMax,cols)[c] : null;
    cells.push({index,label,settings,fit,process});
    shapes.push({x,y,w:config.cellMm,h:config.cellMm,index,label});
    if (kerf) {
      // A closed slot inside a coupon, paired with a square tab coupon. No compensation is applied.
      shapes.push({x:x+(config.cellMm-slotWidths[c])/2,y:y+2,w:slotWidths[c],h:config.cellMm-4,index,label:''});
      shapes.push({x:x+config.cellMm+4,y,w:config.cellMm-4,h:config.cellMm,index,label:''});
    }
  }
  return {errors,cells,shapes,width,height,overscan,process};
}
export function patternSvg(pattern, config) {
  const width = Math.max(pattern.width,1), height = Math.max(pattern.height,1);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="lc-test-preview" width="${fmt(width)}mm" height="${fmt(height)}mm" viewBox="0 0 ${fmt(width)} ${fmt(height)}" role="img" aria-label="${esc(config.type)} test, ${fmt(width)} by ${fmt(height)} millimeters">
    <title>Geometry only — assign settings in LightBurn. Labels are on a separate group.</title>
    <g id="test-geometry" fill="none" stroke="#365c42" stroke-width="0.2">${pattern.shapes.map(s => `<rect x="${fmt(s.x)}" y="${fmt(s.y)}" width="${fmt(s.w)}" height="${fmt(s.h)}"/>`).join('')}</g>
    <g id="labels-do-not-output" fill="#586959" font-family="Arial,sans-serif" font-size="2.5">${pattern.shapes.filter(s=>s.label).map(s=>`<text x="${fmt(s.x)}" y="${fmt(s.y+s.h+3.5)}">${esc(s.label)}${pattern.cells[s.index].fit != null ? ` ${fmt(pattern.cells[s.index].fit)}mm` : ''}</text>`).join('')}</g></svg>`;
}
export function projectXml(pattern, config, profile, material) {
  if (pattern.errors.length) throw new Error(pattern.errors.join(' '));
  const labelSettings = {speed:100,minPower:0,maxPower:0,passes:1,airOn:false};
  const notes = [`${material.name} · ${config.thicknessMm} mm · ${profile.name} · ${profile.watts} W`,
    `TEST ONLY. ${config.type}. ${pattern.width} × ${pattern.height} mm including margins; ${pattern.overscan} mm travel allowance per side.`,
    `Manual focus ${config.focusMm ?? 'unspecified'} mm below top; lens ${config.lensInches ?? 'unspecified'} in; air: ${config.air || 'unspecified'}. No automatic Z.`,
    'Labels use layer 29 with Output OFF. Review Preview, controller overscan, origin and framing before running.',
    ...material.warnings.map(w=>`${w.label}: ${w.reason} ${w.nextStep}`),
    ...pattern.cells.map(c=>`${c.label}: ${c.settings.speed} mm/s; Min ${c.settings.minPower}%, Max ${c.settings.maxPower}%; ${c.settings.passes} passes${c.fit != null ? `; slot ${config.thicknessMm+c.fit} mm (stock + ${c.fit} mm allowance)` : ''}`)].join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<LightBurnProject AppVersion="1.7.08" FormatVersion="1" MaterialHeight="0" MirrorX="False" MirrorY="False">
    <Notes ShowOnLoad="1" Notes="${esc(notes).replace(/\n/g,'&#10;')}"/>
    <UIPrefs><Optimize_ByLayer Value="1"/><Optimize_ByPriority Value="1"/><Optimize_InnerToOuter Value="1"/></UIPrefs>
    ${pattern.cells.map(c=>cutSettingXml(c.settings,c.process,c.index,`${c.label} · ${c.settings.speed} mm/s · ${c.settings.maxPower}%`,{overscanMm:config.overscanMm})).join('\n')}
    ${cutSettingXml(labelSettings,'cutting',29,'Labels — OUTPUT OFF',{output:false})}
    ${pattern.shapes.map(s=>`<Shape Type="Rect" CutIndex="${s.index}" W="${fmt(s.w)}" H="${fmt(s.h)}" Cr="0"><XForm>1 0 0 1 ${fmt(s.x+s.w/2)} ${fmt(pattern.height-s.y-s.h/2)}</XForm></Shape>`).join('\n')}
    ${pattern.shapes.filter(s=>s.label).map(s=>`<Shape Type="Text" CutIndex="29" Font="Arial,-1,100,5,50,0,0,0,0,0" Str="${esc(s.label)}" H="2.5" LS="0" LnS="0" Ah="0" Av="0" Weld="1"><XForm>1 0 0 1 ${fmt(s.x)} ${fmt(pattern.height-s.y-s.h-3.5)}</XForm></Shape>`).join('\n')}
  </LightBurnProject>\n`;
}
