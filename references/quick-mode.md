# Quick Mode

## Goal

Use `quick` when the user wants a web presentation running fast, but still wants it to feel intentional instead of visually empty.

## Default Deliverable

Return:

- a lightweight deck brief or outline
- 3 to 4 style directions when style is undecided, with one recommended default
- one cover direction
- a minimal HTML route or short prompt pack
- an optional PPTX handoff after HTML when the user explicitly asks for `pptx` or `both`

By default, keep these artifacts in conversation.
Only materialize them as files if the user asks for persisted output or the repo clearly supports that workflow.

## Workflow Contract

1. Diagnose missing topic, audience, structure, and style inputs first.
2. If the request starts from PDF, DOCX, EPUB, HTML, LaTeX, or web material, normalize that source into markdown before shaping the quick route.
3. If the normalized source is still long-form, derive a compact source-to-scenes pass before shaping the quick outline.
4. If `deck.md` is provided, treat it as a fast draft input and compile it into `deck_source.json` before building the quick route.
5. If the theme is vague, create a lightweight outline before implementation.
6. If style is missing, recommend 3 to 4 directions and clearly recommend one.
7. Continue with the recommended direction unless the user explicitly wants to choose.
8. Run a lightweight pre-HTML QA pass before finalizing the quick HTML route.
9. Keep the final route small:
   - minimal slide structure
   - stage-like viewport
   - keyboard navigation
   - restrained transitions
10. Do not require a full reference-image round-trip in `quick`.
11. Do not default to a full image-download workflow unless the user explicitly asks for image help.
12. If the user wants `pptx` or `both`, preserve clear slide roles and add export hints only after the static HTML route is settled.

## Minimum Technical Contract

Even in `quick`, keep these:

- one active slide at a time
- previous and next controls
- keyboard navigation
- `transform` and `opacity` transitions
- `prefers-reduced-motion`
- a deck that still reads like a presentation rather than a webpage

## Quick Styling Rules

- A lightweight deck still needs a real visual thesis.
- Do not return a bare HTML skeleton without style direction.
- Prefer one clear mood and one strong cover idea over scattered embellishments.
- If the deck needs a progress signal, keep it lightweight and obvious.

## Upgrade Path

Escalate to `basic` when the user wants:

- a confirmed theme breakdown before script writing
- a confirmed slide script before HTML
- per-page image handling
- more explicit creator workflow artifacts

## Optional PPTX Handoff

- HTML still comes first in `quick`.
- If the final target includes PPTX, prepare `deck_manifest.json` after the slide structure is stable.
- Mark visually dense or heavily composited pages as likely `raster` candidates instead of pretending they will stay editable.

## DSL Consumption Rules

- `deck.md` can directly seed the quick slide structure.
- `deck_source.json` is the normalized input for quick HTML generation.
- `quick` should not require a full breakdown round-trip just because the draft came from DSL.
