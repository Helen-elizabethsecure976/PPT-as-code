# Source To Scenes

## Goal

Turn long-form source material into a scene map before writing the confirmed deck breakdown.

This pass sits between source normalization and `theme_breakdown.md`.

## What It Does

Cluster the source into likely slide groups rather than final slide text.

The scene map should identify:

- likely page sequence
- candidate scene roles such as cover, hook, concept, compare, quote, data, divider, and conclusion
- quote-worthy passages
- stat-worthy passages
- example-heavy sections
- image-worthy sections

## Output Shape

When artifact persistence is enabled, prefer `source_scene_map.md`.

That artifact should record:

- source section or paragraph cluster
- proposed scene label
- why it matters to the deck
- likely slide count impact
- image need hint

## Rules

1. Do not mistake paragraph order for final slide order.
2. Merge repetitive source sections into one scene when they serve the same point.
3. Split dense source sections when they would overload one slide.
4. Mark optional scenes so the confirmed breakdown can stay lean.
5. Treat the scene map as upstream planning only. `theme_breakdown.md` remains the confirmed source of deck structure.

## Best Fit

Use this pass when the source starts as:

- PDF reports
- long articles
- whitepapers
- research notes
- converted docs
- normalized web pages

Skip it when the user already provides a slide-shaped outline or a strong `deck.md` draft.
