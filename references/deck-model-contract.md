# Deck Model Contract

## Goal

Provide one unified editing source for a future visual workbench so the canvas, artifacts, HTML, and export flow do not drift apart.

## Primary Artifact

- Use `deck_model.json` as the unified workbench editing source.
- The workbench writes to `deck_model.json` first.
- Upstream artifacts and rendered HTML are projected from this model.

## Minimal Top-Level Shape

```json
{
  "deck": {
    "title": "Deck Title",
    "mode": "basic",
    "export_target": "html",
    "slide_size": "16:9"
  },
  "slides": [],
  "sync_status": "synced"
}
```

## Slide Shape

Each slide should support at least:

- `id`
- `role`
- `z_order`
- `elements`
- `style_refs`
- `content_refs`
- `sync_status`

Example:

```json
{
  "id": "slide_3",
  "role": "compare",
  "z_order": 3,
  "elements": [],
  "style_refs": {
    "global": true,
    "slide_override_key": "slide_3"
  },
  "content_refs": {
    "theme_breakdown": "slide_3",
    "deck_script": "slide_3",
    "visual_plan": "slide_3",
    "image_plan": "slide_3"
  },
  "sync_status": "synced"
}
```

## Element Types

V1 should only support these element types:

- `text`
- `image`
- `chart`
- `diagram`
- `card`
- `shape`
- `container`

## Element Fields

Each element should support at least:

- `id`
- `type`
- `geometry`
- `layer`
- `content_ref`
- `style_ref`
- `sync_status`

Geometry should include:

- `x`
- `y`
- `w`
- `h`
- `rotation`

## Sync Status Values

Allowed values:

- `synced`
- `needs_review`
- `html_only_override`

## Contract Rules

- `deck_model.json` is not a replacement for `theme_breakdown.md`, `deck_script.md`, `visual_plan.md`, `image_plan.md`, `style_system.json`, or `deck_manifest.json`.
- It is the bridge between the workbench UI and those artifact layers.
- Free-canvas edits should update the model first, then be projected into artifact space.
- If projection is ambiguous, the model must not silently claim the edit is fully synced.
