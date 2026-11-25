# dev-3-health-endpoint

## Goal

Expose `GET /healthz` returning `200` with body `ok`, so Kubernetes liveness and readiness probes can detect hung pods.

## Tickets

- #3

## Scope

- In: the `/healthz` route in `src/server/app.ts`, its unit test, and the CI Docker smoke test polling `/healthz`.
- Out: Helm chart or Kubernetes manifest changes, dependency checks, a Dockerfile `HEALTHCHECK`.

## Decisions

- Plain-text `ok` with `content-type: text/plain`, as the issue asks for "`200` und `ok`".
- One endpoint serves liveness and readiness; the service has no dependencies to check.
- The route matches on path only, like the existing routes, so any method gets `200`; harmless for probes.
- The smoke test now polls `/healthz` instead of `/api/hello`; `/api/hello` stays covered by its unit test.

## Alternatives Considered

- JSON body (`{"status":"ok"}`): rejected, the issue specifies plain `ok`.
- Separate `/livez` and `/readyz`: rejected, no dependencies make them differ and the issue asks for one endpoint.
- Adding a second curl to the smoke test: rejected to keep the change minimal.

## Verification

- `yarn check` (typecheck, format, tests including the new `/healthz` test) and `yarn check:licenses`.
- `BRANCH_NAME=dev-3-health-endpoint yarn check:branch-doc`.
- CI `Build Packages` smoke step polls `/healthz`.
