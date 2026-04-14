# Workbench v1

This folder contains a runnable visual editor prototype for `ppt-as-code`.

## What It Is

`Workbench v1` is a browser-based canvas editor that works on top of `deck_model.json`, and can round-trip through controlled HTML exports from `ppt-as-code`.

Current goals:

- make page layout edits fast
- expose PPT-like formatting controls instead of raw CSS thinking
- preserve sync intent with `synced`, `needs_review`, and `html_only_override`

This is an authoring prototype, not a full production editor.

## What You Can Do

- switch between `Deck Mode` and `HTML Mode`
- switch slides
- add and delete slides
- add `text`, `bullets`, `quote`, `stat`, `card`, `image`, `shape`, `container`, `chart`, and `diagram`
- drag and resize elements on a 16:9 canvas with snapping guides
- bring element forward / send backward by layer
- duplicate, copy, paste, delete, and nudge elements with keyboard shortcuts
- edit deck style tokens: title, bg, fg, accent, muted, body font, display font
- edit PPT-like element properties in inspector:
  - text, list lines, image URL
  - geometry
  - font size, weight, align, line height, letter spacing
  - paragraph spacing and padding
  - fill, border, radius, card appearance, shape variant, image fit
  - sync status
- import a `deck_model.json`
- import compatible HTML exported from the workbench or `ppt-as-code`
- open an existing HTML deck in `HTML Mode` and edit text/image nodes directly on the rendered page
- export current state as `deck_model.json`
- export a controlled `index.html` with stable `data-*` markers and embedded model JSON
- save modified source HTML back out from `HTML Mode`
- export projected upstream artifacts from current model:
  - `deck_brief.md`
  - `theme_breakdown.md`
  - `deck_script.md`
  - `visual_plan.md`
  - `image_plan.md`
  - `qa_report.md`
  - `style_system.json`
  - `deck_manifest.json`

## Quick Start

1. Open [index.html](/D:/workspace/obsidian_codex_x_test_vault/99_System/Public_Skills/ppt-as-code-open/workbench/index.html) in a browser.
2. Click `Import Model` and load [deck_model.sample.json](/D:/workspace/obsidian_codex_x_test_vault/99_System/Public_Skills/ppt-as-code-open/workbench/deck_model.sample.json), or start from the built-in demo deck.
3. Edit slides on canvas and in inspector.
4. Use keyboard shortcuts like `Delete`, `Cmd/Ctrl+D`, `Cmd/Ctrl+C`, `Cmd/Ctrl+V`, and arrow keys while editing.
5. Click `Export Model`, `Export HTML`, or `Export Artifacts` depending on the next step you want.

## Current Limits

- no multi-select yet
- no group/ungroup yet
- no true auto-layout constraints yet
- `HTML Mode` is v1: it focuses on direct text/image/style edits, not full freeform DOM editing
- artifact projection currently exports files as downloads, not direct in-repo writes
- no PPTX export button inside the editor yet (manifest export is ready for downstream handoff)

## Next Milestone

The next step is wiring a sync projection pipeline:

- imported or edited `deck_model.json` -> artifacts -> regenerated project `index.html`
- optional writeback mode for repository paths (instead of browser downloads)
- optional `deck_manifest.json` refresh for PPTX handoff
