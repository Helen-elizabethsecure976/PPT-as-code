# Change Routing

## Goal

Route deck modification requests to the correct upstream artifact before editing implementation files.

## Core Rule

- Do not start with `index.html` when a cleaner upstream artifact exists.
- First classify the user's request.
- Then update the primary artifact.
- Then regenerate only the affected downstream artifacts and refresh HTML.

## Change-Type Routing Table

| Change Type | Typical User Intent | Primary Artifact | Typical Downstream Refresh |
|-------------|---------------------|------------------|----------------------------|
| `structure_change` | reorder slides, split one slide into two, merge slides, add a section, remove a page | `theme_breakdown.md` | `deck_script.md`, `visual_plan.md`, `image_plan.md`, `index.html`, and `deck_manifest.json` when export is enabled |
| `copy_change` | rewrite title, sharpen the wording, shorten text, change tone, replace a paragraph | `deck_script.md` | `visual_plan.md` when the page role changes, then `index.html`, and `deck_manifest.json` when export is enabled |
| `visualization_change` | replace a chart, move a diagram, switch to KPI cards, change chart type | `visual_plan.md` | `index.html`, and `deck_manifest.json` when export is enabled |
| `image_change` | change the hero image, swap a photo, update search keywords, remove imagery | `image_plan.md` | `index.html`, and `deck_manifest.json` when export is enabled |
| `style_change` | change fonts, colors, spacing, progress bar style, border radius, chart label size | `style_system.json` | `index.html`, and refresh any visual outputs that inherit those tokens |
| `export_change` | switch PPTX behavior, adjust raster/native hints, change export target | `deck_manifest.json` | export handoff only, and HTML only if the export behavior depends on visible state |
| `implementation_hotfix` | fix broken CSS, wrong DOM stacking, animation bug, spacing bug that is purely implementation-level | `index.html` | the affected slide or component only |

## Intent Classification Hints

Treat these user phrases as strong routing signals:

- Structure:
  - `split this slide`
  - `merge these pages`
  - `move this earlier`
  - `add a new section`
  - `remove this page`
- Copy:
  - `rewrite this`
  - `make the title sharper`
  - `shorten the text`
  - `change the wording`
  - `tone this down`
- Visualization:
  - `use a chart`
  - `change this to a timeline`
  - `make this a flowchart`
  - `replace the KPI cards`
- Image:
  - `change the image`
  - `swap the photo`
  - `update the image keywords`
  - `remove the picture`
- Style:
  - `make the title larger`
  - `change the colors`
  - `reduce the shadow`
  - `tighten the spacing`
  - `make the chart labels bigger`
- Export:
  - `make PPTX raster`
  - `change export mode`
  - `do not export this slide as native`

## HTML-First Exception Rules

Start from `index.html` only when one of these is true:

- the user explicitly asks for an HTML-only hotfix
- the issue is implementation-specific rather than content- or planning-specific
- no usable upstream artifact exists

## Style Changes

- Global style changes belong in `style_system.json`.
- Slide-specific style exceptions also belong in `style_system.json`, using a `slide_overrides` block.
- Do not scatter font-size, color, spacing, and furniture changes across multiple artifacts unless the change is truly implementation-only.

## Regeneration Rule

After changing the primary artifact:

1. Update only the dependent artifacts that logically flow from it.
2. Regenerate the affected slides in HTML.
3. Refresh `deck_manifest.json` only when export behavior or slide structure changed.
4. Keep unrelated artifacts untouched whenever possible.
