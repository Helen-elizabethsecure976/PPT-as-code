# PPT as Code

English README. For Chinese, see [README-zh.md](./README-zh.md).

`PPT as Code` is a creator-first skill for planning, designing, and building HTML-based presentations. It keeps the deck workflow stage-like, artifact-driven, and confirmation-aware instead of letting a presentation drift into a long webpage or a code-first prototype too early.

This open-source package is the portable edition of the skill. It keeps the core workflow, but removes private workspace assumptions, makes file persistence safer by default, and includes explicit no-network / no-download fallbacks.

## Why It Is Useful

- It treats a deck as a staged communication artifact, not just "some slides."
- It locks structure, style, script, imagery, and HTML in the right order.
- It keeps `quick`, `basic`, and `advanced` modes, but makes `basic` and `advanced` confirmation-first by default.
- It can normalize source material before deck planning starts.
- It can plan charts and diagrams before HTML implementation.
- It now ships with a runnable visual workbench prototype for PPT-style editing.

## Core Principles

- Presentation-first, not article-first.
- Style should be explicit, even in lighter modes.
- Image search should be page-aware, not deck-topic vague.
- Static HTML should be approved before motion work starts.
- Network access and file writes should be treated as capabilities, not assumptions.
- `index.html` is usually a downstream render target, not the first editing surface.

## Update Log

### 2026-04-14

- Added a formal workbench direction with `deck_model.json` as the unified canvas-editing source.
- Added explicit workbench architecture and sync references for Canvas, Inspector, Outline, Sync Engine, and Preview/Export.
- Added a runnable `workbench/` prototype with PPT-like canvas editing, snapping, keyboard shortcuts, richer element types, and artifact projection.
- Added a dual editing route in the workbench:
  - `Deck Mode` for `deck_model.json`-driven editing
  - `HTML Mode` for direct editing of an existing compatible HTML deck
- Added `HTML Direct Mode v1` so users can open a built deck, select text or image nodes on the rendered page, edit them in Inspector, and export the updated source HTML.
- Added controlled HTML import/export with stable `data-*` markers and embedded model JSON.
- Added stronger presentation-copy constraints to cut unrelated filler, generic PPT meta language, and low-signal decorative sentences.
- Added explicit large-type discipline: do not solve crowded slides with tiny text; split the content or remove weak copy instead.
- Expanded pre-HTML QA to check copy relevance, title quality, and text density.
- Added edit-routing rules so modification requests are classified first and routed to the right upstream artifact.
- Added `style_system.json` as the editable style source for fonts, colors, spacing, page furniture, and chart styling.
- Added a rule that `index.html` should not be edited first unless the request is an implementation-only hotfix or no usable upstream artifact exists.

### 2026-04-13

- Tightened `basic` and `advanced` into strict-step modes by default.
- Added a hard rule that generic requests like "continue" do not bypass blocking checkpoints.
- Limited step skipping to clear user overrides such as named checkpoint skips or explicit end-to-end execution requests.

### 2026-04-11

- Added a Slidev-inspired `deck.md` draft route that compiles into `deck_source.json` before entering the normal deck workflow.
- Added source-material normalization for PDF, DOCX, EPUB, HTML, LaTeX, ordinary web pages, and high-friction pages such as WeChat.
- Added a `source-to-scenes` planning pass so long-form material can be compressed into likely slide groups before the confirmed breakdown.
- Added a lightweight pre-HTML QA pass that checks page order, title hierarchy, page-thesis coverage, and missing image assets or fallback links.
- Added a curated reference-search pack that combines high-signal global presentation sites and Chinese PPT ecosystems.
- Added a visualization layer for `basic` and `advanced`, with `visual_plan.md`, engine selection, placement planning, and style inheritance for charts and diagrams.
- Kept `quick` intentionally chart-free so the fast route stays lightweight.

### 2026-04-10

- Removed private workspace assumptions from the open version and made artifact persistence conversation-first by default.
- Added explicit no-browsing and no-download fallbacks so `advanced` can continue without pretending web search or downloads happened.
- Separated runtime guidance from maintainer guidance and kept stable rules in the main skill docs instead of in maintenance logs.
- Added bilingual documentation with [README-zh.md](./README-zh.md).

### 2026-04-06

- Simplified the PPTX export route to a screenshot-only workflow.
- Clarified that HTML remains the source of truth and PPTX is a fidelity-first delivery format.

## What The Skill Covers

The skill supports three modes:

1. `quick`
   For MVP decks, rough prototypes, and "get it running first" requests.
