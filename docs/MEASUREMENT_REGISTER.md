# Measurement and calculation register

This register classifies claims drawn from the original RAIDER SAI project report. It prevents a specification, calculation, reported result or simulated UI value from being presented as a measured result.

## Hardware specification register

| Parameter | Source-report value | Classification | Notes |
|---|---:|---|---|
| Motor voltage | 48 V | Reported component specification | Nameplate/datasheet copy not included |
| Motor power | 1,000 W | Reported component specification | Source describes maximum/rated power inconsistently |
| Motor current | 25 A | Reported component specification | 48 V × 25 A gives 1,200 W electrical input arithmetically |
| Motor speed | 3,000 RPM | Reported component specification | Operating-point trace not included |
| Motor mass | 4.531 kg | Reported component specification | |
| Motor torque | 3.18 N·m | Derived nominal value | From 1,000 W at 3,000 RPM; not a dynamometer result |
| Battery arrangement | 4 × 12 V, 28 Ah in series | Reported configuration | Nominal 48 V, 28 Ah |
| Nominal battery energy | 1,344 Wh | Derived nominal value | 48 V × 28 Ah; not usable-energy measurement |
| Controller | 48 V sine-wave controller | Reported component description | Exact model/rating not established in the report |
| Transmission | Four-speed manual gearbox | Physical configuration | Detailed ratios not supplied |

## Performance claims from the report

| Claim | Source-report value | Evidence classification | What is required before calling it measured/validated |
|---|---:|---|---|
| Maximum speed | 90.6 km/h | Historically reported / source calculation | Calibrated GPS or wheel-speed trace, motor RPM, tyre circumference, gearbox and final-drive ratios |
| Single-charge range | Approximately 90 km | Calculation-derived / historically reported | Route, payload, battery condition, start/end SOC, voltage/current logs, cut-off condition and repeated trials |
| Motor efficiency | 83.2% | Rating-derived calculation | Simultaneous calibrated DC input and shaft-output measurements |
| Motor torque | 3.18 N·m | Derived from nominal power and speed | Dynamometer curve |
| Gear speeds | 27.26 / 50.34 / 73.41 / 90.6 km/h | Source-report calculations | The source report states a 2 m wheel diameter in the speed discussion; this is inconsistent with the tabulated speeds and prevents reproduction |
| Dynamometer testing | Mentioned in abstract | Not established by raw data in the supplied thesis | Dynamometer file, calibration, test conditions, sample rate, torque/RPM trace and report |
| Ten-point DVP | Test procedures described | Procedure list, not a completed results matrix | Dated test results, pass/fail criteria, instruments and observations |
| Ignition-command latency | 184.26 ms (later project claim) | Author-reported, not produced by this web UI | Firmware version, event timestamps, sample count, latency distribution and raw logs |
| UI speed / SOC / load | Generated at runtime | Synthetic demo data | Not a vehicle measurement; no hardware source exists in this repository |

## Calculation checks

### Nominal motor torque

\[
\omega = \frac{2\pi N}{60}
       = \frac{2\pi(3000)}{60}
       \approx 314.16\ \text{rad/s}
\]

\[
T = \frac{P}{\omega}
  = \frac{1000}{314.16}
  \approx 3.18\ \text{N·m}
\]

This is a nominal calculation. Actual motor torque varies with speed, current, controller limits and thermal conditions.

### Nominal battery energy

\[
E_{\mathrm{nominal}} = 48\ \text{V}\times 28\ \text{Ah}
= 1344\ \text{Wh}
\]

This does not account for lead-acid rate effects, voltage sag, depth-of-discharge limits, ageing, temperature or controller cut-off.

### Rating-based efficiency ratio

The report uses:

\[
P_{\mathrm{electrical}}=48\times25=1200\ \text{W}
\]

and a mechanical output value of approximately 999.02 W from the nominal torque and speed. The ratio is:

\[
\eta_{\mathrm{derived}}=\frac{999.02}{1200}\times100
\approx83.25\%
\]

The report rounds this to 83.2%. Since the inputs are ratings/calculations rather than simultaneous measurements, this should be described as a **rating-based efficiency estimate**, not measured efficiency.

## Range-calculation limitation

The supplied report's range derivation is not dimensionally or physically adequate for a validated vehicle-range result. In particular, the road-load calculation does not clearly use complete vehicle-plus-rider mass, the aerodynamic area is based on motor dimensions rather than vehicle frontal area, and the sum of forces is used in a power/range calculation without a consistent force–velocity–energy chain. The reported approximately 90 km value therefore remains a historical calculation claim, not a verified range test.

A corrected range model should start from a defined drive cycle or route and include vehicle-plus-rider mass, rolling resistance, aerodynamic drag, road gradient, acceleration, drivetrain efficiency, battery discharge limits and actual usable battery energy. A physical validation requires voltage/current/SOC logging.

## Evidence vocabulary

Use these terms consistently:

- **Specification:** value reported for a selected component.
- **Calculated / derived:** value obtained from stated equations and assumptions.
- **Simulated:** output from a numerical model or the local web demo.
- **Reported:** value stated in the original report without enough raw data to reproduce it.
- **Measured:** recorded by an identified instrument using a documented method.
- **Validated:** measured or simulated result checked against an independent reference, with appropriate error/uncertainty analysis.

No claim in this register is promoted to measured or independently validated unless the required raw evidence is added.
