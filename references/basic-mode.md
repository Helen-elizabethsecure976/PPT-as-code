# Basic Mode

## Goal

Use `basic` when the user wants a creator-first workflow: confirm the deck breakdown first, then confirm the script, then confirm the image plan, and only then generate static HTML.

## Default Deliverable

Return a staged artifact bundle, not just a final code block:

- brief
- theme breakdown
- style options
- deck script
- visual plan
- image plan
- static HTML
- optional `deck_manifest.json` and PPTX handoff when the user asks for `pptx` or `both`

By default, keep these artifacts in conversation.
Only materialize them as files such as `deck_brief.md`, `theme_breakdown.md`, `style_options.md`, `deck_script.md`, `image_plan.md`, and `index.html` if the user asks for persisted output or the repo clearly supports that workflow.

## Non-Negotiable Sequence

1. Diagnose missing inputs.
2. If the request starts from PDF, DOCX, EPUB, HTML, LaTeX, or web material, normalize that source into markdown before breakdown work begins.
3. If the normalized source is still long-form, derive `source_scene_map.md` before writing the confirmed breakdown.
4. If `deck.md` is provided, compile it into `deck_source.json` and treat it as a draft seed.
5. Recommend 3 to 4 design directions.
6. Prepare the theme-breakdown artifact.
7. Wait for user confirmation of the breakdown.
8. Lock one style direction.
9. Read local writing-style notes when available.
10. Prepare the deck-script artifact.
11. Wait for user confirmation of the script.
12. Prepare `visual_plan.md`.
13. Decide page by page whether the slide is text-led, image-led, chart-led, diagram-led, or card-led.
14. Record engine, placement, chart or diagram type, content source, style constraints, and fallback mode for each visualized slide.
15. Derive exactly 1 to 2 keywords for each image-bearing slide.
16. Search and attempt image downloads when tools are available.
17. If tools are unavailable, provide page-level search strings and image intent instead of pretending search happened.
18. Record failed downloads with source links.
19. Wait for user confirmation of the script, visual plan, and image plan.
20. Run a lightweight pre-HTML QA pass and record it as `qa_report.md` when persistence is enabled.
21. Generate static HTML.
22. If the user wants `pptx` or `both`, prepare the manifest and export hints after the static deck is accepted.

## Blocking Rules

- Do not write the slide script before the theme breakdown is confirmed.
- Do not write `visual_plan.md` before the deck script is confirmed.
- Do not start keyword extraction or image search before the deck script is confirmed.
- Do not generate final static HTML before the script, visual plan, and image plan are all confirmed.
- Each blocking step should follow a real artifact, whether inline or persisted.
- `deck.md` must not bypass the breakdown or script confirmation gates.
- Default to strict step-by-step execution. Do not skip a checkpoint unless the user explicitly says to skip that named checkpoint or to run end-to-end without confirmations.
- A generic "continue" means continue to the next allowed stage, not bypass the next blocking gate.

## Style Pack Requirements

The style-options artifact should include:

- 3 to 4 distinct deck directions
- one recommended direction
- tone and typography notes
- palette and spacing cues
- page-furniture ideas
- arrow / progress treatment suggestions such as:
  - floating
  - transparent
  - large footprint
  - small footprint

## Writing Style Guidance

When local writing-style notes are available, scan likely files such as:

- `voice_profile.md`
- `brand.md`
- `writing_style.md`
- project notes or deck notes

Treat these as optional inputs, not required dependencies.

## Image Plan Requirements

The image-plan artifact should record:

- slide number
- page thesis
- 1 to 2 keywords
- chosen image or source candidate
- download status
- fallback link when the download failed

## Visualization Plan Requirements

`visual_plan.md` should record:

- slide number
- page thesis
- visual role
- chosen engine
- placement
- chart or diagram type
- content source
- style constraints
- fallback mode

## Optional PPTX Handoff

- Do not start PPTX export before the confirmed static HTML pass.
- When PPTX is requested, prepare `deck_manifest.json` from the approved deck script, image plan, and final slide structure.
- Keep simple slides editable when possible and mark dense, highly layered slides as `raster`.

## DSL Consumption Rules

- `deck.md` is input convenience, not final spec.
- `deck_source.json` should seed the brief and breakdown, not replace them.
- Page titles, notes, image hints, and keywords from DSL may speed up planning, but the confirmed artifacts remain authoritative.

## When To Escalate To Advanced

Escalate to `advanced` when the user wants:

- web-searched direction discovery
- explicit reference-image selection when browsing is available
- a structured design system derived from the chosen reference or style direction
- a static-first then motion-follow-up workflow
