# Issue Triage

## What every issue contains

Every issue starts with a **Management Summary** (two or three sentences: what, who is affected, what outcome),
states impact and scope, has testable acceptance criteria, and a priority proposal **with a reason**. Use the
issue forms in `.github/ISSUE_TEMPLATE/` (Bug, Feature, Technical Task).

## Priority

| Priority      | Meaning                                                             | Issue field |
| ------------- | ------------------------------------------------------------------- | ----------- |
| P0 – Kritisch | production down, data loss, exploitable vulnerability               | `Urgent`    |
| P1 – Hoch     | core function unusable, release blocked, several customers affected | `High`      |
| P2 – Mittel   | contained restriction with a workable mitigation                    | `Medium`    |
| P3 – Niedrig  | convenience, cosmetics                                              | `Low`       |

## Effort

XS (< ½ day), S (~1 day), M (~3 days), L (~1 week), XL (> 1 week: split it). The organisation issue field
`Effort` maps XS/S → `Low`, M → `Medium`, L/XL → `High`.

## Intake triage

Every `Inbox` issue gets one decision: **Immediate** → `Sprint Backlog`, **Scheduled** → `Product Backlog`,
**Deferred** → `Later` with a date, **Rejected** → closed with a reason.

## Small technical changes

A small technical change without its own ticket references an existing ticket in the PR with
`Part of #123: reason`, which keeps the ticket open.
