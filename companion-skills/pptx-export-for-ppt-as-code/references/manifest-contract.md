# Manifest Contract

## Required Inputs

The handoff bundle should contain:

- `index.html`
- `deck_manifest.json`
- `assets/` when image files are local

## Top-Level Manifest Fields

- `deckTitle`
- `slideSize`
- `themeTokens`
- `slides`

## Required Per-Slide Fields

- `id`
- `title`
- `exportModeHint`

## Allowed Export Hints

- `raster`

## Validation Rules

- Reject export if `slides` is missing or empty.
- Reject export if slide objects are missing `id`.
- Reject export if any slide uses an export hint other than `raster`.
- Default `slideSize` to `16:9` if omitted.

## Intent

The manifest is a lightweight export bridge, not a native layout contract.

Its job is to help the exporter:

- confirm slide order
- confirm slide count
- confirm target size
- confirm that the export route is screenshot-only
