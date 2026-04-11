# Deck Source Contract

## Goal

`deck_source.json` is the normalized internal representation of `deck.md`.

It exists to separate draft authoring input from final HTML rendering and final export manifests.

## Top-Level Fields

- `deckTitle`
- `audience`
- `tone`
- `theme`
- `deckMode`
- `exportTarget`
- `slides`

## Slide Fields

Each slide should contain:

- `id`
- `layout`
- `kind`
- `title`
- `subtitle`
- `blocks`
- `imageHint`
- `keywords`
- `notes`
- `exportModeHint`

## Block Fields

Supported block types:

- `text`
- `bullets`
- `quote`

Recommended shapes:

- `text`: `{ "type": "text", "content": "..." }`
- `bullets`: `{ "type": "bullets", "items": ["...", "..."] }`
- `quote`: `{ "type": "quote", "content": "..." }`

## Mapping Rules

- `layout` -> slide role / scene role seed
- `notes` -> speaker cue seed
- `image` -> `imageHint`
- `keywords` -> image-plan seed
- `exportModeHint` -> later manifest hint
- deck frontmatter -> brief and style seed

## Defaults And Downgrades

- missing `deckMode` -> `quick`
- missing `exportTarget` -> `html`
- missing `layout` -> `bullets`
- unknown `layout` -> `bullets`
- missing `title` -> infer from first meaningful text
- missing `keywords` -> empty array
- unsupported syntax -> preserve as `text`

## Example

```json
{
  "deckTitle": "Why AI workflows keep failing",
  "audience": "Product teams",
  "tone": "sharp",
  "theme": "editorial-minimal",
  "deckMode": "basic",
  "exportTarget": "html",
  "slides": [
    {
      "id": "slide-1",
      "layout": "cover",
      "kind": "cover",
      "title": "Why AI workflows keep failing",
      "subtitle": "The real bottleneck is delivery structure",
      "blocks": [],
      "imageHint": null,
      "keywords": [],
      "notes": "Open with the conclusion, not the backstory."
    },
    {
      "id": "slide-2",
      "layout": "bullets",
      "kind": "bullets",
      "title": "Three recurring problems",
      "subtitle": "",
      "blocks": [
        {
          "type": "bullets",
          "items": [
            "Too many tools",
            "No shared prompt ownership",
            "No stable deliverable"
          ]
        }
      ],
      "imageHint": "messy workflow whiteboard",
      "keywords": ["workflow chaos", "fragmented tools"],
      "notes": "",
      "exportModeHint": null
    }
  ]
}
```
