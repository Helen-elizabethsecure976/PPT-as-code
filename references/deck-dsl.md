# Deck DSL

## Goal

Provide a Slidev-inspired draft format for `ppt-as-code` users who want to sketch a deck quickly without writing final HTML first.

This is a **controlled DSL**, not real Slidev compatibility.

## File Name

Preferred input file:

- `deck.md`

## Supported Top-Level Frontmatter

Use YAML frontmatter at the top of the file.

Supported fields:

- `title`
- `audience`
- `tone`
- `theme`
- `deck_mode`
- `export_target`

Defaults:

- `deck_mode`: `quick`
- `export_target`: `html`

## Page Separation

Use `---` to separate slides.

The first frontmatter block applies to the whole deck.
Each later `---` block starts a new slide.

## Supported Slide Fields

Each slide may include:

- `layout`
- `title`
- `subtitle`
- `notes`
- `image`
- `keywords`
- `exportModeHint`

These may be written as simple metadata lines near the start of the slide.

## Supported Layouts

v1 supports only:

- `cover`
- `section`
- `bullets`
- `quote`
- `two-column`
- `image-right`
- `image-left`

Unknown layouts must downgrade to `bullets`.

## Supported Content Blocks

v1 supports these block types:

- plain text paragraphs
- bullet lists
- quote blocks

Semantic interpretation:

- paragraphs -> `text`
- bullet lists -> `bullets`
- markdown quotes -> `quote`

## Unsupported Features

Do not treat these as supported:

- Vue components
- Slidev click syntax
- Slidev themes
- custom layout plugins
- existing Slidev project import

If the user writes unsupported Slidev-only syntax, preserve the raw content as text and surface the boundary clearly.

## Example

```md
---
title: Why AI workflows keep failing
audience: Product teams
tone: sharp
theme: editorial-minimal
deck_mode: basic
export_target: html
---

---
layout: cover
title: Why AI workflows keep failing
subtitle: The real bottleneck is delivery structure
notes: Open with the conclusion, not the backstory.
---

---
layout: bullets
title: Three recurring problems
- Too many tools
- No shared prompt ownership
- No stable deliverable
image: messy workflow whiteboard
keywords: workflow chaos, fragmented tools
---

---
layout: quote
title: The bottleneck
> Teams do not fail because they lack AI tools.
> They fail because AI never enters a stable workflow.
---
```
