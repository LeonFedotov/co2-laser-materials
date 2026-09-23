export function thicknessOptions(material) {
  return [...new Set([
    ...material.cutting.map(row => row.thicknessMm),
    ...material.laserProfiles.flatMap(profile => profile.cutting.map(row => row.thicknessMm))
  ].filter(value => Number.isFinite(value)))].sort((a, b) => a - b)
}

export function engravingOptions(material) {
  const options = material.engraving.map(row => ({ id: row.id, label: row.method, base: row }))
  for (const profile of material.laserProfiles) {
    for (const row of profile.engraving) {
      if (row.appliesToRecipeIds.length) continue
      const id = 'profile:' + row.method
      if (!options.some(option => option.id === id)) options.push({ id, label: row.method, base: null })
    }
  }
  return options
}

export function canEstimate(row) {
  if (!row || /experimental|incomplete|product-specific|unverified/i.test(row.evidence)) return false
  if (![row.speedMmPerSec.min, row.speedMmPerSec.max, row.powerPercent.min, row.powerPercent.max].every(value => Number.isFinite(value) && value > 0)) return false
  if (!row.passes) return false
  if (row.process === 'cutting' && (!/^1\b/.test(row.passes) || /\b2\b|stage|multi/i.test(row.passes))) return false
  return true
}

export function originalRank(row) {
  return /experimental/i.test(row.evidence) ? 3 : /incomplete/i.test(row.evidence) ? 2 : /published/i.test(row.evidence) ? 0 : 1
}

export function estimate(row, watts) {
  const round = number => Math.round(number * 10) / 10
  return {
    recipe: {
      ...row,
      id: `EST-${watts}-${row.id}`,
      speedMmPerSec: { min: round(row.speedMmPerSec.min * watts / 60), max: round(row.speedMmPerSec.max * watts / 60) },
      evidence: `Estimated from 60 W · test only`,
      testedRecipe: null,
      testDate: null,
      testReport: null,
      passes: row.testReport ? '1 (60 W baseline; unverified at this wattage)' : row.passes
    },
    kind: 'estimate', watts, base: row
  }
}

export function resolveSettings(material, process, selection, watts, allowEstimates, variant = '') {
  const profile = material.laserProfiles.find(item => item.laserWatts === watts)
  let originals
  let published
  if (process === 'cutting') {
    originals = material.cutting.filter(row => row.thicknessMm === selection)
    published = (profile?.cutting || []).filter(row => row.thicknessMm === selection)
  } else {
    originals = material.engraving.filter(row => row.id === selection)
    published = (profile?.engraving || []).filter(row => row.appliesToRecipeIds.includes(selection) || selection === 'profile:' + row.method)
  }
  published = published.filter(row => !row.requiresVariant || row.requiresVariant === variant)
  originals = [...originals].sort((a, b) => originalRank(a) - originalRank(b))
  const matches = published.map(recipe => ({ recipe, kind: 'published', watts, base: null }))
  if (watts === 60) return {
    choices: [...originals.map(recipe => ({ recipe, kind: 'original', watts: 60, base: null })), ...matches],
    estimatePossible: false
  }
  if (matches.length) return { choices: matches, estimatePossible: false }
  const estimable = originals.filter(canEstimate)
  return { choices: allowEstimates ? estimable.map(row => estimate(row, watts)) : [], estimatePossible: estimable.length > 0 }
}
