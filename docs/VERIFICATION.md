# Verification record — 2026-11-20

## Previously recorded baseline checks

The repository's 2026-11-19 verification record reported:

- \`npm ci --no-audit --no-fund\`: completed from the then-current lockfile.
- \`npm run lint\`: passed with zero errors; seven React Fast Refresh mixed-export warnings remained at that time.
- \`npx tsc --noEmit -p tsconfig.app.json\`: passed.
- \`npm run build\`: passed; production bundle generated.
- \`git diff --check\`: passed.
- Environment recorded: Node 24.22.3, npm 11.9.0.

Those checks pre-date the 2026-11-20 documentation, dashboard-component, Vite and Capacitor configuration edits. They must not be treated as a fresh verification of the current commit.

## Current change set

Committed on 2026-11-20:

- Rewritten README with a distinct physical-prototype/software-demo boundary.
- Revised hardware evidence, measurement register and control-interface documents.
- Added two project-report photographs under \`docs/images/\`.
- Reworked dashboard copy to label speed, SOC, load, temperature and gear as simulated/demo values.
- Removed the remote Lovable \`server.url\` from Capacitor configuration so the app loads its locally built \`dist\` assets.
- Removed the Lovable Vite development tagger.
- Replaced generic Lovable HTML metadata with RAIDER SAI project metadata.

## Verification still required locally

A fresh checkout on the current \`main\` branch should run:

\`\`\`bash
npm ci
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
\`\`\`

The container used for this repository update could not clone the GitHub repository because outbound DNS/network access to GitHub was unavailable. Therefore, the updated React code and configuration have **not** been freshly built or linted in this session. Run the commands above before merging further code or producing a release.

## Hardware and measurement boundary

Source inspection confirms that the web dashboard uses local synthetic state only. No ESP32 firmware, BLE connection, ignition relay control, sensor acquisition, hardware-in-the-loop test, latency measurement, dynamometer trace, battery-range test or vehicle road test was executed as part of this repository update.

The physical prototype photographs document the build; they do not validate performance figures. See [HARDWARE_PROOF.md](HARDWARE_PROOF.md), [MEASUREMENT_REGISTER.md](MEASUREMENT_REGISTER.md) and [CONTROL_INTERFACE.md](CONTROL_INTERFACE.md).

## Publication status

The IRJET article is listed as published and linked to the publisher PDF. Any other journal submission must be described using its actual current status; no acceptance, peer review or publication is inferred from this repository.
