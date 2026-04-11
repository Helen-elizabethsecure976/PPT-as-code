# Visualization Engines

## Goal

Choose the right visualization engine for each page instead of treating all visuals as generic charts.

## First-Wave Engines

These are the engines to prefer first in `ppt-as-code`:

### `vega`

Best for:

- bar charts
- line charts
- area charts
- scatter plots
- heatmaps
- multi-series comparisons

Use when the page thesis depends on quantitative comparison, trend, or distribution.

### `infographic`

Best for:

- timelines
- roadmaps
- funnels
- SWOT
- stage breakdowns
- org trees

Use when the page thesis is structural or process-oriented rather than statistical.

### `infocard`

Best for:

- KPI cards
- one-big-number pages
- conclusion cards
- highlight blocks

Use when the page thesis is a concentrated insight rather than a full chart.

### `mermaid`

Best for:

- process flows
- sequence diagrams
- state transitions
- simple systems logic

Use when logic clarity matters more than decorative styling.

### `architecture`

Best for:

- layered architecture
- workflow stacks
- system-overview pages
- platform structure

Use when the page explains system composition or layered relationships.

## Selection Rules

- If the page thesis is one number or one concentrated takeaway, prefer `infocard`.
- If the page thesis is trend or comparison, prefer `vega`.
- If the page thesis is stages, roadmap, or conceptual structure, prefer `infographic`.
- If the page thesis is flow or logic, prefer `mermaid`.
- If the page thesis is layered structure, prefer `architecture`.

## Fallback Rules

- If data is incomplete, downgrade from `vega` to `infocard` or text-led summary.
- If a diagram becomes too dense, simplify it or downgrade it to text-led plus image-led support.
- If a visualization breaks the deck style or pacing, reject it rather than forcing it into HTML.

## Current Exclusions

Do not prioritize these engines in the first-wave presentation workflow:

- `uml`
- `cloud`
- `network`
- `security`
- `bpmn`
- `archimate`
- `iot`

They may be useful later for technical-deck submodes, but they are too heavy for the core creator-first flow.
