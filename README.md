# CO₂ Laser Material Catalog

An interactive catalog of 58 materials with isometric and edge previews, selectable stock thickness, and cutting and engraving instructions.

- Choose a rated CO₂ wattage: 40, 50, 60, 80, 100, or 120 W.
- Matching manufacturer references cover 60, 80, 100, and 120 W where available.
- Optional speed estimates are labeled and disabled by default.
- Restricted materials remain visible with warnings.
- Each recipe includes its evidence and source.

## Files

- `index.html`: the complete standalone application, including material data and icons. Open directly in a browser; no installation or build is required.
- `laser-materials.js`: the same material data as an ES module exporting `materials` and `catalogMeta`, for reuse in other tools. The standalone page embeds its own copy.
- `.nojekyll`: serves the repository as static files on GitHub Pages.

## Publishing

The GitHub Actions workflow in `.github/workflows/pages.yml` publishes the static files when a commit reaches `main`. It can also be run manually from the Actions tab. Pages must be enabled with **GitHub Actions** as the publishing source.

## Using the settings

Manufacturer values are machine-specific references, not verified presets for every machine. Wattage alone does not provide an exact conversion. Unspecified combinations remain blank unless an eligible, explicitly labeled estimate is enabled. Observe the machine's current and motion limits, qualify the material, provide suitable extraction, and test on scrap.

Source references and material-specific limitations are included in the catalog. Grain and layer counts in the previews are illustrative.
