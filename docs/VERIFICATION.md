# Verification record — 2026-11-19

- `npm ci --no-audit --no-fund`: completed from the existing lockfile.
- `npm run lint`: passed with zero errors; seven existing React Fast Refresh
  mixed-export warnings remain in scaffold UI components.
- `npx tsc --noEmit -p tsconfig.app.json`: passed.
- `npm run build`: passed; 1,669 modules transformed, production bundle generated.
- `git diff --check`: passed.
- Environment: Node 24.22.3, npm 11.9.0.

The build reports old Browserslist data; npm also reports a host proxy-configuration
warning. Neither warning is a passing hardware test or a security audit. Three
pre-existing lint errors were corrected using type aliases and an ES-module import.
Checks were run sequentially after an initial concurrent build/lint attempt raced
on Vite's temporary config file.

Source inspection confirms simulated telemetry and local UI state only. The UI
now labels this boundary and no longer displays a fifth gear for the four-speed
prototype. No BLE connection, ESP32 firmware execution, latency measurement,
vehicle road test, battery range test or publication peer review was performed.

The published IRJET article was checked at its publisher URL. Journal-submission
status is author-reported; no acceptance or unshared manuscript content is asserted.
HARDWARE_PROOF.md is a deliberately incomplete evidence template, not fabricated
photographic or individual-contribution evidence.
