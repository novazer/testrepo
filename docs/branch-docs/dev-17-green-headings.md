# dev-17-green-headings

## Goal

Render all headings (h1–h6) in the corporate green `#008000`.

## Tickets

- #17

## Scope

- One central style rule in the `/` HTML response, driven by the exported `HEADING_COLOR`.
- Unit test in `app.test.ts` and an HTTP integration test in `headings.integration.test.ts`.
- Out of scope: user-configurable colour (settings page, persistence), planned as a follow-up ticket by the PO.

## Decisions

- Inline `<style>` in the HTML string: there is one view and no static asset pipeline.
- `#008000` on white has a contrast of about 5.1:1 (WCAG AA).
- `HEADING_COLOR` is the single place a later per-user setting can plug into.

## Alternatives Considered

- Inline `style` attribute on the `<h1>`: not central, misses future headings.
- Separate CSS file: needs a static route, too much for one rule.

## Verification

`yarn check`, `yarn check:licenses`, `yarn check:branch-doc`, and opening `/` in a browser.
