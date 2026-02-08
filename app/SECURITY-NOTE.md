# Security Note (npm audit)

As of this commit, `npm audit` reports high-severity vulnerabilities originating from transitive dependencies used by `sqlite3` build tooling (`node-gyp` -> `make-fetch-happen` -> `cacache` -> `tar`).

- Non-breaking fixes were applied using: `npm audit fix`
- Remaining issues require: `npm audit fix --force`
- npm indicates `--force` would install `sqlite3@5.0.2` (breaking change)

Decision:
- This project is a local learning/demo repository (not production deployed).
- We proceed without `--force` to avoid destabilizing Windows builds.
- Mitigation: pin Node LTS, track sqlite3 updates, and revisit if deploying.

Command output is available via `npm audit`.

## npm audit (transitive dependency note)

`npm audit` reports high-severity vulnerabilities in `tar` pulled transitively via:
sqlite3 → node-gyp → make-fetch-happen → cacache → tar.

Automated remediation requires `npm audit fix --force` which downgrades sqlite3 to `5.0.2`
and may introduce breaking changes (native module/toolchain behavior).

This repository is a portfolio/demo app. Dependencies are intentionally kept stable to avoid
breaking builds. Remediation is planned via controlled version bumps verified in CI, or by
replacing sqlite3 with an alternative (e.g., better-sqlite3) if required.

