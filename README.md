# RAIDER SAI — physical EV retrofit and supervisory-interface prototype

This repository separates two stages of one development programme:

1. **2023 physical electric-motorcycle retrofit:** workshop integration and
   drivetrain iteration by a seven-member team led by Pavan Kumar Karsinapu.
2. **Later mobile ignition project:** React/TypeScript supervisory-interface
   prototype for an ESP32 / BLE 4.2 pre-ignition authorisation concept.

**The checked-in app runs simulated telemetry. It does not send BLE commands,
operate a relay, or establish that propulsion is safe to enable.**

## 2023 physical retrofit

| Item | Documented specification / reported result | Evidence classification |
|---|---|---|
| Mid-drive BLDC motor | 4.53 kg; 48 V / 1000 W; 3000 RPM | Component specifications reported in the build record |
| Motor torque | Approximately 3.18 N·m | Calculated from nominal power and speed, not a dynamometer trace |
| Battery bank | 48 V / 28 Ah; four 12 V units in series | Documented integration specification |
| Transmission | Four-speed sequential manual gearbox | Physical retrofit architecture |
| Drivetrain iteration | Three configurations; final custom-welded 15 cm master sprocket paired with approximately 6.5 cm driven sprocket | Workshop modification described in the build documentation |
| Efficiency | 83.2% reported | Rating-based calculation in the source paper; independent efficiency measurement not established here |
| Top speed | 90.6 km/h reported | Published claim; raw speed/time data and calibration are not included here |
| Single-charge range | Approximately 90 km reported | Published claim; route, energy/SOC logs and uncertainty require a reproducible evidence package |

The build is documented separately from the app's language statistics. Hardware
photographs and individual contributions belong in
[HARDWARE_PROOF.md](docs/HARDWARE_PROOF.md). A workshop photo establishes physical
work; it does not by itself validate every performance number.

The author-supplied build record describes ratio selection and gear-shift binding
across successive configurations. The 15 cm sprocket was a prototype fabrication
solution, not a released production component or proof of certified durability.

## ESP32 / TypeScript supervisory interface

`src/components/BikeControls.tsx` implements the visual interface and simulated
telemetry demonstration layer. Speed and power are randomly generated; battery
level is a demonstration state; the displayed gear is a four-speed demo estimate.
START/STOP changes local UI state only. No firmware, GATT transport, command
acknowledgement or hardware-in-the-loop test is included in this source tree.

The later project documentation describes an ESP32, BLE 4.2, ignition relay,
battery-voltage divider and Hall-based wheel-speed acquisition. A **184.26 ms
mean command latency** is author-reported for that development work; it is **not
measured by this frontend** and is not independently reproducible from this repo.
Publish firmware/version, timestamp definitions, sample count and raw logs before
using that number as a verified software benchmark.

See [system boundary](docs/CONTROL_INTERFACE.md) and
[measurement register](docs/MEASUREMENT_REGISTER.md). This public demo does not
claim verified fail-safe control, cryptographic protection or actuation reliability.

## Run the interface

```bash
npm ci
npm run dev
npm run lint
npm run build
npx tsc --noEmit -p tsconfig.app.json
```

Stack: React, TypeScript, Vite, shadcn/ui and Tailwind CSS. The original interface
was scaffolded using Lovable; that provenance does not establish hardware control.

## Publications and submissions

**Published:** Pavankumar Karsinapu, “Design and Performance Evaluation of an
Electric Bike Integrated with a 4-Speed Manual Transmission System,” *International
Research Journal of Engineering and Technology*, Vol. 12, Issue 6, June 2025,
pp. 980–985. [Publisher PDF](https://www.irjet.net/archives/V12/i6/IRJET-V12I6141.pdf).

**Submitted / under review, author-reported as of 19 November 2026:**
P. Karsinapu et al., “Context-Aware Pre-Ignition Authorization Framework for
Low-Cost Electric Two-Wheeler Retrofits,” *Proceedings of the Institution of
Mechanical Engineers, Part D: Journal of Automobile Engineering*.
This is an active journal submission, not an accepted or published article.
The manuscript is not distributed in this repository. No DOI or acceptance is claimed.

The later manuscripts use the platform as a case study. Their content must not
be inferred from this demonstration UI or from an earlier working document.

## Subsequent ongoing work

The auxiliary energy-harvesting generator study is a separate unfinished project.
Its [shaft component benchmark](https://github.com/Pavankreative/Ansys-shaft-analysis)
does not prove vehicle range extension or provide standstill backup energy.

[Verification record](docs/VERIFICATION.md) distinguishes software build checks
from physical testing and publication status.
