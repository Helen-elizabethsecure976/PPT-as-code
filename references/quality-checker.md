# Quality Checker

## Goal

Run a lightweight pre-HTML QA pass after the content artifacts are confirmed and before static HTML is generated.

## Required Checks

Check these items every time in non-trivial runs:

1. Page sequence coherence
   - the deck still has a readable beginning, middle, and end
   - no accidental duplicate or orphan page exists
2. Title hierarchy consistency
   - cover, section, and content pages follow a clear heading rhythm
   - no page is missing a usable headline unless that omission is intentional
3. Image coverage
   - every image-bearing slide has either a usable asset, a strong fallback link, or a deliberate no-image decision
4. Page-thesis coverage
   - every slide has a clear point, not just content fragments

## Optional Output

When persistence is enabled, record the pass as `qa_report.md`.

Recommended fields:

- check name
- pass or fail
- affected slide numbers
- fix note

## Failure Handling

- If a gap is small, fix it before HTML.
- If a gap needs user judgment, surface it explicitly before HTML.
- Do not treat HTML as ready when page-thesis coverage or image coverage is still ambiguous.

## Purpose

This is not a heavy validation framework.
It is a fast deck sanity check that catches the most common structural misses before implementation hardens them.
