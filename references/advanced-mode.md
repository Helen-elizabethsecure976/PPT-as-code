# Advanced Mode

## Goal

Use `advanced` when the deck should be reference-driven, visually locked before implementation, delivered static first, and optionally upgraded with motion only after approval.

## Default Deliverable

Return a staged build with these artifacts:

- brief
- style options
- chosen reference set or style-direction fallback
- structured design constraints
- deck script
- visual plan
- image plan
- static HTML
- optional `deck_manifest.json` and PPTX handoff when the user asks for `pptx` or `both`
- optional motion pass after approval

By default, keep these artifacts in conversation.
Only materialize them as files if the user asks for persisted output or the repo clearly supports that workflow.

## Non-Negotiable Sequence

1. Diagnose gaps and define the brief.
2. If the request starts from PDF, DOCX, EPUB, HTML, LaTeX, or web material, normalize that source into markdown before direction and script work begins.
3. If the normalized source is still long-form, derive `source_scene_map.md` before direction lock and final scripting.
4. If `deck.md` is provided, compile it into `deck_source.json` and treat it as a draft seed.
5. Recommend 3 to 4 design directions.
6. Wait for the user to choose one direction.
7. If browsing is available, read `reference-search-pack.md` and search from the curated source set for 3 real PPT or slide-design references.
8. If browsing is unavailable, skip web reference search and derive the visual lock directly from the chosen style direction plus any user-provided inspiration.
9. Convert the chosen reference or the fallback direction into structured design constraints.
10. Read local writing-style notes when available.
11. Prepare the deck-script artifact.
12. Wait for the user to confirm the script.
13. Prepare `visual_plan.md`.
14. Decide page by page whether the slide is text-led, image-led, chart-led, diagram-led, or card-led.
15. Record engine, placement, chart or diagram type, content source, style constraints, and fallback mode for each visualized slide.
16. Derive exactly 3 to 4 keywords for each image-bearing slide.
17. Search and attempt image downloads when tools are available.
18. If tools are unavailable, provide page-level search strings and image intent instead of pretending search happened.
19. Record failed downloads with source links.
20. Wait for the user to confirm the script, visual plan, and image plan.
21. Run a lightweight pre-HTML QA pass and record it as `qa_report.md` when persistence is enabled.
22. Generate static HTML.
23. If the user wants `pptx` or `both`, prepare the manifest and export hints after the static deck is approved.
24. Ask whether to add motion.
25. Only after approval, add motion as a second pass.

## Hard Rules

- Do not lock the final visual direction before the reference-choice step when browsing is available.
- Do not add motion before the static deck is reviewed.
- Do not let animation rewrite or distort the approved script.
- Keep direct-handoff decks self-contained when possible.
- Default to strict step-by-step execution. Do not skip a checkpoint unless the user explicitly names that override or explicitly asks to run end-to-end without confirmations.
- A generic "continue" means proceed to the next allowed stage, not bypass the next blocking gate.

## Copy And Density Constraints

- Do not add any sentence that is not directly serving the page thesis.
- Do not use generic PPT meta language such as `Overview`, `Background`, `Takeaway`, `Summary`, `Page 01`, or similar labels unless they are structurally necessary.
- Prefer one strong statement plus minimal support copy.
- Do not use small text as a compression trick. If the page only works with dense tiny type, split the content into more slides.
- Avoid tiny captions and footnotes unless they are required for sources, numbers, or compliance.
- If a page is image-led, chart-led, diagram-led, or card-led, keep the text even lighter and let the main visual carry the page.

## Reference-Driven Design Rules

The chosen reference, or the chosen style direction in fallback mode, must be translated into structured constraints before HTML work begins.

That structured layer should cover:

- typography roles
- color and contrast logic
- spacing rhythm
- layout grammar
- page furniture
- motion character
- imagery treatment
- do and do-not rules

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
- 3 to 4 page-level keywords
- source candidates
- selected image
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

## Motion Pass Rules

If the user requests motion after the static pass:

- treat motion as pacing, not decoration
- default to `transform` and `opacity`
- preserve `prefers-reduced-motion`
- keep one active slide at a time
- avoid turning the deck into a generic animated landing page

## Optional PPTX Handoff

- PPTX export is downstream from the approved static deck.
- Motion stays in HTML and should be ignored by the PPTX handoff.
- Preserve `exportModeHint` so simple slides can stay editable and complex slides can fall back to raster.

## DSL Consumption Rules

- `deck.md` can seed the initial page structure and hints, but it must not replace advanced visual locking.
- `deck_source.json` may carry image hints and `exportModeHint`, but those are advisory only until the advanced flow confirms them.
- DSL input must not bypass reference selection, fallback design constraints, or static-first review.
