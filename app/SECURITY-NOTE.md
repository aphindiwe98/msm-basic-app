# Security Note (App dependencies)

## Summary
`npm audit` reports high severity vulnerabilities in transitive dependencies
pulled in by `sqlite3` (via `node-gyp` / `tar`).

## Why not `npm audit fix --force`?
`npm audit fix --force` proposes a breaking change (major version change to sqlite3).
Because this is a basic demo app intended for QA evidence, we prioritize stability and reproducibility.

## Mitigation
- No untrusted user file extraction is performed by this app.
- Inputs are validated on server routes (/api/register, /api/checkout).
- SQLite is used locally; no production deployment claim is made.
- Dependencies are pinned by package-lock.json to ensure reproducible installs in CI.

## Next planned action
Evaluate alternative SQLite libraries (`better-sqlite3` or `sqlite` wrapper) to reduce dependency risk,
or upgrade sqlite3 in a controlled branch with CI verification.
