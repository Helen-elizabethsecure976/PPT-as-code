# Workbench Sync

## Goal

Define how visual workbench edits should flow back into the artifact system without creating competing sources of truth.

## Core Sync Rule

Use this direction:

`Canvas edit -> deck_model.json -> artifact projection -> HTML refresh -> export refresh if needed`

Do not use:

`Canvas edit -> direct HTML patch -> maybe artifact patch later`

## Primary Projection Rules

- structure change
  - primary target: `theme_breakdown.md`
  - secondary refresh: `deck_script.md`, `visual_plan.md`, `image_plan.md`
- copy change
  - primary target: `deck_script.md`
  - secondary refresh: layout fit and affected HTML
- visualization change
  - primary target: `visual_plan.md`
  - secondary refresh: HTML and export hints
- image change
  - primary target: `image_plan.md`
  - secondary refresh: asset references and HTML
- style change
  - primary target: `style_system.json`
  - local exception path: `slide_overrides`
- export change
  - primary target: `deck_manifest.json`

## Sync Priority

When visual freedom and clean artifact projection conflict:

- prefer sync integrity
- do not silently invent extra truth layers

## Allowed Outcomes For Hard Cases

When an edit cannot be projected cleanly:

- `synced`
  - the edit is fully reflected in the correct artifact layer
- `needs_review`
  - the system has a plausible projection, but a human should confirm it
- `html_only_override`
  - the edit is preserved for rendering, but does not cleanly map back into the artifact system

## HTML Rule

- `index.html` is a downstream render target.
- It is not the first editing source in workbench mode.
- Only implementation-specific fixes should start from HTML.

## PPTX Rule

- `deck_manifest.json` remains a delivery artifact.
- Refresh it only when:
  - slide structure changed
  - export hints changed
  - rendered export state changed in a meaningful way
