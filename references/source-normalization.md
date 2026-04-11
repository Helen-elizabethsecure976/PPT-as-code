# Source Normalization

## Goal

Normalize heterogeneous source material into markdown before deck breakdown, scripting, or image planning begins.

This layer is for cases where the user starts from documents or web pages rather than a native slide outline.

## Adapter Mapping

Use these adapters when they are available in the environment:

- PDF -> `pdf_to_md.py`
- DOCX / EPUB / HTML / LaTeX -> `doc_to_md.py`
- ordinary web pages -> `web_to_md.py`
- high-friction pages such as WeChat or anti-bot pages -> `web_to_md.cjs`

If the environment does not expose the matching adapter, summarize manually and continue with an explicit fallback note.

## Normalization Rules

1. Preserve headings, lists, quotes, tables, and image captions when possible.
2. Prefer one normalized markdown source over many fragmented partial extracts.
3. Remove obvious navigation chrome, duplicated boilerplate, and irrelevant footer noise.
4. Keep source provenance clear enough that the user can trace the deck back to the material.
5. Treat the normalized markdown as working source material, not as the final deck script.

## Output Contract

The normalization pass should yield one of these:

- a single markdown source file or inline markdown block
- a short note that names the adapter used
- a fallback note when the adapter was unavailable or the material needed manual cleanup

Recommended metadata to retain:

- source type
- source title
- source URL or file name
- adapter used
- normalization caveats

## Handoff To The Deck Workflow

After normalization:

1. extract the deck thesis
2. identify likely page groups or scenes
3. mark quote-worthy or stat-worthy passages
4. feed the result into `quick`, `basic`, or `advanced`

This layer should improve deck planning speed, but it must not bypass the normal confirmation gates in `basic` or `advanced`.

## Borrowed Architectural Value

This pattern borrows a useful idea from document-to-slide systems:

- convert messy source formats into a common semantic source first
- then plan the deck from that semantic source

`ppt-as-code` keeps HTML as the final presentation layer, but it can still benefit from a clean markdown normalization step upstream.
