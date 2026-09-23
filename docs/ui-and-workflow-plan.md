# UI and workflow plan

Status: implemented on 23 September 2026, with test-project export labeled beta pending native LightBurn desktop import verification. See [implementation notes](implementation-notes.md) for supported formats and remaining limits.
Recorded: 23 September 2026.
Scope: extend the existing CO₂ material catalog at https://lasercut.localheist.com/.

## Goal and main screen

Keep one main catalog screen with square material tiles, a compact laser selector at the top, and a quicklist above the full catalog. Setup, editing, test recording and export use side panels on desktop and full-screen panels on mobile.

Preserve the existing interaction requirements:

- A continuous material list without pagination.
- Material name, isometric preview and edge profile on each tile.
- Preview thickness follows the selected stock thickness.
- A compact expanded material view with cutting and engraving together.
- Select one cutting thickness at a time instead of showing every thickness in a table.
- Keep conditional materials in the catalog with visible warnings.
- Keep manufacturer references, estimates and user test results distinguishable.

The data relationships are **laser → material/stock → recipe → test history**. A material can have multiple recipes and test results without replacing its earlier history.

## 1. Laser setup

Use a named, reusable laser profile. The initial profile for Leon is “Studio CO₂”, with the known 400 × 400 mm work area and 60 W rated output. These are this user's starting values, not universal machine defaults.

| Field | Starting value or behavior | Control |
| --- | --- | --- |
| Laser name/model | “Studio CO₂”; searchable model templates and a custom option | Autocomplete |
| Laser source | CO₂ glass tube for the initial profile; editable | Dropdown |
| Working width × height | 400 × 400 mm for the initial profile | Numeric inputs with common size presets |
| Rated optical power | 60 W for the initial profile | Common wattages plus a custom value |
| Maximum allowed power | Imported or entered; distinct from rated optical watts | Percentage input |
| Cutting / engraving speed limits | Separate job limits, imported where available | Numeric inputs with units |
| Controller | Detect from a supported import where possible; otherwise unspecified | Searchable dropdown |
| Lens | Suggested 2-inch template value, clearly unconfirmed | 1.5 / 2 / 2.5 / 4 inches or custom |
| Air assist | Manual, switchable or adjustable; establish the actual setup | Dropdown |
| Units | mm and mm/s initially | Dropdown that converts existing values |

### Defaults and input behavior

- Autocomplete is for names and model lookup. Measurements remain directly editable, with preset suggestions rather than restrictive dropdowns.
- Label values by origin: model template, imported or user-confirmed.
- Prefill known values. Keep unknown machine limits visibly unconfirmed rather than inventing limits.
- Changing display units converts values; it must not reinterpret the existing number in another unit.
- Changing the active laser chooses matching recipes and references. Wattage alone must not silently turn a reference or estimate into a tested recipe.
- Keep controller Min/Max power separate from a suggested power test range.
- Provide an “Import LightBurn settings” shortcut. Read supported fields from a controller-settings backup such as `.lbset`, present the imported values for review, and leave unsupported fields unchanged. The catalog does not write settings to the controller.

### Advanced setup

Keep origin corner, motorized Z capability, per-axis motion limits and acceleration, tube-current limit and minimum firing power in a collapsed Advanced section. Separate motion-controller limits from practical cutting and engraving job limits.

