# Rendering Rules

## Only Supported Route

This exporter supports only:

- `raster`

That means:

- each slide is captured from the browser as an image
- each image is placed into PPTX as a full-slide picture

## Capture Rules

Before taking screenshots:

- hide reveal.js controls
- hide progress bars
- hide slide numbers
- hide debug overlays
- freeze motion into one stable export state

## Screenshot Rules

- capture at presentation size
- preserve `16:9` framing unless the manifest explicitly says otherwise
- do not include browser chrome
- do not include scrollbars
- do not allow partial slide crops

## Asset Rules

- all local images must resolve before capture
- do not silently continue when a required asset is missing

## Fallback Rules

- there is no native fallback
- there is no partial-raster fallback
- if a slide cannot be captured correctly, stop and report the blocker clearly

## Reporting Rules

Final reporting should include:

- slide count
- screenshot count
- any missing-asset blockers
- any capture blockers
