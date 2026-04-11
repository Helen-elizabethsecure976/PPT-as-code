# Visualization Layer

## Goal

Plan charts, diagrams, infographics, and KPI cards as part of the deck structure before HTML implementation begins.

This layer sits after the script is confirmed and before the image plan is finalized.

## Artifact

When persistence is enabled, record the result as `visual_plan.md`.

The artifact should capture page-level visualization decisions rather than implementation code.

## Page-Level Decision

For each slide, choose one primary visual role:

- `text-led`
- `image-led`
- `chart-led`
- `diagram-led`
- `card-led`

Do not force a visual if text or image is already the clearest expression.

## Required Fields

For every slide that is not purely text-led, record:

- `slide_number`
- `page_thesis`
- `visual_role`
- `engine`
- `placement`
- `chart_or_diagram_type`
- `content_source`
- `style_constraints`
- `fallback_mode`

## Placement Options

Use one of these placement labels:

- `full-width`
- `left`
- `right`
- `top-band`
- `bottom-band`
- `center-focus`
- `split-2col`

Choose placement based on what the page wants the viewer to see first.

## Style Inheritance

Every visualization must inherit the deck's active design constraints.

That includes:

- title and label typography
- color logic
- spacing rhythm
- card and container treatment
- emphasis style

Charts and diagrams should feel native to the deck, not embedded from a separate system.

## Quick Mode Rule

Do not use the full visualization layer in `quick`.

If the page truly needs a chart, diagram, infographic, or KPI card, that is a signal to upgrade the run to `basic` or `advanced`.
