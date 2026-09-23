// Material data is the source of truth. Numeric fields use the units named in each key.
// cutting/engraving retain the original 60 W catalog. laserProfiles contain manufacturer references.
// Null means unverified or not supplied; never zero.

export const catalogMeta = {
  title: 'CO₂ Material Catalog',
  revision: '2026-09-23',
  machine: 'CO₂ glass-tube material reference; selectable rated wattage',
  units: {
    speed: 'mm/s',
    thickness: 'mm',
    focus: 'mm below top',
    power: '% command, not measured optical watts',
    lens: 'inches'
  },
  evidenceNote: 'Published values are machine-specific references. Suggested and experimental rows are proposed tests, not measured presets. Preserve the laser manufacturer tube-current limit.',
  previewNote: 'Independent vector samples with an isometric face and a separate orthographic edge profile. Both views use the selected stock thickness without exaggeration. Grain and layer counts are illustrative.',
  missingValue: 'Not specified; never interpreted as zero',
  originalRecipeIds: [
    'C01',
    'C02',
    'C03',
    'C04',
    'C05',
    'C06',
    'C07',
    'C08',
    'C09',
    'C10',
    'C11',
    'C12',
    'C13',
    'C14',
    'C15',
    'C16',
    'C17',
    'C18',
    'C19',
    'C20',
    'C21',
    'C22',
    'C23',
    'C24',
    'C25',
    'C26',
    'C27',
    'C28',
    'C29',
    'C30',
    'C31',
    'C32',
    'C33',
    'C34',
    'C35',
    'C36',
    'C37',
    'C38',
    'C39',
    'C40',
    'C41',
    'C42',
    'C43',
    'C44',
    'C45',
    'C46',
    'C47',
    'C48',
    'C49',
    'E01',
    'E02',
    'E03',
    'E04',
    'E05',
    'E06',
    'E07',
    'E08',
    'E09',
    'E10',
    'E11',
    'E12',
    'E13',
    'E14',
    'E15',
    'E16',
    'E17',
    'E18',
    'E19',
    'E20',
    'E21',
    'E22',
    'E23',
    'E24',
    'E25',
    'E26',
    'E27',
    'E28',
    'E29',
    'E30',
    'E31'
  ],
  sourceWorkbook: '60W-CO2-Laser-Material-Catalog.xlsx',
  baseLaserWatts: 60,
  wattageOptions: [
    40,
    50,
    60,
    80,
    100,
    120
  ],
  publishedProfileWatts: [
    60,
    80,
    100,
    120
  ],
  estimate: {
    enabledByDefault: false,
    quantity: 'speedMmPerSec',
    formula: 'estimatedSpeed = base60WSpeed * selectedWatts / 60',
    heldConstant: [
      'controller power percentage',
      'nominal passes',
      'focus',
      'lens',
      'engraving interval'
    ],
    assumptions: 'Rough constant-energy-per-length model at unchanged power command. Assumes comparable optical efficiency, spot size and output response; no validated transfer between machines.',
    exclusions: 'No estimate without a complete numeric base window; no estimate for product-specific marking, experimental or incomplete setups, multi-pass cutting, or restricted materials without a base recipe.',
    limitation: 'A speed estimate does not establish cutting depth, edge quality, a safe current, low-power firing or machine motion limits. Coupon testing is required.',
    exactProfilePriority: true
  }
}