2. `basic`
   For confirmation-first deck planning where the breakdown, script, and image plan should be approved before HTML.
3. `advanced`
   For reference-driven deck work, stronger design locking, static-first delivery, and an optional motion pass.

It also supports:

- creator-first style direction recommendations
- structured design constraints for implementation
- page-level keyword extraction for image search
- manual-download fallback when image downloads fail
- optional persisted artifacts such as `deck_brief.md`, `theme_breakdown.md`, `deck_script.md`, and `index.html`
- optional `visual_plan.md` for chart, diagram, infographic, and KPI-card planning
- optional `deck.md` input and normalized `deck_source.json`
- optional normalized markdown source from PDF, document, or web material
- optional `source_scene_map.md` for long-form source decomposition
- optional `qa_report.md` for pre-HTML checks
- optional `reference-search-pack.md` for curated reference discovery
- optional `deck_model.json` for workbench-driven visual editing
- optional export targets: `html`, `pptx`, or `both`
- a manifest handoff via `deck_manifest.json`

## How It Works

At a high level, the skill follows a staged deck workflow:

1. Ingest the topic, audience, context, and existing material.
2. If the input starts from PDF, DOCX, EPUB, HTML, LaTeX, or web material, normalize it into markdown first.
3. If the material is still long-form, derive a scene map before the confirmed breakdown.
4. Detect whether the input is normal structured input or a Slidev-inspired `deck.md` draft.
5. If `deck.md` is present, compile it into `deck_source.json`.
6. Diagnose what is missing, such as structure, style, references, script, or images.
7. Route the request into `quick`, `basic`, or `advanced`.
8. Produce staged artifacts before final HTML.
9. Plan charts, diagrams, infographics, or KPI cards in `basic` and `advanced` when they improve page clarity.
10. Use explicit confirmation checkpoints for higher-risk decisions.
11. Run a lightweight pre-HTML quality check.
12. Generate static HTML first.
13. If needed, bridge the approved deck into `deck_manifest.json` for PPTX export.
14. Add motion later only when the workflow and user approval justify it.

## Safe Defaults In The Open Version

### No hardcoded workspace structure

The skill does not assume a folder such as `20_Projects/`.
If the environment has no obvious deck directory, it keeps artifacts inline in the conversation unless the user explicitly asks to persist them.

### No hard dependency on local style files

If local writing-style notes are available, the skill may scan likely files such as:

- `voice_profile.md`
- `brand.md`
- `writing_style.md`
- project notes

These are optional hints, not required inputs.

### No hard dependency on web search

If browsing is available, `advanced` can search for real PPT or slide-design references.
If browsing is unavailable, the skill skips that branch and derives structured design constraints directly from:

- the chosen style direction
- user-provided inspiration
- the topic and audience

### No hard dependency on image downloads

If downloading is available, the skill may download chosen images into `assets/`.
If downloading is unavailable or fails, it records source links or search strings and tells the user what to download manually.

## Source-Material Normalization

This package can also start from source material that is not already deck-shaped.

- Normalize documents or web pages into markdown first.
- If the result is still long-form, derive a scene map before the confirmed breakdown.
- Extract the deck thesis and likely scenes from that markdown.
- Then feed the result into `quick`, `basic`, or `advanced`.

Recommended adapter mapping:

- PDF -> `pdf_to_md.py`
- DOCX / EPUB / HTML / LaTeX -> `doc_to_md.py`
- ordinary web pages -> `web_to_md.py`
- high-friction pages such as WeChat -> `web_to_md.cjs`

This is an upstream planning layer, not a rendering layer. HTML remains the presentation output.

## Reference Search Pack

This package includes a curated source pack for reference locking.

Global sources:

- Behance
- Dribbble
- SlideShare
- Pitch

Chinese sources:

- 优品PPT
- OfficePLUS
- Docer
- 51PPT
- 站酷
- iSlide

The pack is meant to reduce random search drift and give the workflow a more repeatable reference-selection path.

## Lightweight QA Route

Before static HTML is generated in non-trivial runs, this package can run a lightweight QA pass.

The QA focuses on:

- page sequence coherence
- title hierarchy consistency
- missing image assets or fallback links
- whether each slide has a clear thesis
- whether the copy is relevant to the page purpose
- whether the slide is too text-dense to present cleanly

This pass is intentionally small and fast. It is meant to catch common deck-structure misses before implementation hardens them.

## Workbench

The repo now ships a runnable `workbench/` prototype for PPT-style editing.