References:
- [LightBurn shared cut settings](https://docs.lightburnsoftware.com/2.1/Reference/CutSettingsEditor/SharedSettings/)
- [LightBurn machine settings and .lbset backups](https://docs.lightburnsoftware.com/2.1/Reference/MachineSettings/)

## 2. Material cards and editing

Each material card has a pin action and an overflow menu containing Edit, Duplicate and Archive. Keep the selected stock thickness remembered.

A global **Add material** action opens a short form for:

- Name and material family.
- Composition and grade.
- Supplier and available thicknesses.
- Preview information and relevant material qualifications.
- Recipes and supporting sources, when available.

Duplicating a material copies its structure but does not inherit its tested status. A new grade or supplier batch must not silently inherit another stock's qualification.

Removal normally archives the material, with Undo and Restore available, preserving its test history. Permanent deletion is available from the archive with an explicit description of the records that will be removed.

Editing material descriptions and recording test results are separate actions. A new test should not overwrite the underlying manufacturer reference.

## 3. Recording material tests

Place **Record test** beside each cutting or engraving recipe.

Prefill the active machine, material, thickness, lens and displayed settings. Make it clear when the starting recipe contains a range rather than a known exact setting.

Capture:

| Information | Behavior |
| --- | --- |
| Machine and setup | Associate the result with the selected laser and preserve the setup used |
| Material and stock | Material, grade and thickness; supplier/batch optional |
| Operation | Cutting or engraving |
| Settings used | Exact speed, controller power, passes and relevant focus/air settings |
| Engraving settings | Line interval and other applicable settings |
| Test date | Default to today, editable for earlier tests |
| Cutting outcome | Cut through, partial cut or failed |
| Engraving outcome | Quality/result assessment |
| Optional observations | Photos, measured kerf, edge quality and actual sheet thickness |

After saving, offer **Use as preferred recipe**. Failed tests remain useful history and should be retained.

“Tested” is scoped to the machine, stock and setup used. Changing a laser profile later must not rewrite the historical setup or make its old results appear to qualify a different machine.

Allow a partial observation to be saved when exact settings are unknown, but distinguish it from a complete tested preset. Never invent an exact setting to fill a missing test measurement.

### Existing MDF results to preserve

| Material | Existing recipe | User-reported result | Test date | Recorded limitation |
| --- | --- | --- | --- | --- |
| MDF, 3 mm | C02 | Through-cut in one pass using the listed settings | 22 September 2026 | Exact speed/power pair was not supplied |
| MDF, 4 mm | C03 | Through-cut in one pass using the listed settings | 22 September 2026 | Exact speed/power pair was not supplied |

Keep those reported results and their date. Do not promote an arbitrarily chosen point in either range into a separately verified exact preset.

## 4. Quicklist

Pin a particular recipe and setup, for example **MDF · 4 mm · Cut · Studio CO₂**.

- Opening a quicklist item restores its material, thickness, operation and laser context.
- Show a compact pinned area above the full catalog.
- Provide a **Quicklist only** filter without introducing a separate catalog page.
- Unpinning removes the shortcut, not the material or its tests.
- Distinguish pin controls from export-selection checkboxes.
- Handle archived or removed recipes visibly rather than silently redirecting a pin to another setting.

## 5. Test-file generation

Place **Generate test** beside Record test.

Start with three test types:

1. Cutting speed/power grid.
2. Engraving grid.
3. Kerf/fit test.

### Proposed workflow

1. Select the laser, material, stock thickness and operation.
2. Choose a test type.
3. Start with a compact 3 × 3 grid for cutting or engraving, seeded from the selected recipe where suitable.
4. Edit the parameter ranges, steps, pass count and applicable setup.
5. Enter the actual scrap dimensions and preview the pattern footprint, margins and engraving overscan.
6. Review any missing setup or exceeded machine limits.
7. Download the test project.
8. After running the test, select the successful cell in the catalog and save its outcome.

Selecting a grid cell should prefill its exact settings in a test record. The user still records the physical result and date; generating or downloading a file is not evidence of a successful test.

### File targets

- An editable LightBurn `.lbrn2` project with the intended geometry and settings attached.
- An optional SVG for geometry, clearly distinguished from a project carrying laser settings.
- Consistent labels identifying cells and their settings, plus the common setup used for the test.

Check generated projects in LightBurn before treating this feature as complete. Keep automatic Z motion dependent on a confirmed machine capability and an explicit test configuration.

LightBurn's own Material Test supports varying speed, power, passes and interval and is a useful interaction reference:
[LightBurn Material Test](https://docs.lightburnsoftware.com/2.1/Reference/MaterialTest/).

## 6. Selectable LightBurn material-library export

Open an export panel containing material groups with expandable thickness/operation recipes.

### Selection controls

- **Select all eligible**: select every exportable recipe in the current laser context.
- **Deselect all**: clear the entire selection, including selections hidden by a filter.
- **Select filtered results**: select only the currently matching recipes.
- Material-level checkboxes select their eligible child recipes.
- Parent checkboxes show an intermediate state when only some children are selected.
- Filtering must not silently discard selections.

Provide filters for **Quicklist**, **Tested on this laser**, **Cutting** and **Engraving**. Show the selected material and recipe counts, including when selected entries are outside the current filter.

### Export behavior

- Display which laser profile the export targets.
- Flag incomplete entries and explain why they cannot become runnable presets.
- For a range, show the chosen single export value and the fact that it is a starting point.
- Do not interpret a power range as controller Min/Max.
- Do not label a converted starting point as a tested exact preset.
- Preserve dates, setup notes, material qualifications and relevant warnings.
- Keep cutting thicknesses and surface-engraving entries distinct in the exported library.
- Require at least one eligible selected entry before enabling the download.
- Keep conditional materials such as Delrin available with their warnings where an exportable recipe exists.
- Do not fabricate numeric recipes for unsupported or unverified methods, including the MoS₂ powder method.

Reference:
[LightBurn Material Library](https://docs.lightburnsoftware.com/2.1/Reference/MaterialLibrary/).

## 7. Personal state and shared catalog updates

Keep personal laser profiles, quicklist pins and draft tests separate from the shared reference catalog.

- Save personal changes immediately.
- Make local-only versus synchronized state understandable.
- Provide data backup and restore so a browser reset does not leave the user without a recovery path.
- Provide an owner-only **Publish catalog updates** action for shared changes.
- Preserve the distinction between published references and user observations when publishing tests.
- Support authenticated storage for cross-device synchronization alongside the existing static site.

The storage provider and authentication approach remain implementation decisions. GitHub Pages can continue to host the frontend; it is a static hosting service, not the shared-write backend.

Reference:
[GitHub Pages hosting model](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## Suggested delivery order

- [x] Prototype the laser setup panel and Record test flow first.
- [x] Establish the profile, recipe and test-history data relationships and persistence behavior.
- [x] Add material creation/editing, archive/restore and quicklist behavior.
- [x] Add selectable LightBurn library export with counts, filters and explicit range conversion.
- [x] Add test-project generation and the grid-cell-to-test-record workflow (beta export).
- [x] Add optional authenticated GitHub synchronization through a private repository and owner-only shared publishing.
- [ ] Verify generated `.lbrn2` projects in the native LightBurn desktop application.

## Completion checks

- Setup and daily actions work on desktop and mobile with labeled, keyboard-accessible controls.
- The main material view remains compact, with cutting and engraving together.
- Unit changes convert values correctly; unconfirmed defaults remain distinguishable from confirmed limits.
- The two existing MDF reports retain their date, single-pass result and missing exact-setting information.
- Tests remain tied to their original machine and setup.
- Quicklist actions do not change export selections or delete catalog data.
- Archive/restore preserves history.
- Select-all, deselect-all, filtered selection and partial parent states behave consistently.
- Missing settings stay missing rather than becoming zero-valued or fabricated presets.
- Exported libraries and generated test projects are checked for correct units, settings, geometry and LightBurn compatibility.
