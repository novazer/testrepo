# factory/issue-11-219973bb25cc

## Goal

Make the greeting sound like a teenager wrote it (youth slang), replacing the old "Hello, ..." text.

## Tickets

- #11 Idee: Coole Anrede (P1)

## Scope

- `greet()` in `src/common/greeting.ts` and its tests; `/api/hello` and `/` pick it up.
- Out: i18n and a configurable greeting.

## Decisions

- Fixed wording, no flag (PO: "fest, ersetzen"): `Same, <name>! Low key swag to see you.`
- English only; the code has no multi-language support yet.
- Wording is a proposal using the words from the issue; the PO approves it in review (`business-review-required`).

## Alternatives Considered

- Configurable greeting or locale table: rejected as speculative, PO asked for replacement.

## Verification

`yarn check`, `yarn check:licenses`, `yarn check:branch-doc factory/issue-11-219973bb25cc`.
