# Security Note (App Dependencies)

## Summary

`npm audit` reports high-severity vulnerabilities originating from
transitive dependencies (e.g., `tar`, `node-gyp`) pulled in by `sqlite3`.

These vulnerabilities are related to development toolchains and packaging
utilities, not to application runtime logic.

---

## Why `npm audit fix --force` Was Not Applied

Running:

    npm audit fix --force

introduces a breaking major-version change to `sqlite3`, which may:

- Break application behavior
- Break CI reproducibility
- Introduce instability in this demo project

Because this repository is a QA automation portfolio project,
stability and deterministic CI behavior are prioritized.

---

## Risk Assessment

- The application does not process untrusted file uploads.
- No `tar` extraction is performed at runtime.
- No filesystem writes are performed from user input.
- SQLite is used locally only.
- No production deployment claim is made.

---

## Mitigation

- Dependencies are pinned via `package-lock.json`
- CI installs via `npm ci` for reproducibility
- Inputs are validated on:
  - `/api/register`
  - `/api/checkout`

---

## Future Consideration

Evaluate:

- `better-sqlite3`
- `sqlite` wrapper

in a controlled branch with CI validation to reduce dependency surface area.