export const materials = [
  {
    id: 'mdf',
    name: 'MDF',
    family: 'Wood & cork',
    icon: 'layers',
    surface: 'Fine, even fibers; no natural wood grain.',
    edge: 'A continuous compressed-fiber core.',
    qualification: '',
    preview: {
      kind: 'fiber',
      colors: {
        face: '#b78b59',
        edge: '#7a5434',
        highlight: '#d2ae7e'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L18',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '10–22 mm',
        reason: 'Thunder lists 10/15 mm settings but omits passes and air units. No dependable 22 mm recipe established.',
        nextStep: 'CNC or saw for through cuts. Verified stock can still be engraved.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C01',
        process: 'cutting',
        materialGrade: 'MDF, ordinary laser-grade',
        method: 'Through cutting',
        thicknessMm: 2.5,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 20,
          max: 30
        },
        powerPercent: {
          min: 65,
          max: 75
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Useful first window for nominal 2.5 mm board. Measure the actual sheet.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C02',
        process: 'cutting',
        materialGrade: 'MDF, ordinary laser-grade',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'User-tested · 22 Sep 2026',
        speedMmPerSec: {
          min: 15,
          max: 20
        },
        powerPercent: {
          min: 70,
          max: 80
        },
        controllerPowerPercent: null,
        passes: '1 tested',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Not required for the reported single-pass through-cut',
        notes: 'User confirmed on 22 Sep 2026 that 3 mm MDF cuts through in a single pass using the listed 60 W settings. The listed speed and power ranges are retained; the exact tested pair was not recorded. Verify the actual board grade and tube-current limit.',
        source: {
          title: 'STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: 'User-reported single-pass through-cut, tested 22 Sep 2026 using the listed 60 W settings; exact speed and power pair not recorded',
        testDate: '2026-09-22',
        testReport: {
          date: '2026-09-22',
          reportedBy: 'user',
          laserWatts: 60,
          thicknessMm: 3,
          passes: 1,
          outcome: 'Through cut',
          settingsBasis: 'Listed catalog speed and power ranges',
          exactSpeedMmPerSec: null,
          exactPowerPercent: null,
          controllerMinPowerPercent: null
        },
        kerfMm: null
      },
      {
        id: 'C03',
        process: 'cutting',
        materialGrade: 'MDF, ordinary laser-grade',
        method: 'Through cutting',
        thicknessMm: 4,
        evidence: 'User-tested · 22 Sep 2026',
        speedMmPerSec: {
          min: 10,
          max: 15
        },
        powerPercent: {
          min: 75,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 tested',
        focusBelowTopMm: 0.5,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Not required for the reported single-pass through-cut',
        notes: 'User confirmed on 22 Sep 2026 that 4 mm MDF cuts through in a single pass using the listed 60 W settings. The listed speed and power ranges are retained; the exact tested pair was not recorded. Verify the actual board grade and tube-current limit.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: 'User-reported single-pass through-cut, tested 22 Sep 2026 using the listed 60 W settings; exact speed and power pair not recorded',
        testDate: '2026-09-22',
        testReport: {
          date: '2026-09-22',
          reportedBy: 'user',
          laserWatts: 60,
          thicknessMm: 4,
          passes: 1,
          outcome: 'Through cut',
          settingsBasis: 'Listed catalog speed and power ranges',
          exactSpeedMmPerSec: null,
          exactPowerPercent: null,
          controllerMinPowerPercent: null
        },
        kerfMm: null
      },
      {
        id: 'C04',
        process: 'cutting',
        materialGrade: 'MDF, ordinary laser-grade',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 8,
          max: 10
        },
        powerPercent: {
          min: 85,
          max: 95
        },
        controllerPowerPercent: null,
        passes: '1 or 2',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Optional +1 mm for pass 2, after inspection',
        notes: 'Source allows two passes. Never exceed your tube current limit to reach 95%.',
        source: {
          title: 'STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C05',
        process: 'cutting',
        materialGrade: 'MDF, ordinary laser-grade',
        method: 'Through cutting',
        thicknessMm: 8,
        evidence: 'Experimental test',
        speedMmPerSec: {
          min: 8,
          max: 10
        },
        powerPercent: {
          min: 75,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '2-stage trial',
        focusBelowTopMm: 1,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: '+1 mm on pass 2 only if a deep kerf exists',
        notes: 'No verified 8 mm recipe. Stop if pass 2 adds char without useful penetration.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C50',
        process: 'cutting',
        materialGrade: 'MDF',
        method: 'Through cutting — published reference',
        thicknessMm: 10,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 10,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C51',
        process: 'cutting',
        materialGrade: 'MDF',
        method: 'Through cutting — published reference',
        thicknessMm: 15,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 5,
          max: 5
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E06',
        process: 'engraving',
        materialGrade: 'MDF, ordinary',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 350,
          max: 500
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Uniform texture but smoky. Deep engraving is a separate process.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'MDF',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-mdf-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '5',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-mdf-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '10',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-mdf-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '15',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-mdf-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'MDF — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E06'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-mdf-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-mdf-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-mdf-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-mdf-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'MDF — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E06'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 15,
              max: 15
            },
            controllerPowerPercent: {
              min: 15,
              max: 15
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-mdf-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-mdf-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-mdf-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-mdf-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'MDF — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E06'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 12,
              max: 12
            },
            controllerPowerPercent: {
              min: 12,
              max: 12
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-mdf-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-mdf-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-mdf-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'MDF — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-mdf-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'MDF — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E06'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 10,
              max: 10
            },
            controllerPowerPercent: {
              min: 10,
              max: 10
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'birch',
    name: 'Birch plywood',
    family: 'Wood & cork',
    icon: 'layers-3',
    surface: 'Pale veneer with visible birch grain.',
    edge: 'Alternating veneer layers and glue lines.',
    qualification: '',
    preview: {
      kind: 'plywood',
      colors: {
        face: '#e3c893',
        edge: '#a37741',
        highlight: '#f2e1b7'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L19',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '12–20 mm',
        reason: 'Some supplier tables claim these depths with long lenses. They are not validated for your machine.',
        nextStep: 'Qualify a coupon or use CNC/saw.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C06',
        process: 'cutting',
        materialGrade: 'Birch plywood, laser-grade',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 18,
          max: 22
        },
        powerPercent: {
          min: 65,
          max: 75
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Avoid exterior / phenolic glue grades. Pass/focus proposed.',
        source: {
          title: 'STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C07',
        process: 'cutting',
        materialGrade: 'Birch plywood, laser-grade',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 9,
          max: 12
        },
        powerPercent: {
          min: 80,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1; inspect first',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Second pass only for nearly separated stock',
        notes: 'A glue pocket may remain uncut even when the rest releases.',
        source: {
          title: 'STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C08',
        process: 'cutting',
        materialGrade: 'Birch plywood, laser-grade',
        method: 'Through cutting',
        thicknessMm: 9,
        evidence: 'Experimental test',
        speedMmPerSec: {
          min: 6,
          max: 9
        },
        powerPercent: {
          min: 75,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '2-stage trial',
        focusBelowTopMm: 1,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: '+1 mm on pass 2 if warranted',
        notes: 'Exploratory thick-plywood window. Glue and core quality often set the limit.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows',
          url: 'https://www.stylecnc.com/blog/laser-cutting-mdf-vs-plywood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, 60 W MDF / birch starting windows'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C52',
        process: 'cutting',
        materialGrade: 'Birch plywood',
        method: 'Through cutting — published reference',
        thicknessMm: 10,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 10,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C53',
        process: 'cutting',
        materialGrade: 'Birch plywood',
        method: 'Through cutting — published reference',
        thicknessMm: 15,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 2,
          max: 2
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C54',
        process: 'cutting',
        materialGrade: 'Birch plywood',
        method: 'Through cutting — published reference',
        thicknessMm: 18,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 2,
          max: 2
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E02',
        process: 'engraving',
        materialGrade: 'Birch plywood',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 300,
          max: 450
        },
        powerPercent: {
          min: 20,
          max: 30
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Keep depth within the face veneer when the visible grain matters.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Birch plywood',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-birch-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '7.2',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-birch-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 15,
              max: 15
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-birch-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-birch-5',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '10',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-birch-6',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 18,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '15',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-birch-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E02'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 25,
              max: 25
            },
            controllerPowerPercent: {
              min: 25,
              max: 25
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-birch-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-birch-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 15,
              max: 15
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-birch-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-birch-5',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-birch-6',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 18,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-birch-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E02'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-birch-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-birch-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 15,
              max: 15
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-birch-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-birch-5',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-birch-6',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 18,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-birch-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E02'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 16,
              max: 16
            },
            controllerPowerPercent: {
              min: 16,
              max: 16
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-birch-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-birch-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 15,
              max: 15
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-birch-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-birch-5',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-birch-6',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Through cutting',
            thicknessMm: 18,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-birch-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Birch Ply — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E02'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 14,
              max: 14
            },
            controllerPowerPercent: {
              min: 14,
              max: 14
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'poplar',
    name: 'Poplar plywood',
    family: 'Wood & cork',
    icon: 'layers-3',
    surface: 'Pale, relatively subtle veneer grain.',
    edge: 'Layered veneer construction.',
    qualification: '',
    preview: {
      kind: 'plywood',
      colors: {
        face: '#eadabb',
        edge: '#b89660',
        highlight: '#f6ecd8'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C09',
        process: 'cutting',
        materialGrade: 'Poplar plywood, laser-grade',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 20,
          max: 35
        },
        powerPercent: {
          min: 60,
          max: 75
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Often easier than birch, but adhesive and veneer construction dominate.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C10',
        process: 'cutting',
        materialGrade: 'Poplar plywood, laser-grade',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 10,
          max: 18
        },
        powerPercent: {
          min: 70,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1; inspect first',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Optional second pass for near-through cuts',
        notes: 'Start at the fastest, lowest-power corner of this trial window.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'Poplar plywood',
    laserProfiles: []
  },
  {
    id: 'balsa',
    name: 'Balsa',
    family: 'Wood & cork',
    icon: 'feather',
    surface: 'Very light wood with fine linear grain.',
    edge: 'Light, porous solid wood.',
    qualification: '',
    preview: {
      kind: 'wood',
      colors: {
        face: '#ebd7ad',
        edge: '#bc9d6c',
        highlight: '#f8ebcb'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C11',
        process: 'cutting',
        materialGrade: 'Balsa, uncoated solid wood',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 30,
          max: 60
        },
        powerPercent: {
          min: 35,
          max: 55
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Light stock can ignite or lift. Hold flat without obstructing the beam.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C12',
        process: 'cutting',
        materialGrade: 'Balsa, uncoated solid wood',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 20,
          max: 35
        },
        powerPercent: {
          min: 50,
          max: 65
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Density varies substantially. Keep the air from moving the sheet.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'Balsa',
    laserProfiles: []
  },
  {
    id: 'basswood',
    name: 'Basswood / lime',
    family: 'Wood & cork',
    icon: 'tree-deciduous',
    surface: 'Creamy color and subtle fine grain.',
    edge: 'Uniform solid-wood structure.',
    qualification: '',
    preview: {
      kind: 'wood',
      colors: {
        face: '#ddc395',
        edge: '#af8e5c',
        highlight: '#f0debc'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C13',
        process: 'cutting',
        materialGrade: 'Basswood / lime, solid',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 15,
          max: 25
        },
        powerPercent: {
          min: 50,
          max: 70
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Use flat, dry, knot-free stock.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C14',
        process: 'cutting',
        materialGrade: 'Basswood / lime, solid',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 8,
          max: 15
        },
        powerPercent: {
          min: 65,
          max: 80
        },
        controllerPowerPercent: null,
        passes: '1; inspect first',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Optional second pass for a nearly complete kerf',
        notes: 'Expect more taper and edge darkening than with 3 mm stock.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E01',
        process: 'engraving',
        materialGrade: 'Basswood / lime',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 350,
          max: 500
        },
        powerPercent: {
          min: 15,
          max: 20
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Light or dark brown detail; interval chosen within source DPI band.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Basswood / lime',
    laserProfiles: []
  },
  {
    id: 'cherry',
    name: 'Cherry',
    family: 'Wood & cork',
    icon: 'tree-deciduous',
    surface: 'Warm reddish wood with flowing grain.',
    edge: 'Solid wood with end-grain variation.',
    qualification: '',
    preview: {
      kind: 'wood',
      colors: {
        face: '#ad6945',
        edge: '#6c3a25',
        highlight: '#d69a70'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L19',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '12–20 mm',
        reason: 'Some supplier tables claim these depths with long lenses. They are not validated for your machine.',
        nextStep: 'Qualify a coupon or use CNC/saw.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C15',
        process: 'cutting',
        materialGrade: 'Cherry, solid',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 15,
          max: 25
        },
        powerPercent: {
          min: 65,
          max: 80
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Proposed moderate-speed test, not Thunder\'s much faster published recipe.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C55',
        process: 'cutting',
        materialGrade: 'Cherry',
        method: 'Through cutting — published reference',
        thicknessMm: 8,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 10,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C56',
        process: 'cutting',
        materialGrade: 'Cherry',
        method: 'Through cutting — published reference',
        thicknessMm: 11,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 10,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C57',
        process: 'cutting',
        materialGrade: 'Cherry',
        method: 'Through cutting — published reference',
        thicknessMm: 15,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 8,
          max: 8
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C58',
        process: 'cutting',
        materialGrade: 'Cherry',
        method: 'Through cutting — published reference',
        thicknessMm: 20,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 4,
          max: 4
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'Cherry',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-cherry-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 75,
              max: 75
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cherry-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 8,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cherry-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 11,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cherry-5',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 8,
              max: 8
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '10',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cherry-6',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 4,
              max: 4
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '15',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-cherry-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 30,
              max: 30
            },
            controllerPowerPercent: {
              min: 30,
              max: 30
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-cherry-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 75,
              max: 75
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cherry-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 8,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cherry-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 11,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cherry-5',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 8,
              max: 8
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cherry-6',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 4,
              max: 4
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-cherry-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 25,
              max: 25
            },
            controllerPowerPercent: {
              min: 25,
              max: 25
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-cherry-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 75,
              max: 75
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cherry-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 8,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cherry-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 11,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cherry-5',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 8,
              max: 8
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cherry-6',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 4,
              max: 4
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-cherry-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-cherry-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 75,
              max: 75
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cherry-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 8,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cherry-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 11,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cherry-5',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 8,
              max: 8
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cherry-6',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 4,
              max: 4
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-cherry-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Cherry Wood — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 17,
              max: 17
            },
            controllerPowerPercent: {
              min: 17,
              max: 17
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'maple',
    name: 'Maple',
    family: 'Wood & cork',
    icon: 'leaf',
    surface: 'Pale wood with close, fine grain.',
    edge: 'Dense solid wood.',
    qualification: 'The cutting source groups maple and walnut. Test each species separately.',
    preview: {
      kind: 'wood',
      colors: {
        face: '#dbc298',
        edge: '#ae8750',
        highlight: '#f0e0bf'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L19',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '12–20 mm',
        reason: 'Some supplier tables claim these depths with long lenses. They are not validated for your machine.',
        nextStep: 'Qualify a coupon or use CNC/saw.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C16',
        process: 'cutting',
        materialGrade: 'Maple / walnut, solid',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 10,
          max: 18
        },
        powerPercent: {
          min: 70,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Species are not interchangeable. Save a separate preset for each batch.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C17',
        process: 'cutting',
        materialGrade: 'Maple / walnut, solid',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Experimental test',
        speedMmPerSec: {
          min: 6,
          max: 10
        },
        powerPercent: {
          min: 75,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 then optional 2',
        focusBelowTopMm: 1,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: '+1 mm only if the second pass is needed',
        notes: 'Dense hardwood is conditional. A saw or CNC may give a better edge.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E03',
        process: 'engraving',
        materialGrade: 'Maple',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 300,
          max: 400
        },
        powerPercent: {
          min: 25,
          max: 40
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.0635,
        dpi: 400,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Fine-grained wood can preserve small lettering.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Maple',
    laserProfiles: []
  },
  {
    id: 'walnut',
    name: 'Walnut',
    family: 'Wood & cork',
    icon: 'tree-deciduous',
    surface: 'Chocolate-brown wood with flowing grain.',
    edge: 'Dense solid wood.',
    qualification: 'The cutting source groups maple and walnut. Test each species separately.',
    preview: {
      kind: 'wood',
      colors: {
        face: '#72503b',
        edge: '#3e291f',
        highlight: '#9b7958'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L19',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '12–20 mm',
        reason: 'Some supplier tables claim these depths with long lenses. They are not validated for your machine.',
        nextStep: 'Qualify a coupon or use CNC/saw.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C16',
        process: 'cutting',
        materialGrade: 'Maple / walnut, solid',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 10,
          max: 18
        },
        powerPercent: {
          min: 70,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Species are not interchangeable. Save a separate preset for each batch.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C17',
        process: 'cutting',
        materialGrade: 'Maple / walnut, solid',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Experimental test',
        speedMmPerSec: {
          min: 6,
          max: 10
        },
        powerPercent: {
          min: 75,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 then optional 2',
        focusBelowTopMm: 1,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: '+1 mm only if the second pass is needed',
        notes: 'Dense hardwood is conditional. A saw or CNC may give a better edge.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E04',
        process: 'engraving',
        materialGrade: 'Walnut',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 300,
          max: 450
        },
        powerPercent: {
          min: 20,
          max: 35
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Dark stock can hide a dark engraving. Judge contrast on a sample.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Walnut',
    laserProfiles: []
  },
  {
    id: 'pine',
    name: 'Pine',
    family: 'Wood & cork',
    icon: 'tree-pine',
    surface: 'Distinct growth rings and occasional knots.',
    edge: 'Contrasting growth-ring structure.',
    qualification: '',
    preview: {
      kind: 'wood',
      colors: {
        face: '#dfbc7d',
        edge: '#a5793f',
        highlight: '#f4d9a9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 6,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [],
    engraving: [
      {
        id: 'E05',
        process: 'engraving',
        materialGrade: 'Pine',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 350,
          max: 500
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Growth-ring and resin variation can produce uneven darkness.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No cutting recipe supplied',
    engravingAvailability: 'Methods available below',
    tileName: 'Pine',
    laserProfiles: []
  },
  {
    id: 'veneer',
    name: 'Wood veneer',
    family: 'Wood & cork',
    icon: 'scroll',
    surface: 'Natural wood grain on a very thin sheet.',
    edge: 'Thin wood section; backing must be checked.',
    qualification: '',
    preview: {
      kind: 'wood',
      colors: {
        face: '#b78052',
        edge: '#835537',
        highlight: '#ddb281'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 0.6,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C18',
        process: 'cutting',
        materialGrade: 'Wood veneer, no backing',
        method: 'Through cutting',
        thicknessMm: 0.6,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 50,
          max: 100
        },
        powerPercent: {
          min: 15,
          max: 30
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Check any adhesive backing separately. Thin veneer curls readily.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'Wood veneer',
    laserProfiles: []
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    family: 'Wood & cork',
    icon: 'align-vertical-justify-center',
    surface: 'Parallel laminated bamboo strips.',
    edge: 'Strip construction with adhesive joints.',
    qualification: '',
    preview: {
      kind: 'bamboo',
      colors: {
        face: '#caa166',
        edge: '#957144',
        highlight: '#ecd2a0'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C19',
        process: 'cutting',
        materialGrade: 'Bamboo sheet, known adhesive',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 20,
          max: 20
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Source min/max are 10%/90%. Grain and laminating adhesive affect the edge.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E08',
        process: 'engraving',
        materialGrade: 'Bamboo',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 300,
          max: 450
        },
        powerPercent: {
          min: 20,
          max: 35
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Different strips may engrave to different tones.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Bamboo',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-bamboo-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '7.5',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-bamboo-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E08'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 40,
              max: 40
            },
            controllerPowerPercent: {
              min: 40,
              max: 40
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-bamboo-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-bamboo-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E08'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 35,
              max: 35
            },
            controllerPowerPercent: {
              min: 35,
              max: 35
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-bamboo-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-bamboo-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E08'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 27,
              max: 27
            },
            controllerPowerPercent: {
              min: 27,
              max: 27
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-bamboo-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-bamboo-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Bamboo — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E08'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 24,
              max: 24
            },
            controllerPowerPercent: {
              min: 24,
              max: 24
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'cork',
    name: 'Natural cork',
    family: 'Wood & cork',
    icon: 'grip',
    surface: 'Irregular natural cork granules.',
    edge: 'Granular structure through the sheet.',
    qualification: '',
    preview: {
      kind: 'cork',
      colors: {
        face: '#b88750',
        edge: '#705033',
        highlight: '#dab281'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C20',
        process: 'cutting',
        materialGrade: 'Natural cork, laser-compatible binder',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 40,
          max: 80
        },
        powerPercent: {
          min: 35,
          max: 55
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Do not substitute rubber-cork or adhesive-backed cork without identification.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E09',
        process: 'engraving',
        materialGrade: 'Natural cork',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 300,
          max: 500
        },
        powerPercent: {
          min: 10,
          max: 20
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Coarse texture favors larger detail. Stop before the surface crumbles.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance',
          url: 'https://www.stylecnc.com/user-manual/laser-engraving-cutting-wood.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, wood compatibility and repeated cutting guidance'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Natural cork',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-cork-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cork — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 210,
              max: 210
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '9',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-cork-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Cork — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E09'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-cork-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cork — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 210,
              max: 210
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-cork-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Cork — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E09'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 15,
              max: 15
            },
            controllerPowerPercent: {
              min: 15,
              max: 15
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-cork-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cork — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 210,
              max: 210
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-cork-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Cork — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E09'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 12,
              max: 12
            },
            controllerPowerPercent: {
              min: 12,
              max: 12
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-cork-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cork — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 210,
              max: 210
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-cork-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Cork — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E09'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 10,
              max: 10
            },
            controllerPowerPercent: {
              min: 10,
              max: 10
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'black-mdf',
    name: 'Black / colored MDF',
    family: 'Wood & cork',
    icon: 'layers',
    surface: 'Dyed, fine-fiber matte surface.',
    edge: 'A colored compressed-fiber core.',
    qualification: 'Dyed MDF grade must be verified. Ordinary MDF cutting values cannot be assumed to apply.',
    preview: {
      kind: 'fiber',
      colors: {
        face: '#414746',
        edge: '#242a29',
        highlight: '#717975'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 6,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L18',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '10–22 mm',
        reason: 'Thunder lists 10/15 mm settings but omits passes and air units. No dependable 22 mm recipe established.',
        nextStep: 'CNC or saw for through cuts. Verified stock can still be engraved.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E07',
        process: 'engraving',
        materialGrade: 'Colored / black MDF, grade verified',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 350,
          max: 500
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Transfer trial from ordinary MDF. Depth may show better than color contrast.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No cutting recipe supplied',
    engravingAvailability: 'Methods available below',
    tileName: 'Black / colored MDF',
    laserProfiles: []
  },
  {
    id: 'cast-clear',
    name: 'Cast clear acrylic',
    family: 'Plastics',
    icon: 'square',
    surface: 'Transparent, smooth PMMA.',
    edge: 'Clear polished-edge appearance.',
    qualification: 'Clear and colored cast PMMA share the cutting rows in the workbook.',
    preview: {
      kind: 'clear',
      colors: {
        face: '#c8e7eb',
        edge: '#86b8bc',
        highlight: '#f4ffff'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L20',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '12–20 mm',
        reason: 'Thunder publishes 15/20 mm acrylic cutting data without identifying cast versus extruded stock or pass count. These are references, not a validated recipe for this grade.',
        nextStep: 'Higher power or mechanical cutting is preferable.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C21',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 2,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 15,
          max: 25
        },
        powerPercent: {
          min: 70,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0.5,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Proposed thinner-stock trial. Clear and colored PMMA both absorb CO2 light.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C22',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 10,
          max: 15
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1 published',
        focusBelowTopMm: 1.5,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Keep focus fixed initially',
        notes: 'Mid-thickness focus follows the source. Preserve nozzle clearance.',
        source: {
          title: 'Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C23',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 4,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 7,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 2,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Keep focus fixed initially',
        notes: 'Interpolated trial. Use only a power command within the tube current limit.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C24',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 5,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 5,
          max: 7
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1–2 published',
        focusBelowTopMm: 2.5,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Inspect before pass 2; refocus not prescribed',
        notes: 'Two passes are optional in the source. Support parts against movement.',
        source: {
          title: 'Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C25',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 4,
          max: 6
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1 then optional 2',
        focusBelowTopMm: 3,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Keep focus fixed initially',
        notes: 'Interpolated trial. Melting, welding back and taper can dominate.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C26',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 8,
        evidence: 'Experimental test',
        speedMmPerSec: {
          min: 2,
          max: 4
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '2-stage trial',
        focusBelowTopMm: 3,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'If needed, +1 mm for pass 2',
        notes: 'Unverified staged-focus trial between 5 and 10 mm source recipes.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C27',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 10,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 1,
          max: 2
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '2 published',
        focusBelowTopMm: 5,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Source uses mid-depth focus; no Z-step specified',
        notes: 'Slow, demanding cut. Source prefers 80 W or more for this thickness.',
        source: {
          title: 'Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C59',
        process: 'cutting',
        materialGrade: 'Acrylic / PMMA — cast versus extruded unspecified',
        method: 'Through cutting — published reference',
        thicknessMm: 15,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 3,
          max: 3
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it. Acrylic manufacturing grade is not specified by the source.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C60',
        process: 'cutting',
        materialGrade: 'Acrylic / PMMA — cast versus extruded unspecified',
        method: 'Through cutting — published reference',
        thicknessMm: 20,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 2,
          max: 2
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it. Acrylic manufacturing grade is not specified by the source.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E10',
        process: 'engraving',
        materialGrade: 'Cast clear acrylic',
        method: 'Frosted engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 400,
          max: 500
        },
        powerPercent: {
          min: 10,
          max: 18
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'White frost. Mirror the artwork when engraving from the rear.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Clear cast acrylic',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-cast-clear-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-clear-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-clear-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-clear-5',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '10',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-clear-6',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '15',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-cast-clear-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E10'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 30,
              max: 30
            },
            controllerPowerPercent: {
              min: 30,
              max: 30
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-cast-clear-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-clear-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-clear-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-clear-5',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-clear-6',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-cast-clear-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E10'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 25,
              max: 25
            },
            controllerPowerPercent: {
              min: 25,
              max: 25
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-cast-clear-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-clear-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-clear-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-clear-5',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-clear-6',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-cast-clear-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E10'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-cast-clear-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-clear-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-clear-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-clear-5',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-clear-6',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-cast-clear-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E10'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 14,
              max: 14
            },
            controllerPowerPercent: {
              min: 14,
              max: 14
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'cast-color',
    name: 'Cast colored acrylic',
    family: 'Plastics',
    icon: 'palette',
    surface: 'Pigmented PMMA; blue is illustrative.',
    edge: 'A colored edge through the sheet.',
    qualification: 'Clear and colored cast PMMA share the cutting rows in the workbook.',
    preview: {
      kind: 'plastic',
      colors: {
        face: '#266faa',
        edge: '#13416c',
        highlight: '#73b8dc'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L20',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '12–20 mm',
        reason: 'Thunder publishes 15/20 mm acrylic cutting data without identifying cast versus extruded stock or pass count. These are references, not a validated recipe for this grade.',
        nextStep: 'Higher power or mechanical cutting is preferable.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C21',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 2,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 15,
          max: 25
        },
        powerPercent: {
          min: 70,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0.5,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Proposed thinner-stock trial. Clear and colored PMMA both absorb CO2 light.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C22',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 10,
          max: 15
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1 published',
        focusBelowTopMm: 1.5,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Keep focus fixed initially',
        notes: 'Mid-thickness focus follows the source. Preserve nozzle clearance.',
        source: {
          title: 'Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C23',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 4,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 7,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 2,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Keep focus fixed initially',
        notes: 'Interpolated trial. Use only a power command within the tube current limit.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C24',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 5,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 5,
          max: 7
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1–2 published',
        focusBelowTopMm: 2.5,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Inspect before pass 2; refocus not prescribed',
        notes: 'Two passes are optional in the source. Support parts against movement.',
        source: {
          title: 'Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C25',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 6,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 4,
          max: 6
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1 then optional 2',
        focusBelowTopMm: 3,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Keep focus fixed initially',
        notes: 'Interpolated trial. Melting, welding back and taper can dominate.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C26',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 8,
        evidence: 'Experimental test',
        speedMmPerSec: {
          min: 2,
          max: 4
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '2-stage trial',
        focusBelowTopMm: 3,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'If needed, +1 mm for pass 2',
        notes: 'Unverified staged-focus trial between 5 and 10 mm source recipes.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C27',
        process: 'cutting',
        materialGrade: 'Cast acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 10,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 1,
          max: 2
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '2 published',
        focusBelowTopMm: 5,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Source uses mid-depth focus; no Z-step specified',
        notes: 'Slow, demanding cut. Source prefers 80 W or more for this thickness.',
        source: {
          title: 'Gweike, 60 W cast acrylic; approximately 90% power',
          url: 'https://www.gweikecloud.com/blogs/news/60w-100w-acrylic-laser-cutting-settings',
          supports: 'Gweike, 60 W cast acrylic; approximately 90% power'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C61',
        process: 'cutting',
        materialGrade: 'Acrylic / PMMA — cast versus extruded unspecified',
        method: 'Through cutting — published reference',
        thicknessMm: 15,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 3,
          max: 3
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it. Acrylic manufacturing grade is not specified by the source.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C62',
        process: 'cutting',
        materialGrade: 'Acrylic / PMMA — cast versus extruded unspecified',
        method: 'Through cutting — published reference',
        thicknessMm: 20,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 2,
          max: 2
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it. Acrylic manufacturing grade is not specified by the source.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E11',
        process: 'engraving',
        materialGrade: 'Cast colored acrylic',
        method: 'Frosted engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 350,
          max: 450
        },
        powerPercent: {
          min: 12,
          max: 20
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Contrast depends on pigment and color.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Colored cast acrylic',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-cast-color-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-color-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-color-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-color-5',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '10',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cast-color-6',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '15',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-cast-color-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E11'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 30,
              max: 30
            },
            controllerPowerPercent: {
              min: 30,
              max: 30
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-cast-color-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-color-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-color-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-color-5',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cast-color-6',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-cast-color-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E11'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 25,
              max: 25
            },
            controllerPowerPercent: {
              min: 25,
              max: 25
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-cast-color-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-color-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-color-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-color-5',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cast-color-6',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-cast-color-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E11'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-cast-color-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-color-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-color-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-color-5',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cast-color-6',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-cast-color-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E11'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 14,
              max: 14
            },
            controllerPowerPercent: {
              min: 14,
              max: 14
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'extruded',
    name: 'Extruded acrylic',
    family: 'Plastics',
    icon: 'square',
    surface: 'Smooth PMMA, visually similar to cast acrylic.',
    edge: 'Clear edge; process and batch still matter.',
    qualification: 'The illustration cannot distinguish cast from extruded PMMA. Confirm the supplier grade.',
    preview: {
      kind: 'clear',
      colors: {
        face: '#d6e6ec',
        edge: '#9ab9c7',
        highlight: '#ffffff'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L20',
        label: 'Thick cutting limited',
        severity: 'red',
        appliesTo: '12–20 mm',
        reason: 'Thunder publishes 15/20 mm acrylic cutting data without identifying cast versus extruded stock or pass count. These are references, not a validated recipe for this grade.',
        nextStep: 'Higher power or mechanical cutting is preferable.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C28',
        process: 'cutting',
        materialGrade: 'Extruded acrylic / PMMA',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 10,
          max: 20
        },
        powerPercent: {
          min: 70,
          max: 85
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Can give polished edges. Engraving has less white contrast than cast PMMA.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Trotec, cast versus extruded PMMA',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-cutting-acrylic',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Trotec, cast versus extruded PMMA'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C63',
        process: 'cutting',
        materialGrade: 'Acrylic / PMMA — cast versus extruded unspecified',
        method: 'Through cutting — published reference',
        thicknessMm: 15,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 3,
          max: 3
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it. Acrylic manufacturing grade is not specified by the source.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C64',
        process: 'cutting',
        materialGrade: 'Acrylic / PMMA — cast versus extruded unspecified',
        method: 'Through cutting — published reference',
        thicknessMm: 20,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 2,
          max: 2
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it. Acrylic manufacturing grade is not specified by the source.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E12',
        process: 'engraving',
        materialGrade: 'Extruded acrylic',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 400,
          max: 500
        },
        powerPercent: {
          min: 10,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Expect clearer, melted-looking detail rather than strong white frost.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Extruded acrylic',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-extruded-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-extruded-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-extruded-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-extruded-5',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '10',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-extruded-6',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '15',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-extruded-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E12'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 30,
              max: 30
            },
            controllerPowerPercent: {
              min: 30,
              max: 30
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-extruded-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-extruded-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-extruded-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-extruded-5',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-extruded-6',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-extruded-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E12'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 25,
              max: 25
            },
            controllerPowerPercent: {
              min: 25,
              max: 25
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-extruded-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-extruded-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-extruded-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-extruded-5',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-extruded-6',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-extruded-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E12'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-extruded-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 50,
              max: 50
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-extruded-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 25,
              max: 25
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-extruded-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 5,
              max: 5
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-extruded-5',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 15,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 3,
              max: 3
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-extruded-6',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 2,
              max: 2
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-extruded-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Acrylic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E12'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 14,
              max: 14
            },
            controllerPowerPercent: {
              min: 14,
              max: 14
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            qualification: 'Acrylic grade is unspecified in the source; qualify the exact cast/extruded stock and pigment.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'mirror',
    name: 'Mirror acrylic',
    family: 'Plastics',
    icon: 'scan-face',
    surface: 'Reflective coated surface.',
    edge: 'PMMA with a backing layer.',
    qualification: 'Only confirmed laser-grade mirror acrylic; identify the reflective backing.',
    preview: {
      kind: 'mirror',
      colors: {
        face: '#dae0df',
        edge: '#7e9496',
        highlight: '#ffffff'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C29',
        process: 'cutting',
        materialGrade: 'Mirror acrylic, confirmed laser grade',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 10,
          max: 15
        },
        powerPercent: {
          min: 80,
          max: 90
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Requires approval of the reflective backing and coatings, not just the PMMA.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Trotec, cast versus extruded PMMA',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-cutting-acrylic',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Trotec, cast versus extruded PMMA'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'Mirror acrylic',
    laserProfiles: []
  },
  {
    id: 'laminate',
    name: 'Engraving laminate',
    family: 'Plastics',
    icon: 'panels-top-left',
    surface: 'Thin contrasting colored cap.',
    edge: 'A thicker core beneath the thin cap.',
    qualification: 'Use a laser-rated acrylic laminate.',
    preview: {
      kind: 'laminate',
      colors: {
        face: '#343535',
        edge: '#d9cfb6',
        highlight: '#777a77'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 1.6,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C30',
        process: 'cutting',
        materialGrade: 'Two-layer acrylic engraving laminate',
        method: 'Through cutting',
        thicknessMm: 1.6,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 20,
          max: 35
        },
        powerPercent: {
          min: 50,
          max: 70
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Only laser-rated acrylic laminate. Rotary-only ABS/PVC sign stock differs.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Trotec, cast versus extruded PMMA',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-cutting-acrylic',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Trotec, cast versus extruded PMMA'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E13',
        process: 'engraving',
        materialGrade: 'Two-layer acrylic laminate',
        method: 'Remove top color',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 350,
          max: 450
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.0635,
        dpi: 400,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Stop after the cap layer clears. Use a laser-rated product.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Engraving laminate',
    laserProfiles: []
  },
  {
    id: 'acetal',
    name: 'POM / acetal / Delrin',
    family: 'Plastics',
    icon: 'cog',
    surface: 'Smooth, opaque engineering plastic.',
    edge: 'Dense, uniform unfilled polymer.',
    qualification: 'Cuttable, conditional material. Published cutting values remain available below; extraction is a requirement.',
    preview: {
      kind: 'plastic',
      colors: {
        face: '#f2eee4',
        edge: '#c0bbae',
        highlight: '#ffffff'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'W-POM',
        label: 'Formaldehyde · extraction required',
        severity: 'red',
        appliesTo: 'Cutting and engraving',
        reason: 'Laser cutting Delrin releases formaldehyde. Do not process without effective source extraction specified for the laser installation; an open window, room fan or air assist is not fume capture.',
        nextStep: 'Use an identified, unfilled grade and follow the machine and material supplier extraction requirements.',
        source: {
          title: 'Xometry: Delrin laser cutting',
          url: 'https://www.xometry.com/resources/sheet/delrin-cutting/'
        }
      }
    ],
    cutting: [
      {
        id: 'C31',
        process: 'cutting',
        materialGrade: 'POM / acetal / Delrin, unfilled',
        method: 'Through cutting',
        thicknessMm: 1,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 140,
          max: 140
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'High-speed reference; short details may never reach this speed. Strong extraction.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C32',
        process: 'cutting',
        materialGrade: 'POM / acetal / Delrin, unfilled',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 20,
          max: 20
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0.5,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'None initially',
        notes: 'Can suit small mechanical parts. Expect formaldehyde-bearing decomposition fumes.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C33',
        process: 'cutting',
        materialGrade: 'POM / acetal / Delrin, unfilled',
        method: 'Through cutting',
        thicknessMm: 5,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 10,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 1,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Optional second pass only after inspection',
        notes: 'Melt can rejoin the kerf. Unfilled grade only; do not assume all additives are safe.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E24',
        process: 'engraving',
        materialGrade: 'POM / Delrin, unfilled',
        method: 'Relief engraving',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 250,
          max: 400
        },
        powerPercent: {
          min: 20,
          max: 35
        },
        controllerPowerPercent: null,
        passes: '1 then inspect',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Produces relief more readily than a contrasting color. Formaldehyde fume control.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Delrin / POM',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-acetal-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 140,
              max: 140
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-acetal-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-acetal-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-acetal-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Delrin — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E24'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 90,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-acetal-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 140,
              max: 140
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-acetal-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-acetal-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-acetal-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Delrin — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E24'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 80,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-acetal-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 140,
              max: 140
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-acetal-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-acetal-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-acetal-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Delrin — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E24'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 65,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-acetal-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 140,
              max: 140
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-acetal-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 20,
              max: 20
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-acetal-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Delrin — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-acetal-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Delrin — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E24'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 55,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'pet',
    name: 'PET / Mylar film',
    family: 'Plastics',
    icon: 'files',
    surface: 'Thin, smooth translucent film.',
    edge: 'A very thin flexible film edge.',
    qualification: '',
    preview: {
      kind: 'clear',
      colors: {
        face: '#d4ddd7',
        edge: '#96afa5',
        highlight: '#ffffff'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 0.25,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C34',
        process: 'cutting',
        materialGrade: 'PET / Mylar stencil film, uncoated',
        method: 'Through cutting',
        thicknessMm: 0.25,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 50,
          max: 100
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Trial window for thin polyester film. Do not confuse PET with PVC or polycarbonate.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'PET / Mylar film',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-pet-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Mylar — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 70,
              max: 70
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8.2',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-pet-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Mylar — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 40,
              max: 40
            },
            controllerPowerPercent: {
              min: 40,
              max: 40
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-pet-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Mylar — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 70,
              max: 70
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-pet-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Mylar — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 35,
              max: 35
            },
            controllerPowerPercent: {
              min: 35,
              max: 35
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-pet-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Mylar — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 70,
              max: 70
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-pet-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Mylar — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 27,
              max: 27
            },
            controllerPowerPercent: {
              min: 27,
              max: 27
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-pet-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Mylar — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 70,
              max: 70
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-pet-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Mylar — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 24,
              max: 24
            },
            controllerPowerPercent: {
              min: 24,
              max: 24
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Confirm the uncoated PET grade and actual film thickness.',
            qualification: 'Confirm the uncoated PET grade and actual film thickness.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'pvc',
    name: 'PVC / vinyl / expanded PVC / Foamex',
    family: 'Plastics',
    icon: 'ban',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'plastic',
      colors: {
        face: '#deddd0',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L01',
        label: 'Do not laser',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Chlorinated material. Do not cut or engrave it. Vinyl is often PVC.',
        nextStep: 'Use PMMA or a verified laser laminate.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Do not cut this material',
    engravingAvailability: 'Do not engrave this material',
    tileName: 'PVC / vinyl',
    laserProfiles: []
  },
  {
    id: 'ptfe',
    name: 'PTFE / Teflon / fluorinated plastics',
    family: 'Plastics',
    icon: 'ban',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'plastic',
      colors: {
        face: '#f1f0e7',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L02',
        label: 'Do not laser',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Fluorinated decomposition products are unsuitable for this workflow.',
        nextStep: 'Machine mechanically.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Do not cut this material',
    engravingAvailability: 'Do not engrave this material',
    tileName: 'PTFE / Teflon',
    laserProfiles: []
  },
  {
    id: 'abs',
    name: 'ABS sheet and 3D prints',
    family: 'Plastics',
    icon: 'box',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'plastic',
      colors: {
        face: '#d0cdbf',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L09',
        label: 'Not recommended',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Poor thermal cutting behavior and decomposition fumes. No workshop recipe endorsed.',
        nextStep: 'PMMA or mechanical cutting.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Avoid for this catalog. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'ABS',
    laserProfiles: []
  },
  {
    id: 'polycarbonate',
    name: 'Polycarbonate / Lexan',
    family: 'Plastics',
    icon: 'square',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'clear',
      colors: {
        face: '#dedcd0',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L10',
        label: 'Not recommended',
        severity: 'red',
        appliesTo: 'Sheet stock',
        reason: 'Tends to melt, discolor and char. CO2 marking exists on specialized grades, but is not a general recipe.',
        nextStep: 'PMMA for clear laser-cut parts.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Avoid for cutting. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Polycarbonate / Lexan',
    laserProfiles: []
  },
  {
    id: 'hdpe-pp',
    name: 'HDPE / polypropylene sheet',
    family: 'Plastics',
    icon: 'square',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'plastic',
      colors: {
        face: '#e0ded2',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 5,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L15',
        label: 'Not recommended',
        severity: 'red',
        appliesTo: 'Especially thicker sheet',
        reason: 'Can melt and warp. No reliable 60 W through-cut recipe was established in this research.',
        nextStep: 'Use a saw, knife or CNC as appropriate.',
        source: {
          title: 'Gweike, PVC and unidentified material exclusions',
          url: 'https://www.gweikecloud.com/blogs/news/do-not-laser-pvc-identify-safer-alternatives'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'No recipe supplied. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'HDPE / polypropylene',
    laserProfiles: []
  },
  {
    id: 'leather',
    name: 'Vegetable-tanned leather',
    family: 'Leather',
    icon: 'tag',
    surface: 'Natural grain and warm tan color.',
    edge: 'Fibrous leather cross-section.',
    qualification: 'Known vegetable-tanned leather; this does not qualify chrome-tanned or unknown leather.',
    preview: {
      kind: 'leather',
      colors: {
        face: '#b97c48',
        edge: '#745236',
        highlight: '#dca570'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C35',
        process: 'cutting',
        materialGrade: 'Vegetable-tanned leather',
        method: 'Through cutting',
        thicknessMm: 1.5,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 90,
          max: 90
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Thunder labels leather generically. This catalog restricts use to known veg-tan.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C36',
        process: 'cutting',
        materialGrade: 'Vegetable-tanned leather',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 40,
          max: 40
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Usually unnecessary',
        notes: 'Expect dark cut edges. Test strength and soot transfer after cleaning.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E14',
        process: 'engraving',
        materialGrade: 'Vegetable-tanned leather, light',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 300,
          max: 400
        },
        powerPercent: {
          min: 10,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Test low-power firing and inspect remaining leather strength.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'E15',
        process: 'engraving',
        materialGrade: 'Vegetable-tanned leather, heavy',
        method: 'Surface engraving',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 200,
          max: 350
        },
        powerPercent: {
          min: 15,
          max: 20
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'More energy darkens and deepens the mark.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Vegetable-tanned leather',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-leather-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 90,
              max: 90
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '5.7',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-leather-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8.2',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-leather-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Leather — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E14',
              'E15'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 25,
              max: 25
            },
            controllerPowerPercent: {
              min: 25,
              max: 25
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-leather-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 90,
              max: 90
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-leather-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-leather-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Leather — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E14',
              'E15'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-leather-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 90,
              max: 90
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-leather-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-leather-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Leather — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E14',
              'E15'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 16,
              max: 16
            },
            controllerPowerPercent: {
              min: 16,
              max: 16
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-leather-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1.5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 90,
              max: 90
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-leather-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Leather — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-leather-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Leather — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E14',
              'E15'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 14,
              max: 14
            },
            controllerPowerPercent: {
              min: 14,
              max: 14
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            qualification: 'Source says leather generically. This catalog restricts use to qualified vegetable-tanned stock.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'leatherette',
    name: 'PU leatherette',
    family: 'Leather',
    icon: 'tag',
    surface: 'An embossed synthetic surface.',
    edge: 'Coated skin over a backing.',
    qualification: 'Supplier laser-rated stock only; confirm pigments, backing and additives.',
    preview: {
      kind: 'leather',
      colors: {
        face: '#704943',
        edge: '#463431',
        highlight: '#a47765'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 1,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [],
    engraving: [
      {
        id: 'E16',
        process: 'engraving',
        materialGrade: 'PU leatherette, supplier laser-rated',
        method: 'Surface / cap removal',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 300,
          max: 450
        },
        powerPercent: {
          min: 8,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.085,
        dpi: 298.8235294117647,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'PU alone is not a safety guarantee. Verify backing, pigments and additives.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No cutting recipe supplied',
    engravingAvailability: 'Methods available below',
    tileName: 'PU leatherette',
    laserProfiles: []
  },
  {
    id: 'chrome-leather',
    name: 'Unknown or chrome-tanned leather',
    family: 'Leather',
    icon: 'tag',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'leather',
      colors: {
        face: '#7c574b',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L07',
        label: 'Unqualified leather',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'No recipe supplied. Tanning chemistry and chromium content require qualification.',
        nextStep: 'Known vegetable-tanned leather.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Do not use by default. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Unknown / chrome leather',
    laserProfiles: []
  },
  {
    id: 'unknown-leatherette',
    name: 'Unknown faux leather / fabric coatings',
    family: 'Leather',
    icon: 'tag',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'leather',
      colors: {
        face: '#546167',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 1,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L08',
        label: 'Identify composition',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'PU label alone does not identify every layer. PVC backing is common.',
        nextStep: 'Supplier-confirmed laser-safe construction.',
        source: {
          title: 'Thunder, fabric compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/fabric.html'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Identify first. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Unknown faux leather',
    laserProfiles: []
  },
  {
    id: 'rubber',
    name: 'Laser stamp rubber',
    family: 'Foam & rubber',
    icon: 'stamp',
    surface: 'Matte, purpose-made stamp surface.',
    edge: 'A dense rubber sheet.',
    qualification: 'Halogen-free laser stamp rubber only.',
    preview: {
      kind: 'rubber',
      colors: {
        face: '#b75c56',
        edge: '#793e3c',
        highlight: '#cf8880'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2.3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C37',
        process: 'cutting',
        materialGrade: 'Laser stamp rubber, halogen-free',
        method: 'Through cutting',
        thicknessMm: 2.3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 35,
          max: 35
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Firm, dry air',
        betweenPasses: 'Usually unnecessary',
        notes: 'Purpose-made stamp rubber only. Engrave the relief before cutting the outline.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E23',
        process: 'engraving',
        materialGrade: 'Laser stamp rubber, 2.3 mm sheet',
        method: 'Relief engraving',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 150,
          max: 250
        },
        powerPercent: {
          min: 45,
          max: 65
        },
        controllerPowerPercent: null,
        passes: '1 then inspect depth',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.0635,
        dpi: 400,
        airAssist: 'Firm, dry air',
        betweenPasses: null,
        notes: 'Mirror artwork. Add shoulders. Test repeated engraving to approximately 1 mm relief.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, formulation-specific rubber compatibility',
          url: 'https://www.thunderlaser.com/material-application/rubber.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, formulation-specific rubber compatibility'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Laser stamp rubber',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-rubber-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Rubber — supplier sample',
            method: 'Through cutting',
            thicknessMm: 2.3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '7.2',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-rubber-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Rubber — supplier sample',
            method: 'Stamp relief engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E23'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 90,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.0635,
            dpi: 400,
            airAssist: null,
            sourceAirValue: '7.5',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-rubber-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Rubber — supplier sample',
            method: 'Through cutting',
            thicknessMm: 2.3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-rubber-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Rubber — supplier sample',
            method: 'Stamp relief engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E23'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 80,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.0635,
            dpi: 400,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-rubber-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Rubber — supplier sample',
            method: 'Through cutting',
            thicknessMm: 2.3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-rubber-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Rubber — supplier sample',
            method: 'Stamp relief engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E23'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 65,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.0635,
            dpi: 400,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-rubber-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Rubber — supplier sample',
            method: 'Through cutting',
            thicknessMm: 2.3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 35,
              max: 35
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-rubber-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Rubber — supplier sample',
            method: 'Stamp relief engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E23'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 55,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.0635,
            dpi: 400,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            qualification: 'Source rubber formulation is unspecified. Use only supplier-qualified, halogen-free laser stamp rubber.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'eva',
    name: 'EVA foam',
    family: 'Foam & rubber',
    icon: 'cloud',
    surface: 'Fine cellular foam texture.',
    edge: 'Visible cells through the section.',
    qualification: 'Identified laser-compatible formulation only.',
    preview: {
      kind: 'foam',
      colors: {
        face: '#343d43',
        edge: '#1a2228',
        highlight: '#65727d'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L21',
        label: 'Thick foam: qualify first',
        severity: 'red',
        appliesTo: '20–30 mm',
        reason: 'Thunder’s current DC glass 60 W table lists 20/30 mm EVA with a 4-inch lens. Pass count and focus are omitted; qualify the exact foam, clearance and kerf.',
        nextStep: 'Validate the exact foam and lens combination.',
        source: {
          title: 'Thunder Nova, DC glass 60 W cutting table',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html'
        }
      }
    ],
    cutting: [
      {
        id: 'C38',
        process: 'cutting',
        materialGrade: 'EVA foam, identified laser-compatible grade',
        method: 'Through cutting',
        thicknessMm: 2,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 40,
          max: 80
        },
        powerPercent: {
          min: 20,
          max: 40
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Inspect melt recession and shrinkage. Unknown craft foam may contain additives.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/foam.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C39',
        process: 'cutting',
        materialGrade: 'EVA foam, identified laser-compatible grade',
        method: 'Through cutting',
        thicknessMm: 5,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 20,
          max: 40
        },
        powerPercent: {
          min: 30,
          max: 50
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Use the least heat that separates the part. Avoid repeated melting passes.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/foam.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C40',
        process: 'cutting',
        materialGrade: 'EVA foam, identified laser-compatible grade',
        method: 'Through cutting',
        thicknessMm: 10,
        evidence: 'Experimental test',
        speedMmPerSec: {
          min: 15,
          max: 25
        },
        powerPercent: {
          min: 50,
          max: 70
        },
        controllerPowerPercent: null,
        passes: '1; inspect first',
        focusBelowTopMm: 1,
        lensInches: 2.5,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'Only test deeper focus if edge stays stable',
        notes: 'Proposed glass-tube trial. Published RF recipes are not directly transferable.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/foam.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C65',
        process: 'cutting',
        materialGrade: 'EVA foam',
        method: 'Through cutting — published reference',
        thicknessMm: 10,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 60,
          max: 60
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C66',
        process: 'cutting',
        materialGrade: 'EVA foam',
        method: 'Through cutting — published reference',
        thicknessMm: 20,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 30,
          max: 30
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C67',
        process: 'cutting',
        materialGrade: 'EVA foam',
        method: 'Through cutting — published reference',
        thicknessMm: 30,
        evidence: 'Published 60 W · incomplete',
        speedMmPerSec: {
          min: 10,
          max: 10
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: null,
        focusBelowTopMm: null,
        lensInches: 4,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Pass count, focus and usable air-pressure units are not established by this reference. Qualify a coupon before adopting it.',
        source: {
          title: 'Thunder Nova · DC glass 60 W',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thickness, speed, controller min/max power and lens. Machine-specific reference; incomplete process setup.'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E25',
        process: 'engraving',
        materialGrade: 'EVA foam, verified formulation',
        method: 'Shallow engraving',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 300,
          max: 500
        },
        powerPercent: {
          min: 10,
          max: 20
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Watch shrinking and a hardened melt skin.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/foam.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, foam compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'EVA foam',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-eva-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 60,
              max: 60
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8.4',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-eva-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8.2',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-eva-4',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 30,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '9',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-eva-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E25'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 15,
              max: 15
            },
            controllerPowerPercent: {
              min: 15,
              max: 15
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-eva-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 60,
              max: 60
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-eva-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-eva-4',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 30,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-eva-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E25'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 10,
              max: 10
            },
            controllerPowerPercent: {
              min: 10,
              max: 10
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-eva-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 60,
              max: 60
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-eva-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-eva-4',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 30,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-eva-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E25'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 8,
              max: 8
            },
            controllerPowerPercent: {
              min: 8,
              max: 8
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-eva-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 10,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 60,
              max: 60
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-eva-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 20,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-eva-4',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Through cutting',
            thicknessMm: 30,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 10,
              max: 10
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 4,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-eva-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'EVA Foam — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E25'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 7,
              max: 7
            },
            controllerPowerPercent: {
              min: 7,
              max: 7
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'neoprene',
    name: 'Neoprene / chloroprene rubber',
    family: 'Foam & rubber',
    icon: 'ban',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'rubber',
      colors: {
        face: '#333c3d',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L03',
        label: 'Do not laser',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Contains chlorine. Rubber appearance does not identify its chemistry.',
        nextStep: 'Choose verified laser stamp rubber.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Do not cut this material',
    engravingAvailability: 'Do not engrave this material',
    tileName: 'Neoprene rubber',
    laserProfiles: []
  },
  {
    id: 'polystyrene',
    name: 'Polystyrene / EPS / XPS foam',
    family: 'Foam & rubber',
    icon: 'cloud',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'foam',
      colors: {
        face: '#e9e8d9',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 15,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L11',
        label: 'Not recommended',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'High melting and ignition concern. No validated recipe provided.',
        nextStep: 'Knife cutting or verified EVA.',
        source: {
          title: 'Thunder, foam compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/foam.html'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Avoid for this catalog. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Polystyrene / EPS / XPS',
    laserProfiles: []
  },
  {
    id: 'unknown-foam',
    name: 'Unidentified foam / PU upholstery foam',
    family: 'Foam & rubber',
    icon: 'cloud',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'foam',
      colors: {
        face: '#b9aa77',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 20,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L12',
        label: 'Identify composition',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Some PU formulations are industrially laser processed. Unknown stock and additives are excluded here.',
        nextStep: 'Use supplier-qualified foam and extraction.',
        source: {
          title: 'Thunder, foam compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/foam.html'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Identify first. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Unknown / PU foam',
    laserProfiles: []
  },
  {
    id: 'pe-foam',
    name: 'PE / EPE foam, known laser-compatible grade',
    family: 'Foam & rubber',
    icon: 'cloud',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'foam',
      colors: {
        face: '#e1e3d9',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 10,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L13',
        label: 'Grade dependent',
        severity: 'red',
        appliesTo: 'Thickness must be qualified',
        reason: 'CO2 cutting is supported for selected grades, but no verified 60 W recipe was located.',
        nextStep: 'Obtain formulation and test a coupon.',
        source: {
          title: 'Thunder, foam compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/foam.html'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Conditional material. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'PE / EPE foam',
    laserProfiles: []
  },
  {
    id: 'other-rubber',
    name: 'Silicone / EPDM / NBR / natural rubber',
    family: 'Foam & rubber',
    icon: 'stamp',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'rubber',
      colors: {
        face: '#566b72',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L14',
        label: 'Grade dependent',
        severity: 'red',
        appliesTo: 'Thickness must be qualified',
        reason: 'Selected grades are laser processable. Fillers and curing chemistry prevent a universal recipe.',
        nextStep: 'Use supplier laser guidance.',
        source: {
          title: 'Thunder, formulation-specific rubber compatibility',
          url: 'https://www.thunderlaser.com/material-application/rubber.html'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Conditional material. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Silicone / EPDM / NBR',
    laserProfiles: []
  },
  {
    id: 'paper',
    name: 'Paper / kraft',
    family: 'Paper & board',
    icon: 'file',
    surface: 'Plain paper fibers; kraft shown.',
    edge: 'A very thin sheet edge.',
    qualification: '',
    preview: {
      kind: 'paper',
      colors: {
        face: '#c7a26e',
        edge: '#9b764b',
        highlight: '#e8c894'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 0.1,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C41',
        process: 'cutting',
        materialGrade: 'Plain paper / kraft paper',
        method: 'Through cutting',
        thicknessMm: 0.1,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 100,
          max: 200
        },
        powerPercent: {
          min: 10,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Check stable firing at low power. Hold the sheet flat and watch for ignition.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/paper.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E28',
        process: 'engraving',
        materialGrade: 'Paper / cardstock / cardboard',
        method: 'Surface marking / color removal',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 400,
          max: 600
        },
        powerPercent: {
          min: 8,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Engraving may cut through thin paper. Start on thick plain cardstock.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/paper.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Paper / kraft',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-paper-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Paper — supplier sample',
            method: 'Through cutting',
            thicknessMm: 0.6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '7.4',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-paper-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Paper — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-paper-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Paper — supplier sample',
            method: 'Through cutting',
            thicknessMm: 0.6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-paper-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Paper — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 15,
              max: 15
            },
            controllerPowerPercent: {
              min: 15,
              max: 15
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-paper-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Paper — supplier sample',
            method: 'Through cutting',
            thicknessMm: 0.6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-paper-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Paper — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 12,
              max: 12
            },
            controllerPowerPercent: {
              min: 12,
              max: 12
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-paper-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Paper — supplier sample',
            method: 'Through cutting',
            thicknessMm: 0.6,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-paper-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Paper — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 10,
              max: 10
            },
            controllerPowerPercent: {
              min: 10,
              max: 10
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'cardstock',
    name: 'Cardstock',
    family: 'Paper & board',
    icon: 'files',
    surface: 'Smooth, uncoated paper surface.',
    edge: 'A thicker compact paper section.',
    qualification: '',
    preview: {
      kind: 'paper',
      colors: {
        face: '#e7e1cd',
        edge: '#b7ad94',
        highlight: '#faf5e4'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 0.3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C42',
        process: 'cutting',
        materialGrade: 'Uncoated cardstock',
        method: 'Through cutting',
        thicknessMm: 0.3,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 60,
          max: 120
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Thickness is more useful than gsm alone. Test small contours for corner burns.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/paper.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E28',
        process: 'engraving',
        materialGrade: 'Paper / cardstock / cardboard',
        method: 'Surface marking / color removal',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 400,
          max: 600
        },
        powerPercent: {
          min: 8,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Engraving may cut through thin paper. Start on thick plain cardstock.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/paper.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Cardstock',
    laserProfiles: []
  },
  {
    id: 'greyboard',
    name: 'Chipboard / greyboard',
    family: 'Paper & board',
    icon: 'book-open',
    surface: 'Plain gray recycled-fiber appearance.',
    edge: 'Dense compressed paper fibers.',
    qualification: '',
    preview: {
      kind: 'fiber',
      colors: {
        face: '#a59e8e',
        edge: '#71685b',
        highlight: '#c9c1b1'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 1,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C43',
        process: 'cutting',
        materialGrade: 'Chipboard / greyboard, plain',
        method: 'Through cutting',
        thicknessMm: 1,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 30,
          max: 60
        },
        powerPercent: {
          min: 25,
          max: 45
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Recycled fibers and glue change cutting behavior.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/paper.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E28',
        process: 'engraving',
        materialGrade: 'Paper / cardstock / cardboard',
        method: 'Surface marking / color removal',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 400,
          max: 600
        },
        powerPercent: {
          min: 8,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Engraving may cut through thin paper. Start on thick plain cardstock.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/paper.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Chipboard / greyboard',
    laserProfiles: []
  },
  {
    id: 'cardboard',
    name: 'Corrugated cardboard',
    family: 'Paper & board',
    icon: 'package',
    surface: 'Flat kraft liner.',
    edge: 'Corrugated flutes between paper liners.',
    qualification: '',
    preview: {
      kind: 'corrugated',
      colors: {
        face: '#be9868',
        edge: '#765637',
        highlight: '#e1bd8b'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C44',
        process: 'cutting',
        materialGrade: 'Corrugated cardboard, uncoated',
        method: 'Through cutting',
        thicknessMm: 3,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 40,
          max: 40
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'No routine refocus',
        notes: 'Cardboard type not identified by source. Heat can persist inside flutes.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'C45',
        process: 'cutting',
        materialGrade: 'Corrugated cardboard, uncoated',
        method: 'Through cutting',
        thicknessMm: 5,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 30,
          max: 30
        },
        powerPercent: {
          min: 90,
          max: 90
        },
        controllerPowerPercent: {
          min: 10,
          max: 90
        },
        passes: 'Not stated; test 1',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'No routine refocus',
        notes: 'Check flutes for smoldering. Avoid making extra passes the default.',
        source: {
          title: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Thunder Nova, DC glass 60 W; cut min/max power 10%/90%; pass count omitted'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E28',
        process: 'engraving',
        materialGrade: 'Paper / cardstock / cardboard',
        method: 'Surface marking / color removal',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 400,
          max: 600
        },
        powerPercent: {
          min: 8,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Engraving may cut through thin paper. Start on thick plain cardstock.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/paper.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, paper compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Corrugated cardboard',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-cardboard-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '7.2',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cardboard-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 5,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-cardboard-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-cardboard-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cardboard-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 4,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-cardboard-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 15,
              max: 15
            },
            controllerPowerPercent: {
              min: 15,
              max: 15
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-cardboard-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cardboard-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 4,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-cardboard-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 12,
              max: 12
            },
            controllerPowerPercent: {
              min: 12,
              max: 12
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-cardboard-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 40,
              max: 40
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cardboard-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Through cutting',
            thicknessMm: 4,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 30,
              max: 30
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-cardboard-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Cardboard — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E28'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 10,
              max: 10
            },
            controllerPowerPercent: {
              min: 10,
              max: 10
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source cardboard construction is unspecified; qualify the exact corrugated board.',
            qualification: 'Source cardboard construction is unspecified; qualify the exact corrugated board.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton / linen',
    family: 'Textiles',
    icon: 'grid-2x2',
    surface: 'Visible warp and weft.',
    edge: 'Thin textile edge with exposed fibers.',
    qualification: '',
    preview: {
      kind: 'weave',
      colors: {
        face: '#e6daca',
        edge: '#af9d87',
        highlight: '#fff5e5'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 0.5,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C46',
        process: 'cutting',
        materialGrade: 'Cotton / linen, uncoated single layer',
        method: 'Through cutting',
        thicknessMm: 0.5,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 80,
          max: 150
        },
        powerPercent: {
          min: 15,
          max: 30
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Natural fibers do not necessarily seal against fraying.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/fabric.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E27',
        process: 'engraving',
        materialGrade: 'Cotton / linen',
        method: 'Surface marking',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 400,
          max: 600
        },
        powerPercent: {
          min: 8,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Color and weave determine the effect. Too much energy perforates fibers.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/fabric.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Cotton / linen',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-cotton-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8.3',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-60-cotton-3',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '9',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-cotton-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E27'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 20,
              max: 20
            },
            controllerPowerPercent: {
              min: 20,
              max: 20
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-cotton-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-80-cotton-3',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-cotton-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E27'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 15,
              max: 15
            },
            controllerPowerPercent: {
              min: 15,
              max: 15
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-cotton-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-100-cotton-3',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-cotton-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E27'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 12,
              max: 12
            },
            controllerPowerPercent: {
              min: 12,
              max: 12
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-cotton-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          },
          {
            id: 'TL-120-cotton-3',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Through cutting',
            thicknessMm: 3,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-cotton-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Cotton Fabric — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E27'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 10,
              max: 10
            },
            controllerPowerPercent: {
              min: 10,
              max: 10
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source says cotton; this reference does not establish a linen recipe.',
            qualification: 'Source says cotton; this reference does not establish a linen recipe.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'denim',
    name: 'Denim',
    family: 'Textiles',
    icon: 'shirt',
    surface: 'Indigo twill with diagonal ridges.',
    edge: 'Contrasting yarns in the textile edge.',
    qualification: '',
    preview: {
      kind: 'denim',
      colors: {
        face: '#345475',
        edge: '#203c55',
        highlight: '#8da6ba'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 1,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C47',
        process: 'cutting',
        materialGrade: 'Denim, known cotton blend',
        method: 'Through cutting',
        thicknessMm: 1,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 60,
          max: 100
        },
        powerPercent: {
          min: 25,
          max: 40
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Identify elastane and coatings. Inspect heat damage at tight corners.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/fabric.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [
      {
        id: 'E26',
        process: 'engraving',
        materialGrade: 'Denim',
        method: 'Dye fading / surface texture',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 400,
          max: 600
        },
        powerPercent: {
          min: 8,
          max: 15
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.15,
        dpi: 169.33333333333334,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Low duty cycles may not fire reliably. Inspect fabric strength after processing.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/fabric.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'Methods available below',
    tileName: 'Denim',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-60-denim-2',
            process: 'cutting',
            laserWatts: 60,
            materialGrade: 'Denim — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 90,
              max: 90
            },
            controllerPowerPercent: {
              min: 10,
              max: 90
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: null,
            sourceAirValue: '8.2',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-60-denim-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Denim — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E26'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 15,
              max: 15
            },
            controllerPowerPercent: {
              min: 15,
              max: 15
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-80-denim-2',
            process: 'cutting',
            laserWatts: 80,
            materialGrade: 'Denim — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 10,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-80-denim-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Denim — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E26'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 10,
              max: 10
            },
            controllerPowerPercent: {
              min: 10,
              max: 10
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-100-denim-2',
            process: 'cutting',
            laserWatts: 100,
            materialGrade: 'Denim — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 10,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-100-denim-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Denim — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E26'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 8,
              max: 8
            },
            controllerPowerPercent: {
              min: 8,
              max: 8
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [
          {
            id: 'TL-120-denim-2',
            process: 'cutting',
            laserWatts: 120,
            materialGrade: 'Denim — supplier sample',
            method: 'Through cutting',
            thicknessMm: 1,
            appliesToRecipeIds: [],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 300,
              max: 300
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 10,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: 2,
            intervalMm: null,
            dpi: null,
            airAssist: 'high (supplier description; pressure unspecified)',
            sourceAirValue: 'high',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ],
        engraving: [
          {
            id: 'TL-120-denim-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Denim — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E26'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 7,
              max: 7
            },
            controllerPowerPercent: {
              min: 7,
              max: 7
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'polyester',
    name: 'Polyester fabric',
    family: 'Textiles',
    icon: 'shirt',
    surface: 'Woven synthetic threads; burgundy shown.',
    edge: 'Thin flexible woven section.',
    qualification: '',
    preview: {
      kind: 'weave',
      colors: {
        face: '#7b4254',
        edge: '#452435',
        highlight: '#ae7787'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 0.5,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C48',
        process: 'cutting',
        materialGrade: 'Polyester fabric, uncoated',
        method: 'Through cutting',
        thicknessMm: 0.5,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 80,
          max: 150
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Cut edges may seal, but excessive heat forms hard beads.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/fabric.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'Polyester fabric',
    laserProfiles: []
  },
  {
    id: 'felt',
    name: 'Wool / polyester felt',
    family: 'Textiles',
    icon: 'cloud',
    surface: 'Random interlocked fibers.',
    edge: 'Soft, fibrous cross-section.',
    qualification: 'Wool and polyester need separate tested presets.',
    preview: {
      kind: 'felt',
      colors: {
        face: '#8c9290',
        edge: '#59615f',
        highlight: '#c1c8c4'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2,
      thicknessBasis: 'Cutting recipe',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [],
    cutting: [
      {
        id: 'C49',
        process: 'cutting',
        materialGrade: 'Wool / polyester felt, identified grade',
        method: 'Through cutting',
        thicknessMm: 2,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 30,
          max: 60
        },
        powerPercent: {
          min: 25,
          max: 40
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: 2,
        intervalMm: null,
        dpi: null,
        airAssist: 'Gentle, dry air',
        betweenPasses: 'None initially',
        notes: 'Save separate wool and polyester presets. Results and odors differ.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2',
          url: 'https://www.thunderlaser.com/material-application/fabric.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, fabric compatibility; example settings use RF CO2'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    engraving: [],
    cuttingAvailability: 'Recipes available below',
    engravingAvailability: 'No engraving recipe supplied',
    tileName: 'Wool / polyester felt',
    laserProfiles: []
  },
  {
    id: 'anodized',
    name: 'Anodized aluminum',
    family: 'Metals',
    icon: 'square-dashed',
    surface: 'Dyed anodized finish; blue shown.',
    edge: 'A silver metal core beneath the finish.',
    qualification: '',
    preview: {
      kind: 'metal',
      colors: {
        face: '#276583',
        edge: '#bbc8cb',
        highlight: '#84acc0'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L22',
        label: 'No routine through cutting',
        severity: 'red',
        appliesTo: 'Any structural thickness',
        reason: 'This 60 W CO2 catalog offers finish marking or bonded marking, not useful bare-metal cutting.',
        nextStep: 'Fiber cutting, CNC, saw or shear.',
        source: {
          title: 'Trotec, anodized aluminum and marking compounds',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-anodized-aluminum'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E17',
        process: 'engraving',
        materialGrade: 'Anodized aluminum, dyed',
        method: 'Anodized-layer marking',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 300,
          max: 400
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 published',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Marks the anodized finish. This is not deep engraving into aluminum.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Finish or bonded marking only.',
    engravingAvailability: 'Methods available below',
    tileName: 'Anodized aluminum',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-60-anodized-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Anodized Aluminum — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E17'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 60,
              max: 60
            },
            controllerPowerPercent: {
              min: 60,
              max: 60
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-80-anodized-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Anodized Aluminum — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E17'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 55,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-100-anodized-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Anodized Aluminum — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E17'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 42,
              max: 42
            },
            controllerPowerPercent: {
              min: 42,
              max: 42
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-120-anodized-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Anodized Aluminum — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E17'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 37,
              max: 37
            },
            controllerPowerPercent: {
              min: 37,
              max: 37
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Qualify the actual material batch.',
            qualification: '',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'coated-metal',
    name: 'Painted / coated metal',
    family: 'Metals',
    icon: 'paintbrush',
    surface: 'Paint or powder-coat finish.',
    edge: 'Metal beneath the coating.',
    qualification: 'Confirm coating composition before processing.',
    preview: {
      kind: 'coated',
      colors: {
        face: '#41494b',
        edge: '#b0bdbf',
        highlight: '#727e80'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L22',
        label: 'No routine through cutting',
        severity: 'red',
        appliesTo: 'Any structural thickness',
        reason: 'This 60 W CO2 catalog offers finish marking or bonded marking, not useful bare-metal cutting.',
        nextStep: 'Fiber cutting, CNC, saw or shear.',
        source: {
          title: 'Trotec, anodized aluminum and marking compounds',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-anodized-aluminum'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E18',
        process: 'engraving',
        materialGrade: 'Painted / powder-coated metal',
        method: 'Coating removal',
        thicknessMm: null,
        evidence: 'Published 60 W',
        speedMmPerSec: {
          min: 250,
          max: 350
        },
        powerPercent: {
          min: 15,
          max: 30
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Source overview range. Verify coating composition before ablation.',
        source: {
          title: 'STYLECNC, material-specific 60 W CO2 engraving tables',
          url: 'https://www.stylecnc.com/blog/laser-engraving-settings-wood-acrylic-leather-metal.html',
          supports: 'STYLECNC, material-specific 60 W CO2 engraving tables'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Finish or bonded marking only.',
    engravingAvailability: 'Methods available below',
    tileName: 'Painted / coated metal',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-60-coated-metal-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Coated Metals — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E18'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 60,
              max: 60
            },
            controllerPowerPercent: {
              min: 60,
              max: 60
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Identify the complete coating before use.',
            qualification: 'Identify the complete coating before use.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-80-coated-metal-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Coated Metals — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E18'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 55,
              max: 55
            },
            controllerPowerPercent: {
              min: 55,
              max: 55
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Identify the complete coating before use.',
            qualification: 'Identify the complete coating before use.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-100-coated-metal-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Coated Metals — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E18'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 42,
              max: 42
            },
            controllerPowerPercent: {
              min: 42,
              max: 42
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Identify the complete coating before use.',
            qualification: 'Identify the complete coating before use.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-120-coated-metal-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Coated Metals — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E18'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 37,
              max: 37
            },
            controllerPowerPercent: {
              min: 37,
              max: 37
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Identify the complete coating before use.',
            qualification: 'Identify the complete coating before use.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'stainless',
    name: 'Stainless + compound',
    family: 'Metals',
    icon: 'spray-can',
    surface: 'Brushed stainless steel substrate.',
    edge: 'Dense silver metal section.',
    qualification: 'Bonded marking with a CO₂-compatible compound. No numeric recipe supplied.',
    preview: {
      kind: 'metal',
      colors: {
        face: '#adb8b9',
        edge: '#697b80',
        highlight: '#f5f5ea'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L22',
        label: 'No routine through cutting',
        severity: 'red',
        appliesTo: 'Any structural thickness',
        reason: 'This 60 W CO2 catalog offers finish marking or bonded marking, not useful bare-metal cutting.',
        nextStep: 'Fiber cutting, CNC, saw or shear.',
        source: {
          title: 'Trotec, anodized aluminum and marking compounds',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-anodized-aluminum'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E29',
        process: 'engraving',
        materialGrade: 'Stainless steel + CO2 marking compound',
        method: 'Bonded surface mark',
        thicknessMm: null,
        evidence: 'Product-specific',
        speedMmPerSec: {
          min: null,
          max: null
        },
        powerPercent: {
          min: null,
          max: null
        },
        controllerPowerPercent: null,
        passes: 'Follow product data',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: null,
        dpi: null,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Use the exact compound supplier recipe and adhesion test. Not metal removal.',
        source: {
          title: 'Trotec, anodized aluminum and marking compounds',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-anodized-aluminum',
          supports: 'Trotec, anodized aluminum and marking compounds'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Finish or bonded marking only.',
    engravingAvailability: 'Methods available below',
    tileName: 'Stainless + marking compound',
    laserProfiles: []
  },
  {
    id: 'brass',
    name: 'Aluminum / brass + compound',
    family: 'Metals',
    icon: 'spray-can',
    surface: 'Metal substrate; brass shown.',
    edge: 'Solid metal beneath a bonded mark.',
    qualification: 'Use a compound that explicitly supports the selected metal and CO₂ wavelength.',
    preview: {
      kind: 'metal',
      colors: {
        face: '#c5a059',
        edge: '#816832',
        highlight: '#f1d89f'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 2,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L22',
        label: 'No routine through cutting',
        severity: 'red',
        appliesTo: 'Any structural thickness',
        reason: 'This 60 W CO2 catalog offers finish marking or bonded marking, not useful bare-metal cutting.',
        nextStep: 'Fiber cutting, CNC, saw or shear.',
        source: {
          title: 'Trotec, anodized aluminum and marking compounds',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-anodized-aluminum'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E30',
        process: 'engraving',
        materialGrade: 'Bare aluminum / brass + compatible compound',
        method: 'Bonded surface mark',
        thicknessMm: null,
        evidence: 'Product-specific',
        speedMmPerSec: {
          min: null,
          max: null
        },
        powerPercent: {
          min: null,
          max: null
        },
        controllerPowerPercent: null,
        passes: 'Follow product data',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: null,
        dpi: null,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'The compound must explicitly support that metal and CO2 wavelength.',
        source: {
          title: 'Trotec, anodized aluminum and marking compounds',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-anodized-aluminum',
          supports: 'Trotec, anodized aluminum and marking compounds'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Finish or bonded marking only.',
    engravingAvailability: 'Methods available below',
    tileName: 'Aluminum / brass + compound',
    laserProfiles: []
  },
  {
    id: 'glass',
    name: 'Soda-lime glass',
    family: 'Glass & stone',
    icon: 'glass-water',
    surface: 'Transparent glass surface.',
    edge: 'Characteristic greenish edge.',
    qualification: 'Plain soda-lime glass supports direct frosted engraving or a dedicated glass-marking coating. The requested MoS₂ powder method is listed separately with unverified 60 W CO₂ settings.',
    preview: {
      kind: 'glass',
      colors: {
        face: '#c9e3d7',
        edge: '#80ac99',
        highlight: '#f0fff7'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L23',
        label: 'Surface work only',
        severity: 'red',
        appliesTo: 'Any bulk thickness',
        reason: 'Surface frosting, ablation or bonded marks are possible. No routine through-cut recipe.',
        nextStep: 'Use an appropriate saw or waterjet.',
        source: {
          title: 'Thunder, stone surface marking and material variation',
          url: 'https://www.thunderlaser.com/material-application/stone.html'
        }
      },
      {
        id: 'L24',
        label: 'Plain glass only',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Fracture risk or unidentified interlayers/coatings. PVB laminates are specifically unsuitable.',
        nextStep: 'Test known plain soda-lime glass first.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E19',
        process: 'engraving',
        materialGrade: 'Plain soda-lime glass',
        method: 'Surface frosting',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 350,
          max: 450
        },
        powerPercent: {
          min: 20,
          max: 30
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Proposed coupon window. Inspect for cracking and loose glass flakes.',
        source: {
          title: 'Assistant-proposed 60 W test. Source glass numbers are for 80 W and are not directly transferable.',
          url: 'https://www.stylecnc.com/blog/laser-engraving-speed-and-power-settings-chart.html',
          supports: 'Assistant-proposed 60 W test. Source glass numbers are for 80 W and are not directly transferable.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'E31',
        process: 'engraving',
        materialGrade: 'Glass / ceramic + dedicated marking product',
        method: 'Bonded surface mark',
        thicknessMm: null,
        evidence: 'Product-specific',
        speedMmPerSec: {
          min: null,
          max: null
        },
        powerPercent: {
          min: null,
          max: null
        },
        controllerPowerPercent: null,
        passes: 'Follow product data',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: null,
        dpi: null,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Use a glass/ceramic-specific formulation. Generic metal spray is not interchangeable. CerMark documents glass/ceramic-specific frit coatings for CO₂ bonded marking. Use the exact product instructions; no universal 60 W settings are established here.',
        source: {
          title: 'Trotec, CO2 surface engraving of glass',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-glass',
          supports: 'Trotec, CO2 surface engraving of glass'
        },
        testedRecipe: null,
        kerfMm: null,
        additionalSources: [
          {
            title: 'CerMark: CO₂ marking on glass and ceramic',
            url: 'https://cermarkusa.com/index.php/correct-application'
          }
        ]
      },
      {
        id: 'E32',
        process: 'engraving',
        materialGrade: 'Plain glass + molybdenum disulfide (MoS₂) powder coating',
        method: 'MoS₂ powder coating · experimental',
        thicknessMm: null,
        evidence: 'Powder method requested · 60 W CO₂ unverified',
        speedMmPerSec: {
          min: null,
          max: null
        },
        powerPercent: {
          min: null,
          max: null
        },
        controllerPowerPercent: null,
        passes: null,
        focusBelowTopMm: null,
        lensInches: null,
        intervalMm: null,
        dpi: null,
        airAssist: null,
        betweenPasses: null,
        notes: 'Powder-based glass coating, as requested. The intended chemical is assumed to be molybdenum disulfide (MoS₂, CAS 1317-33-5); confirm this on the product label. “Bisulphate” is not the same chemical name. Powder particle size, carrier, coating thickness and a repeatable 60 W CO₂ glass-marking recipe have not been verified. Speed, power and pass count remain unspecified. This is surface marking, not glass cutting.',
        source: {
          title: 'Sigma-Aldrich: molybdenum disulfide powder, MoS₂',
          url: 'https://www.sigmaaldrich.com/US/en/product/aldrich/234842',
          supports: 'Chemical identity and powder form only. This supplier page does not establish a glass-marking method or laser settings.'
        },
        testedRecipe: null,
        kerfMm: null,
        warning: 'Confirm MoS₂ on the powder label. Glass-marking parameters are unverified.',
        coating: {
          name: 'Molybdenum disulfide powder',
          formula: 'MoS₂',
          casNumber: '1317-33-5',
          form: 'Powder',
          identityBasis: 'Inferred from the requested moly powder; check the product label',
          carrier: null,
          particleSizeMicrons: null,
          coatingThicknessMicrons: null
        }
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Surface methods are listed under engraving.',
    engravingAvailability: 'Methods available below',
    tileName: 'Soda-lime glass',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-60-glass-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Glass — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E19'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 80,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            qualification: 'Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-80-glass-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Glass — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E19'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 75,
              max: 75
            },
            controllerPowerPercent: {
              min: 75,
              max: 75
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            qualification: 'Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-100-glass-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Glass — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E19'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 58,
              max: 58
            },
            controllerPowerPercent: {
              min: 58,
              max: 58
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            qualification: 'Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-120-glass-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Glass — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E19'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 50,
              max: 50
            },
            controllerPowerPercent: {
              min: 50,
              max: 50
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            qualification: 'Source glass composition is unspecified; restrict to known plain soda-lime glass.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'slate',
    name: 'Slate',
    family: 'Glass & stone',
    icon: 'mountain',
    surface: 'Natural cleft stone texture.',
    edge: 'Thin layered rock structure.',
    qualification: '',
    preview: {
      kind: 'slate',
      colors: {
        face: '#51595b',
        edge: '#2b3538',
        highlight: '#909896'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 6,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L23',
        label: 'Surface work only',
        severity: 'red',
        appliesTo: 'Any bulk thickness',
        reason: 'Surface frosting, ablation or bonded marks are possible. No routine through-cut recipe.',
        nextStep: 'Use an appropriate saw or waterjet.',
        source: {
          title: 'Thunder, stone surface marking and material variation',
          url: 'https://www.thunderlaser.com/material-application/stone.html'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E20',
        process: 'engraving',
        materialGrade: 'Slate',
        method: 'Surface marking',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 300,
          max: 450
        },
        powerPercent: {
          min: 15,
          max: 25
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Light gray mark; composition and finish vary. Thickness does not set engraving depth.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, stone surface marking and material variation',
          url: 'https://www.thunderlaser.com/material-application/stone.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, stone surface marking and material variation'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Surface methods are listed under engraving.',
    engravingAvailability: 'Methods available below',
    tileName: 'Slate',
    laserProfiles: []
  },
  {
    id: 'granite',
    name: 'Dark granite / marble',
    family: 'Glass & stone',
    icon: 'mountain-snow',
    surface: 'Mineral speckles in granite; veins in marble.',
    edge: 'Crystalline stone cross-section.',
    qualification: 'Illustrated textures are representative; use a dark stone coupon to assess contrast.',
    preview: {
      kind: 'granite',
      colors: {
        face: '#494b49',
        edge: '#282f2c',
        highlight: '#ccc6b5'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 10,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [
        'Granite',
        'Marble'
      ],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L23',
        label: 'Surface work only',
        severity: 'red',
        appliesTo: 'Any bulk thickness',
        reason: 'Surface frosting, ablation or bonded marks are possible. No routine through-cut recipe.',
        nextStep: 'Use an appropriate saw or waterjet.',
        source: {
          title: 'Thunder, stone surface marking and material variation',
          url: 'https://www.thunderlaser.com/material-application/stone.html'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E21',
        process: 'engraving',
        materialGrade: 'Dark granite / marble',
        method: 'Surface marking',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 250,
          max: 400
        },
        powerPercent: {
          min: 20,
          max: 35
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Test contrast and chipping. Solid stone is not through-cut by this setup.',
        source: {
          title: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, stone surface marking and material variation',
          url: 'https://www.thunderlaser.com/material-application/stone.html',
          supports: 'Assistant-proposed numbers. Source supports material / nearby recipe: Thunder, stone surface marking and material variation'
        },
        testedRecipe: null,
        kerfMm: null
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Surface methods are listed under engraving.',
    engravingAvailability: 'Methods available below',
    tileName: 'Dark granite / marble',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-60-granite-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Marble — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E21'
            ],
            requiresVariant: 'Marble',
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 80,
              max: 80
            },
            controllerPowerPercent: {
              min: 80,
              max: 80
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Marble reference only. These values are not established for granite.',
            qualification: 'Marble reference only. These values are not established for granite.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-80-granite-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Marble — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E21'
            ],
            requiresVariant: 'Marble',
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 75,
              max: 75
            },
            controllerPowerPercent: {
              min: 75,
              max: 75
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Marble reference only. These values are not established for granite.',
            qualification: 'Marble reference only. These values are not established for granite.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-100-granite-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Marble — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E21'
            ],
            requiresVariant: 'Marble',
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 58,
              max: 58
            },
            controllerPowerPercent: {
              min: 58,
              max: 58
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Marble reference only. These values are not established for granite.',
            qualification: 'Marble reference only. These values are not established for granite.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-120-granite-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Marble — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E21'
            ],
            requiresVariant: 'Marble',
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 50,
              max: 50
            },
            controllerPowerPercent: {
              min: 50,
              max: 50
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Marble reference only. These values are not established for granite.',
            qualification: 'Marble reference only. These values are not established for granite.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'ceramic',
    name: 'Ceramic tile',
    family: 'Glass & stone',
    icon: 'grid-2x2',
    surface: 'Glazed ceramic face.',
    edge: 'Ceramic body beneath the glaze.',
    qualification: 'Identify the glaze. E31 requires a dedicated marking product.',
    preview: {
      kind: 'ceramic',
      colors: {
        face: '#f0eee3',
        edge: '#c6ad8e',
        highlight: '#ffffff'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 8,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L23',
        label: 'Surface work only',
        severity: 'red',
        appliesTo: 'Any bulk thickness',
        reason: 'Surface frosting, ablation or bonded marks are possible. No routine through-cut recipe.',
        nextStep: 'Use an appropriate saw or waterjet.',
        source: {
          title: 'Thunder, stone surface marking and material variation',
          url: 'https://www.thunderlaser.com/material-application/stone.html'
        }
      }
    ],
    cutting: [],
    engraving: [
      {
        id: 'E22',
        process: 'engraving',
        materialGrade: 'Ceramic tile, glaze identified',
        method: 'Surface marking / glaze removal',
        thicknessMm: null,
        evidence: 'Suggested test',
        speedMmPerSec: {
          min: 250,
          max: 400
        },
        powerPercent: {
          min: 20,
          max: 35
        },
        controllerPowerPercent: null,
        passes: '1 to test',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: 0.1,
        dpi: 253.99999999999997,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'A durable dark mark may require a compatible marking product. Avoid unknown old glazes.',
        source: {
          title: 'Assistant-proposed test. Source supports ceramic compatibility, not these numeric settings.',
          url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
          supports: 'Assistant-proposed test. Source supports ceramic compatibility, not these numeric settings.'
        },
        testedRecipe: null,
        kerfMm: null
      },
      {
        id: 'E31',
        process: 'engraving',
        materialGrade: 'Glass / ceramic + dedicated marking product',
        method: 'Bonded surface mark',
        thicknessMm: null,
        evidence: 'Product-specific',
        speedMmPerSec: {
          min: null,
          max: null
        },
        powerPercent: {
          min: null,
          max: null
        },
        controllerPowerPercent: null,
        passes: 'Follow product data',
        focusBelowTopMm: 0,
        lensInches: null,
        intervalMm: null,
        dpi: null,
        airAssist: 'Low air',
        betweenPasses: null,
        notes: 'Use a glass/ceramic-specific formulation. Generic metal spray is not interchangeable. CerMark documents glass/ceramic-specific frit coatings for CO₂ bonded marking. Use the exact product instructions; no universal 60 W settings are established here.',
        source: {
          title: 'Trotec, CO2 surface engraving of glass',
          url: 'https://www.troteclaser.com/en-us/laserable-materials/laser-engraving-glass',
          supports: 'Trotec, CO2 surface engraving of glass'
        },
        testedRecipe: null,
        kerfMm: null,
        additionalSources: [
          {
            title: 'CerMark: CO₂ marking on glass and ceramic',
            url: 'https://cermarkusa.com/index.php/correct-application'
          }
        ]
      }
    ],
    cuttingAvailability: 'No routine 60 W CO₂ through-cut recipe. Surface methods are listed under engraving.',
    engravingAvailability: 'Methods available below',
    tileName: 'Ceramic tile',
    laserProfiles: [
      {
        laserWatts: 60,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-60-ceramic-1',
            process: 'engraving',
            laserWatts: 60,
            materialGrade: 'Ceramic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E22'
            ],
            requiresVariant: null,
            evidence: 'Published 60 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 70,
              max: 70
            },
            controllerPowerPercent: {
              min: 70,
              max: 70
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: null,
            sourceAirValue: '0.1',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            qualification: 'Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            source: {
              title: 'Thunder Nova · DC glass 60 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 80,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-80-ceramic-1',
            process: 'engraving',
            laserWatts: 80,
            materialGrade: 'Ceramic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E22'
            ],
            requiresVariant: null,
            evidence: 'Published 80 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 65,
              max: 65
            },
            controllerPowerPercent: {
              min: 65,
              max: 65
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            qualification: 'Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            source: {
              title: 'Thunder Nova · DC glass 80 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 100,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-100-ceramic-1',
            process: 'engraving',
            laserWatts: 100,
            materialGrade: 'Ceramic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E22'
            ],
            requiresVariant: null,
            evidence: 'Published 100 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 50,
              max: 50
            },
            controllerPowerPercent: {
              min: 50,
              max: 50
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            qualification: 'Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            source: {
              title: 'Thunder Nova · DC glass 100 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      },
      {
        laserWatts: 120,
        laserType: 'CO₂',
        tubeType: 'DC glass',
        machineModel: 'Thunder Nova',
        cutting: [],
        engraving: [
          {
            id: 'TL-120-ceramic-1',
            process: 'engraving',
            laserWatts: 120,
            materialGrade: 'Ceramic — supplier sample',
            method: 'Surface engraving',
            thicknessMm: null,
            appliesToRecipeIds: [
              'E22'
            ],
            requiresVariant: null,
            evidence: 'Published 120 W · incomplete setup',
            speedMmPerSec: {
              min: 1200,
              max: 1200
            },
            powerPercent: {
              min: 45,
              max: 45
            },
            controllerPowerPercent: {
              min: 45,
              max: 45
            },
            passes: null,
            focusBelowTopMm: null,
            lensInches: null,
            intervalMm: 0.08466666666666667,
            dpi: 300,
            airAssist: 'low (supplier description; pressure unspecified)',
            sourceAirValue: 'low',
            betweenPasses: null,
            notes: 'Machine-specific reference. Pass count and focus offset are not supplied. Confirm the permitted tube current and machine speed. Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            qualification: 'Source ceramic/glaze composition is unspecified; qualify the exact tile.',
            source: {
              title: 'Thunder Nova · DC glass 120 W',
              url: 'https://www.thunderlaser.com/laser-settings/co2-laser-machine.html',
              supports: 'Material label, stock thickness, speed, controller min/max power, DPI and lens where stated. Numeric air values have no explicit unit and are not converted to pressure.'
            },
            testedRecipe: null,
            kerfMm: null
          }
        ]
      }
    ]
  },
  {
    id: 'special-glass',
    name: 'Tempered / laminated / leaded glass',
    family: 'Glass & stone',
    icon: 'glass-water',
    surface: 'Glass appearance alone cannot identify tempering, lead content or a laminate interlayer.',
    edge: 'A visible interlayer is illustrative of laminated glass only.',
    qualification: '',
    preview: {
      kind: 'laminated-glass',
      colors: {
        face: '#c9e3d7',
        edge: '#80ac99',
        highlight: '#f0fff7'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 6,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L24',
        label: 'Product qualification required',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Fracture risk or unidentified interlayers/coatings. PVB laminates are specifically unsuitable.',
        nextStep: 'Test known plain soda-lime glass first.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'No through-cut recipe. PVB laminates are excluded.',
    engravingAvailability: 'No generic engraving recipe. Fracture risk and product composition require qualification.',
    tileName: 'Tempered / laminated / leaded glass',
    laserProfiles: []
  },
  {
    id: 'fr4',
    name: 'FR4 / G10 / fiberglass-epoxy PCB sheet',
    family: 'Composites',
    icon: 'circuit-board',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'A layered composite section.',
    qualification: '',
    preview: {
      kind: 'composite',
      colors: {
        face: '#69835b',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 1.6,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L04',
        label: 'Do not laser',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Epoxy composite. FR4 may also include brominated flame retardants.',
        nextStep: 'CNC with suitable dust control.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Do not cut this material',
    engravingAvailability: 'Do not engrave this material',
    tileName: 'FR4 / G10',
    laserProfiles: []
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon-fiber composite / epoxy resin',
    family: 'Composites',
    icon: 'grid-2x2',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'A layered composite section.',
    qualification: '',
    preview: {
      kind: 'carbon',
      colors: {
        face: '#3b4344',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L05',
        label: 'Do not laser',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Hazardous resin decomposition and fiber residues.',
        nextStep: 'Use a suitable mechanical process.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Do not cut this material',
    engravingAvailability: 'Do not engrave this material',
    tileName: 'Carbon fiber / epoxy',
    laserProfiles: []
  },
  {
    id: 'phenolic',
    name: 'Phenolic laminate / Bakelite / phenolic plywood',
    family: 'Composites',
    icon: 'layers',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'A layered composite section.',
    qualification: '',
    preview: {
      kind: 'composite',
      colors: {
        face: '#754c35',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L06',
        label: 'Do not laser',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Phenolic resins are excluded by Trotec material guidance.',
        nextStep: 'Choose a verified laser-compatible board.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Do not cut this material',
    engravingAvailability: 'Do not engrave this material',
    tileName: 'Phenolic laminate',
    laserProfiles: []
  },
  {
    id: 'treated-stock',
    name: 'Flame-retardant / pressure-treated stock',
    family: 'Composites',
    icon: 'shield-alert',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'wood',
      colors: {
        face: '#a69970',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 6,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L16',
        label: 'Identify composition',
        severity: 'red',
        appliesTo: 'Any thickness',
        reason: 'Treatment may add halogens, metal compounds or unsuitable resins.',
        nextStep: 'Get exact composition, not just a generic SDS.',
        source: {
          title: 'Trotec, unsuitable materials',
          url: 'https://www.troteclaser.com/en-us/resources/faqs/unsuitable-materials-laser-processing'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Identify first. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Treated stock',
    laserProfiles: []
  },
  {
    id: 'unknown-coating',
    name: 'Unknown coatings / adhesives / composites',
    family: 'Composites',
    icon: 'paintbrush',
    surface: 'Representative material appearance; chemistry cannot be identified visually.',
    edge: 'Illustrative sheet section.',
    qualification: '',
    preview: {
      kind: 'coated',
      colors: {
        face: '#788b81',
        edge: '#55594d',
        highlight: '#ecebd9'
      },
      footprintMm: [
        60,
        40
      ],
      defaultThicknessMm: 3,
      thicknessBasis: 'Illustrative stock thickness; not a cutting capability',
      variants: [],
      views: [
        'isometric',
        'edge-profile'
      ]
    },
    warnings: [
      {
        id: 'L17',
        label: 'Identify composition',
        severity: 'red',
        appliesTo: 'Every layer',
        reason: 'A safe base sheet does not make its surface films and adhesives laser compatible.',
        nextStep: 'Confirm the complete product construction.',
        source: {
          title: 'Gweike, PVC and unidentified material exclusions',
          url: 'https://www.gweikecloud.com/blogs/news/do-not-laser-pvc-identify-safer-alternatives'
        }
      }
    ],
    cutting: [],
    engraving: [],
    cuttingAvailability: 'Identify first. No verified 60 W cutting recipe supplied.',
    engravingAvailability: 'No qualified engraving recipe supplied',
    tileName: 'Unknown coatings / adhesives',
    laserProfiles: []
  }
]
