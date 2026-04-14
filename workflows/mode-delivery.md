---
name: mode-delivery
description: Mode routing and output shaping rules for ppt-as-code
type: workflow
---

# Mode Delivery Workflow

## Routing Rules

- Choose `quick` for MVP decks, first-pass prototypes, and "get it running first" requests.
- Choose `basic` for creator-first deck work that needs confirmed breakdown, confirmed script, and confirmed image handling before HTML.
- Choose `advanced` for reference-driven deck design, structured visual locking, static-first delivery, or a later motion pass.

If the user explicitly names a mode, respect it.

If the request clearly says "start small and upgrade later", choose `quick` now and preserve the upgrade path.

## Input Layer Rules

- If the request starts from source documents or web pages, normalize that material into markdown before deck planning.
- Use these adapters when available:
  - PDF -> `pdf_to_md.py`
  - DOCX / EPUB / HTML / LaTeX -> `doc_to_md.py`
  - ordinary web pages -> `web_to_md.py`
  - high-friction pages such as WeChat -> `web_to_md.cjs`
- If the normalized source is still long-form, derive a scene map before the confirmed deck breakdown.
- Default `input_mode` is `structured`.
- Use `dsl` only when the user provides `deck.md` or explicitly asks to start from a deck draft file.
- `dsl` changes the input layer, not the meaning of `quick`, `basic`, or `advanced`.
- `dsl` must not bypass the confirmation sequence in `basic` or `advanced`.

## Output Matrix

| Mode | Artifact Bias | Visual Bias | HTML Bias | PPTX Bias |
|------|---------------|-------------|-----------|-----------|
| `quick` | lightweight outline or brief, usually inline | 3 to 4 directions if needed, one recommended default | minimal stage-like deck route, no full visualization layer | optional manifest after HTML |
| `basic` | confirmed breakdown, confirmed script, confirmed visual plan, confirmed image plan | creator-first style pack with page furniture options | static HTML only after confirmations | optional PPTX handoff only after static deck approval |
| `advanced` | direction choice, reference branch or fallback, structured constraints, confirmed visual plan, static-first then optional motion | reference-driven when browsing is available, style-synthesis fallback otherwise | static HTML first, motion only after approval | optional PPTX handoff from the approved static deck |

## Guardrails

- Do not migrate to a heavier stack just to get prettier components.
- `basic` and `advanced` are strict default-step modes.
- Do not skip the confirmation sequence in `basic` or `advanced`.
- Do not treat a generic "continue" as permission to bypass a blocking checkpoint.
- Only bypass a blocking checkpoint when the user explicitly names that override, or explicitly asks for an end-to-end run without confirmations.
- Do not skip the source-to-scenes pass when long-form source material is the real starting point.
- Do not skip the lightweight pre-HTML QA pass in non-trivial runs.
- Do not use the full chart or diagram planning layer in `quick`.
- Do not let `advanced` motion work start before the static deck is reviewed.
- Do not start PPTX export before the static HTML structure is approved.
- Do not force file writes when the user has not asked for persisted artifacts.
- Do not force web-reference search when browsing is unavailable.
- When modifying an existing deck, update the correct upstream artifact before touching `index.html`.
- Route style changes to `style_system.json` unless the request is explicitly an implementation-only hotfix.
