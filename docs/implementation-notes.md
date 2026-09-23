# Implementation notes

## Data and provenance

The reference array in `laser-materials.js` stays unchanged. Shared `catalog-overrides.json` and personal edits are layered over it. Per-material edits do not replace manufacturer recipe arrays. Custom duplicates receive a new material ID, retain the copied reference provenance as untested, and do not inherit a test report or preferred recipe.

Personal state uses `co2-material-workspace-v1` in localStorage, with schema version 1. It contains profiles, active profile ID, custom materials, material edits, archive/deletion markers, selected stock contexts, tests, preferred recipe IDs, quicklist pins and the last 30 generated test configurations. All speeds are stored in mm/s and dimensions in mm. Unknown measurements are null, never substituted with zero. A zero focus offset, measured kerf or controller Min is an intentional value.

Test records include a profile snapshot and material/stock identity. A successful exact recipe requires speed, controller Min/Max, integer passes, nominal thickness, focus, lens, air and engraving interval where applicable. Preference is limited to a matching laser identity, source, watts, physical/setup fields, lens and stock composition/grade/supplier/variant. Editing the current profile never mutates historical snapshots. Failures and incomplete observations stay in history.

Quicklist pins include the recipe snapshot and profile signature. They report changed/archived/missing contexts instead of silently choosing a different recipe. Unpinning does not affect export selections or tests. Permanent deletion is scoped to personal records; bundled/shared source content is not deleted from the repository.

## Persistence and remote writes

JSON restore validates versions, required collections, profile and material fields, test records, image MIME types, duplicate IDs and unsafe object keys before replacing the workspace. Original unreadable local data is retained for recovery. A storage quota failure is visible and preserves the working copy in memory for a backup. Cross-tab revisions are checked before writes.

Optional browser GitHub access uses the REST Contents API. The token is held in a private object field and is never stored in localStorage or a backup. Every personal upload checks repository privacy and write permission. The current file SHA is compared before a PUT, and GitHub checks the supplied SHA again to close the race window. Remote conflict errors require a new read/review. Personal sync omits photos and limits payloads to 900 KB to retain Contents API read compatibility; JSON backups include photos and permit 15 MB.

Shared publishing is offered only to the connected repository owner and also requires server-enforced write permission. The user reviews public material changes and individually opts test reports into publishing. Test photos are removed. The app never runs firmware commands, operates a laser, or automatically publishes local data.

## Machine import

Supported `.lbset` input is LightBurn JSON with `Name` and a `Settings` array of `ID`, `Desc`, `Value` rows. Mapping is controller-specific, not based on ambiguous duplicated labels.

| Field | Ruida ID | GRBL ID |
| --- | --- | --- |
| Work width / height | `0x26` / `0x36` | `0x82` / `0x83` |
| X / Y calibrated step length (µm) | `0x21` / `0x31` | — |
| X / Y maximum motion speed | `0x23` / `0x33` | `0x6e` / `0x6f` |
| X / Y engraving acceleration (Ruida); axis acceleration (GRBL) | `0x225` / `0x235` | `0x78` / `0x79` |

GRBL speed values are divided by 60 (mm/min → mm/s). Rated optical watts, practical job limits, command percentage limits, tube current, lens, origin and Z capability are not inferred from firmware backup fields. Unsupported controllers or malformed formats leave the profile unchanged. Imported fields are presented in the setup form for review before Save.

## Export details and limits

Library recipe IDs are compound material/operation/recipe/variant keys because some source IDs are shared across materials. Surface engraving uses native `Thickness="-1.0000"` plus `NoThickTitle` and matching title-based link paths. Titles are Engraving, Glass frosting, Coating removal or Surface marking. A reference power range is not interpreted as controller Min/Max. Incomplete references cannot become presets merely by selecting them. The two MDF reports retain their date and one-pass result but remain starting points when converted into a specific numeric pair.

Test grids support up to 5 × 5 cells, with one layer per cell, starting at highest speed/lowest power. Labels use layer 29, laser disabled and Output OFF. Shape coordinates are in millimeters; Y is converted from screen coordinates to LightBurn's Y-up geometry. Fit coupons include an inside slot (stock thickness plus allowance) and a mating tab coupon, with no kerf compensation. Focus is documented but Z motion stays disabled.

Footprint checks include outside margins, label spacing and engraving travel allowance. If the profile has confirmed/imported X acceleration, the reservation also includes `speed² / (2 × acceleration)` where that exceeds the explicit allowance. Controller behavior, actual optic output, min-power corner response, speed attainment on small cells, and native import must still be checked on the user's machine.

Automated checks cover unit conversions, MDF evidence, snapshot matching, duplicate/delete behavior, backup validation, export selection state, XML fields, grid fit and machine limits, import mapping, private-repo requirements and write conflicts. Native LightBurn desktop import remains an outstanding manual compatibility check; project export is labeled beta in the UI.

## Primary format references

- [LightBurn material library](https://docs.lightburnsoftware.com/2.1/Reference/MaterialLibrary/)
- [LightBurn material test](https://docs.lightburnsoftware.com/2.1/Reference/MaterialTest/)
- [LightBurn machine settings](https://docs.lightburnsoftware.com/2.1/Reference/MachineSettings/)
- [Native Ruida backup example, Binary Kitchen](https://github.com/Binary-Kitchen/thunderlaser_nova35)
- [Native LightBurn rectangle and text samples](https://github.com/jlucaso1/lbrn2-to-svg/tree/main/tests/artifacts)
- [Native layer-setting example](https://github.com/MarcinZukowski/lightburn-tester/blob/master/examples/example1.lbrn)
- [GitHub Contents API and conditional SHA updates](https://docs.github.com/en/rest/repos/contents)

## Recorded Studio machine update

`src/studio-profile.js` holds values derived from the user-supplied
`tests/fixtures/laser-axis-calibrated.lbset`. The fixture is the unchanged backup,
retained for parser regression checks; no machine parameters are written to hardware.
Its SHA-256 is recorded with the profile. Rated 60 W comes from the established
setup, since the backup does not specify optical wattage.

X/Y limits are 500/400 mm/s. Horizontal engraving uses the X limit; cutting
checks both axes. Engraving acceleration is 8000/2000 mm/s², distinct from
the firmware's 10000/3000 mm/s² axis maxima and 2000 mm/s² cutting acceleration.
Calibrated step lengths are 3.178801 and 3.182771 µm.

Ruida Laser 1 firmware Min/Max is 1/99%, PWM is 20000 Hz, and Start Speed
is 10 mm/s. These do not establish safe tube current, a firing threshold or
per-layer Min/Max. Air-assist output is enabled; actual airflow/pressure is
unknown. Water and door protection switches are disabled in the backup, which
does not establish the presence or absence of independent hardware interlocks.
Z/U parameter blocks do not prove that those axes are physically installed.

Legacy Studio profiles are upgraded only when their machine identity and
recorded fields are compatible. Custom command limits and all test snapshots,
photos, pins and material edits are retained. Conflicting profiles are left
unchanged. The existing Studio template can explicitly apply the recorded setup.
New custom profiles use unconfirmed template defaults, without Studio calibration.

Six downloadable-library surface presets (E26, E27 and four E28 entries) formerly
selected 600 mm/s from 400–600 mm/s reference ranges. Their new starting speed is
500 mm/s with existing power, interval and pass count. The UI applies the same
within-range rule and labels the adjustment. These are untested starting points;
reference ranges and exact measured recipes are never modified. If no value in
a reference range satisfies a recorded speed limit, the export remains blocked
until the user supplies an appropriate setting.
