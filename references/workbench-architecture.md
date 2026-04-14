# Workbench Architecture

## Goal

Define the product shape of a future PPT-style visual editor for `ppt-as-code`.

## Product Position

- This is a dedicated workbench for `ppt-as-code` decks.
- It is not a generic webpage editor.
- It is not a general Figma replacement.
- V1 should support only decks that already follow this skill's own artifact contracts.

## Core Modules

### 1. Canvas

The main slide surface should support:

- dragging
- resizing
- alignment and snapping
- layer order
- grouping
- direct selection

### 2. Inspector

The right panel should support:

- font size
- font family
- color
- spacing
- border radius
- shadow
- opacity
- chart styling
- page furniture styling

### 3. Outline

The left panel should support:

- slide ordering
- slide visibility
- slide locking
- element tree browsing

### 4. Sync Engine

This is the most important part.

It should:

- read and write `deck_model.json`
- project changes into upstream artifacts
- re-render the affected HTML
- update export hints when needed

### 5. Preview / Export

The workbench should provide:

- live HTML preview
- slide-by-slide render verification
- export-state preparation for PPTX handoff

## V1 Scope

V1 should focus on:

- opening an existing `ppt-as-code` deck
- editing slide elements on canvas
- editing global and local styles
- syncing the result back into artifacts
- regenerating HTML
- refreshing export hints

V1 should not promise:

- generic HTML editing
- arbitrary DOM editing
- full SVG path editing
- unlimited responsive layout intelligence
- full Figma-like vector authoring

## Allowed Free-Canvas Actions

V1 may support:

- arbitrary element movement
- arbitrary resize
- layer reordering
- text style edits
- image crop and placement edits
- chart container resizing
- card and shape composition

## Boundary Rule

If a canvas action cannot be safely projected back into artifacts:

- restrict it
- or mark it as `needs_review`
- or mark it as `html_only_override`

Do not silently accept the action as fully synchronized.
