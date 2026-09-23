# CO₂ Laser Material Catalog

[Open the catalog](https://lasercut.localheist.com/)

A continuous library of 58 reference materials, with individual vector grain and edge previews, one selected cutting thickness, and cutting and engraving together in a compact expanded card.

## Workspace

- **Laser setup:** named profiles, custom dimensions and wattages, source and controller, separate cutting/engraving speed limits, maximum allowed command percentage, lens, air assist and advanced motion fields. Studio CO₂ now includes the supplied calibrated Ruida setup: 400 × 400 mm, 60 W glass tube, X/Y motion limits of 500/400 mm/s, engraving acceleration of 8000/2000 mm/s², and step lengths of 3.178801/3.182771 µm. The controller record keeps its 1–99% firmware power range separate from safe operating power. Practical job limits, tube-current limit and firing threshold remain unconfirmed; the suggested 2″ lens is also unconfirmed.
- **Units and imports:** switch mm/s ↔ mm/min without reinterpreting stored speeds. Import supported Ruida or GRBL JSON `.lbset` dimensions and motion fields for review. Ruida imports also record calibrated X/Y step lengths, firmware power configuration, PWM frequency and output/protection switches. Nothing is written to a controller.
- **Materials:** add, edit, duplicate, archive/undo, restore, and permanently remove personal material records. Copies do not inherit tested status. Source recipes and warnings are preserved.
- **Test history:** exact controller Min/Max power, speed, passes, date, focus, lens, air, interval, outcome, stock measurements and optional photo. Partial observations and failed tests remain in history. Successful complete tests can become preferred recipes for the same laser and stock setup.
- **Quicklist:** pin a particular recipe, thickness, variant and laser; filter the catalog to pinned materials. Changed or unavailable contexts are shown explicitly.
- **LightBurn library:** select all eligible, deselect all, or select filtered recipes. Material checkboxes show partial selection; hidden selections remain selected. Review the single values chosen from reference ranges before downloading `.clb` and setup notes. Range-derived starting speeds respect recorded motion limits when the range contains an eligible value; exact measured tests are never altered. Surface folders have names such as Engraving or Glass frosting.
- **Single-preset downloads:** every material’s selected thickness and engraving method has a `.clb` download button. It includes only the selected recipe and stock variant, using the same category-prefixed material names as the combined library. Choose **Manage Library → Merge Library With** in LightBurn to add it to your existing library. Incomplete or out-of-limit settings show a reason instead of downloading a substitute recipe.
- **Test projects:** cutting and engraving grids, plus fit coupons. Preview the footprint against scrap size, margins, motion allowance and recorded machine limits. Download an editable `.lbrn2` project or SVG geometry, then reopen a downloaded grid to record a cell’s physical result.

The existing **3 mm and 4 mm MDF reports remain dated 22 September 2026, through-cut in one pass**. Their exact speed/power pair was not recorded; the app does not treat an arbitrary point in the listed ranges as a verified exact preset.

## Saving and sharing

Personal changes save in this browser. Existing default Studio profiles receive the recorded machine settings on reload while retaining custom job limits and historical snapshots. Profiles with conflicting machine values are preserved; select the Studio model/template in Laser setup to apply the recorded setup deliberately. **Backup, restore & sync** provides a JSON backup, restore review and optional GitHub connection. Back up before clearing browser data. Photos are limited to 600 KB each; storage errors are visible and leave the working copy available for download.

To sync across devices, create a **private GitHub repository**, then connect in the app with a fine-grained token granting Contents read/write for that repository. Load remote status before choosing upload or restore. Tokens remain in memory and are excluded from persistence and backups. Sync excludes photos; full JSON backups include them. Remote SHA checks reject concurrent changes rather than overwrite them.

The repository owner can review and publish material edits, new materials, archive changes and individually selected test reports to `catalog-overrides.json`. This is public information, including Git history. Personal profiles, pins and photos are not included in the publication payload; a selected test includes the machine/stock snapshot and notes needed to interpret it. The owner’s browser checks the connected identity, and GitHub independently enforces repository permissions.

## LightBurn compatibility

Load `.clb` files from LightBurn’s Material Library. Exported speeds are always **mm/s**, regardless of display units. Controller Min/Max are separate from a suggested power range; without reported controller values, equal Min/Max is an explicitly provisional starting choice. Unsupported or incomplete recipes, including the unverified MoS₂ powder recipe, remain unavailable for export. Conditional Delrin recipes retain their extraction/formaldehyde warnings.

**Test-project export is beta.** Generated XML is structurally checked against native LightBurn examples, with per-cell layer settings, millimeter geometry, labels on a non-output layer and no automatic Z movement. It has **not yet been opened in the native LightBurn desktop application**. Open `.lbrn2` in LightBurn, check layers and Preview, verify controller overscan/origin, and frame on scrap before running. SVG carries geometry only; its separate label group also requires deliberate layer assignment.

## Development

Node.js 20 or newer; no npm dependencies or install step.

```sh
npm run build   # regenerate index.html from editable sources
npm test        # provenance, unit, backup, sync, geometry and export checks
npm run check   # tests plus verification that committed HTML is current
```

- `laser-materials.js`: reusable source data as an array of objects; exports `materials` and `catalogMeta`.
- `src/`: UI, domain logic, procedural previews, exports, sync and the existing bundled icons/analytics.
- `scripts/build.mjs`: builds the complete standalone `index.html`. It can still be opened directly without a server. Shared catalog updates load when served over HTTP(S).
- `catalog-overrides.json`: reviewed shared edits, separate from underlying reference data.
- `docs/ui-and-workflow-plan.md`: original product scope and implementation status.
- `docs/implementation-notes.md`: storage schema, matching rules and format references.

GitHub Actions checks the source/build and publishes the static files to the existing Pages custom domain whenever `main` changes. The existing Matomo analytics configuration is preserved.
