# Style System Contract

## Goal

Keep deck-wide visual decisions in one editable style source instead of scattering them across scripts, plans, and HTML.

## Primary Artifact

- Use `style_system.json` as the primary source for global style changes.
- `style_options.md` is for choosing a direction.
- Once the direction is chosen, `style_system.json` becomes the editable style source of truth.

## What Belongs Here

Use `style_system.json` for:

- typography
- color system
- spacing scale
- page furniture
- card and container styling
- chart and diagram visual tokens
- slide-specific style overrides when needed

## Minimal Structure

```json
{
  "deck_style": {
    "direction": "editorial-minimal",
    "tone": "sharp, restrained, high-contrast"
  },
  "typography": {
    "font_display": "ABC Favorit",
    "font_body": "Inter",
    "cover_title_size": 72,
    "section_title_size": 44,
    "body_size": 24,
    "caption_size": 16
  },
  "color": {
    "bg": "#F7F3EC",
    "fg": "#111111",
    "accent": "#C84C2A",
    "muted": "#786F65"
  },
  "layout": {
    "content_width": 1200,
    "grid_gap": 24,
    "panel_radius": 20
  },
  "furniture": {
    "progress_style": "thin-bottom-line",
    "arrow_style": "transparent-small"
  },
  "visualization": {
    "chart_label_size": 18,
    "chart_grid_opacity": 0.12,
    "card_fill": "#F1E9DE"
  },
  "slide_overrides": {
    "slide_3": {
      "title_size": 56
    }
  }
}
```

## Routing Rules

- Change `style_system.json` first when the user asks for:
  - font size
  - font family
  - text contrast
  - accent color
  - spacing
  - radius
  - progress bar style
  - arrow treatment
  - chart label size
  - card fill or border treatment
- Use `slide_overrides` only for intentional exceptions on one or a few slides.
- Do not use slide overrides to patch bad global defaults. Fix the global token first when the problem is deck-wide.

## Relationship To Other Artifacts

- `theme_breakdown.md` owns structure.
- `deck_script.md` owns copy.
- `visual_plan.md` owns visual-role and chart/diagram decisions.
- `image_plan.md` owns image sourcing.
- `deck_manifest.json` owns export behavior.
- `style_system.json` owns visual style.

## HTML Rule

- Do not treat inline CSS or random HTML tweaks as the primary style source when `style_system.json` exists.
- If an HTML tweak becomes stable or deck-wide, fold it back into `style_system.json`.

## Workbench Rule

- In workbench mode, Inspector edits should update `deck_model.json` first.
- The sync layer should then project those edits into `style_system.json` or `slide_overrides`.
- Do not let the Inspector write permanent style changes only into rendered HTML.