Current workbench direction:

- `Deck Mode` edits `deck_model.json` as the canvas source of truth.
- `HTML Mode` opens an existing compatible HTML deck and edits it directly on the rendered page.
- The workbench supports PPT-like element editing, not raw CSS-first thinking.
- Artifact projection can export:
  - `deck_brief.md`
  - `theme_breakdown.md`
  - `deck_script.md`
  - `visual_plan.md`
  - `image_plan.md`
  - `qa_report.md`
  - `style_system.json`
  - `deck_manifest.json`

This is still an authoring prototype, not a finished production editor, but it already provides a practical route for:

- faster layout edits
- PPT-like formatting control
- direct HTML deck touch-ups without collapsing the original page structure

## Editing Route

- Structure changes should start from `theme_breakdown.md`.
- Copy changes should start from `deck_script.md`.
- Visualization changes should start from `visual_plan.md`.
- Image changes should start from `image_plan.md`.
- Style changes such as font size, color, spacing, or page furniture should start from `style_system.json`.
- Export behavior changes should start from `deck_manifest.json`.
- `index.html` should be treated as a downstream render target, not the first editing surface, unless the request is an implementation-only hotfix.

## PPTX Export Route

This package keeps HTML authoring and PPTX delivery separated on purpose.

- `ppt-as-code` owns the deck workflow, script, imagery, and final static HTML.
- `pptx-export-for-ppt-as-code` consumes `index.html`, `deck_manifest.json`, and `assets/`.
- Every slide is exported from a stable HTML render state as a screenshot.
- PowerPoint is treated as a fidelity-first delivery container, not a native reconstruction target.
- Motion stays HTML-only.

## Package Structure

```text
ppt-as-code-open/
|-- SKILL.md
|-- README.md
|-- README-zh.md
|-- LICENSE
|-- CONTRIBUTING.md
|-- agents/
|   `-- openai.yaml
|-- references/
|   |-- quick-mode.md
|   |-- basic-mode.md
|   |-- advanced-mode.md
|   |-- visual-and-images.md
|   |-- visualization-layer.md
|   |-- visualization-engines.md
|   |-- reference-search-pack.md
|   |-- component-libraries.md
|   |-- source-normalization.md
|   |-- source-to-scenes.md
|   |-- quality-checker.md
|   |-- deck-dsl.md
|   |-- deck-source-contract.md
|   |-- change-routing.md
|   |-- style-system-contract.md
|   |-- deck-model-contract.md
|   |-- workbench-architecture.md
|   |-- workbench-sync.md
|   |-- pptx-export-handoff.md
|   `-- evolution-log.md
|-- companion-skills/
|   `-- pptx-export-for-ppt-as-code/
|       |-- SKILL.md
|       |-- agents/
|       |   `-- openai.yaml
|       `-- references/
|           |-- manifest-contract.md
|           `-- rendering-rules.md
|-- workflows/
|   |-- mode-delivery.md
|   `-- evolution-writeback.md
`-- workbench/
    |-- index.html
    |-- styles.css
    |-- app.js
    |-- deck_model.sample.json
    `-- README.md
```

## Installation Notes

This folder is stored as `ppt-as-code-open` to avoid colliding with a private local version.

If you want to publish or install it as the canonical package:

1. rename the folder to `ppt-as-code` if needed
2. keep the skill `name` in `SKILL.md` as `ppt-as-code`
3. install it in your preferred skill directory or publish it from this folder

## Suggested Prompts

### Quick example

```text
Use ppt-as-code to help me build a fast HTML deck about AI workflow design for product teams.
I want something lightweight and stage-like, not a long article.
Start with a quick mode route.
```

### Basic example

```text
Use ppt-as-code to help me build a presentation about why AI-native teams need new operating habits.
I have rough notes but no clear structure or style yet.
Please use a basic workflow and confirm the breakdown before writing HTML.
```

### Advanced example

```text
Use ppt-as-code to build a premium HTML deck about AI product differentiation.
I want stronger design direction and a static-first workflow.
If browsing is available, give me real presentation references.
If not, synthesize the design constraints directly from the style direction.
```

## Maintainers And Contributors

This package keeps runtime guidance and maintainer guidance separate.

For contribution and maintenance rules, see:

- [README-zh.md](./README-zh.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [workflows/evolution-writeback.md](./workflows/evolution-writeback.md)
- [references/evolution-log.md](./references/evolution-log.md)

The maintainer rule is simple:

Stable feedback should be integrated into the main docs, not left in logs.
