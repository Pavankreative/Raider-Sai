# RAIDER SAI
### A 48 V electric-motorcycle retrofit with a four-speed manual transmission

A student-led physical EV conversion project, followed by a separate browser-based supervisory-interface demonstration. The work combined mechanical integration, chain-drive iteration, workshop fabrication and a later ESP32/BLE control concept.

<p align="center">
  <img src="docs/images/raider-sai-prototype.jpg" alt="RAIDER SAI electric motorcycle prototype" width="82%">
</p>

<p align="center">
  <strong>Physical prototype:</strong> February–April 2023 &nbsp;·&nbsp;
  <strong>Team:</strong> 7 members &nbsp;·&nbsp;
  <strong>Project lead:</strong> Pavan Kumar Karsinapu
</p>

> [!IMPORTANT]
> **This repository contains two different deliverables.** The 2023 motorcycle retrofit was physically assembled and photographed. The React application in this repository is a later **simulation-only interface**: its speed, state-of-charge and load values are generated locally. It does not connect to an ESP32, BLE device, ignition relay, motor controller or vehicle. Do not use the interface to operate a vehicle.

---

## Project at a glance

| Item | Project record |
|---|---|
| Project name | RAIDER SAI |
| Original academic project title | Design, Fabrication and Analysis of Electric Bike with 4-Speed Gear System |
| Physical build period | February–April 2023 |
| Project team | 7 mechanical-engineering students |
| My role | Project originator and lead engineer; primary technical ownership from concept through publication and subsequent development |
| Vehicle architecture | Existing two-wheeler platform converted to electric traction |
| Traction motor | 48 V, 1,000 W BLDC motor; 3,000 RPM rated speed |
| Battery bank | Four 12 V, 28 Ah batteries in series — nominal 48 V, 28 Ah |
| Transmission | Four-speed manual motorcycle gearbox retained/integrated |
| Final-drive development | Three chain/sprocket configurations documented |
| Later digital work | React/TypeScript supervisory-interface simulation; ESP32/BLE concept documented separately |

The original project thesis is a 62-page academic report. It documents the component specifications, three drivetrain iterations, calculations and photographs of the prototype and workshop work. The thesis also contains calculation and evidence limitations; these are stated explicitly in this repository rather than being presented as verified vehicle-performance data.


## My contribution and project ownership

I originated RAIDER SAI and carried the primary engineering work from the initial idea through the published project report and later development. My work covered:

- **Concept and research:** Identified the conversion concept, investigated the electric traction architecture and evaluated the motor, battery, controller and transmission arrangement.
- **System design:** Developed the mechanical system concept and the integration approach for the 48 V BLDC traction system with the retained four-speed motorcycle gearbox.
- **Theory and calculations:** Prepared the engineering formulations and calculations used in the project, including motor power/torque, battery energy, drivetrain and vehicle-performance estimates. The calculation register records which source calculations remain unreconciled or unvalidated.
- **Drivetrain development:** Investigated the first two chain-drive configurations, analysed the problems encountered during speed transfer and gear changes, and developed the final documented sprocket arrangement.
- **Testing and optimisation:** Planned and led the project-level evaluation and iterative improvement process. The available thesis records test procedures and selected reported outcomes, but it does not preserve a complete calibrated raw-data package; see the measurement register.
- **Documentation and publication:** Prepared the technical documentation and project reporting and developed the published IRJET paper associated with RAIDER SAI.
- **Subsequent development:** Continued the project beyond the original workshop build through the later supervisory-interface and embedded-control concept work. The current web dashboard remains a simulation-only demonstration.

The other six student team members contributed to workshop fabrication and assembly activities under my direction. Their participation is acknowledged in the published paper. This contribution description distinguishes my primary concept, design, analytical, testing, optimisation and documentation work from the team's workshop support.

## Two workstreams — keep their evidence separate

### 1. Physical electric-motorcycle retrofit (2023)

The team integrated a 48 V BLDC traction motor, battery bank and controller with a four-speed motorcycle transmission. A chain-and-sprocket arrangement was revised through three iterations after the first two configurations exposed speed-transfer and gear-shift problems.

The final documented configuration used a custom 150 mm master/driver sprocket paired with an approximately 65 mm driven sprocket. The larger sprocket was attached using a workshop welding operation. The supplied thesis records the configuration and workshop photographs; it does not provide a full manufacturing drawing, fatigue qualification or durability test report for this custom part.

### 2. Supervisory-interface demonstration (later software work)

The web application provides a visual dashboard with a speed gauge, four-speed gear estimate, simulated battery state and start/stop demonstration controls. It is useful as a UI concept and as a place to evolve the presentation layer.

It is **not** the firmware or control implementation. There is no ESP32 firmware, BLE GATT client, command protocol, relay driver, authentication implementation or hardware-in-the-loop evidence in this repository.

---

## Physical prototype gallery

<p align="center">
  <img src="docs/images/raider-sai-prototype.jpg" alt="Side view of the RAIDER SAI electric-motorcycle prototype" width="88%">
</p>
<p align="center"><em>Completed prototype documented in the original project report.</em></p>

The original thesis also includes close-up workshop photographs of the chain/sprocket and gearbox integration. The three drivetrain iterations are summarised below and in the hardware evidence register.

## System architecture

The following is a high-level representation of the physical retrofit. It is not an electrical schematic or a released wiring diagram.

<pre>
4 × 12 V, 28 Ah battery bank (series connection)
                 |
                 v
        48 V motor controller
                 |
                 v
       48 V / 1 kW BLDC motor
                 |
                 v
  Custom chain-and-sprocket interface
                 |
                 v
      Four-speed manual gearbox
                 |
                 v
             Rear wheel
</pre>

The later supervisory concept is separate:

<pre>
React / TypeScript demo UI
          |
          | simulated local state only
          v
    Demo telemetry

Proposed ESP32 firmware
          |
          | not included
          v
   Proposed BLE 4.2 link
          |
          | not implemented
          v
Proposed ignition-authorisation interface
</pre>

The software diagram describes a concept boundary, not a working physical data path.

---

## Hardware configuration

The following values are the specifications recorded in the supplied project report. They should be treated as reported component specifications, not as independent laboratory measurements.

| Subsystem | Recorded configuration | Notes |
|---|---|---|
| Traction motor | 48 V BLDC; 1,000 W; 25 A; 3,000 RPM; 4.531 kg | The 3.18 N·m value is a nominal calculation from rated power and speed |
| Battery bank | 4 × 12 V, 28 Ah batteries in series | Series connection raises voltage to 48 V; nominal capacity remains 28 Ah |
| Nominal stored energy | 48 V × 28 Ah = 1,344 Wh (1.344 kWh) | Nameplate arithmetic; usable energy depends on chemistry, discharge rate, condition and cut-off |
| Motor controller | 48 V sine-wave controller | Detailed controller model and controller rating are not established in the public report |
| Transmission | Four-speed manual motorcycle gearbox | Gear ratios and a complete transmission drawing are not included |
| Final drive | Custom chain/sprocket arrangement | Three configurations are described in the thesis |

### Basic engineering calculations

**Nominal motor torque**

For a motor operating at the stated nominal power and speed:

\[
T = \frac{P}{\omega}
  = \frac{1000}{2\pi(3000/60)}
  \approx 3.18\ \text{N·m}
\]

This is a calculation from the nominal 1 kW and 3,000 RPM specifications. It is not a recorded dynamometer torque measurement.

**Nominal battery energy**

\[
E_{\mathrm{nominal}} = V \times Ah
= 48 \times 28
= 1344\ \text{Wh}
\]

This is nominal stored energy, not a measured usable-energy discharge result.

**Rating-based efficiency estimate in the original report**

The thesis calculates 48 V × 25 A = 1,200 W electrical input and approximately 999 W mechanical output from the nominal torque/speed figures, then reports approximately 83.2%. That ratio is rating-derived. The repository does not contain simultaneous calibrated electrical-input and shaft-output measurements; therefore, it must not be described as a measured motor-efficiency test.

See docs/MEASUREMENT_REGISTER.md for the full evidence classification and calculation limitations.

---

## Drivetrain development: three documented iterations

The most useful engineering story in this project is the iterative diagnosis of the chain-drive and gearbox interface.

| Iteration | Configuration / observation in the thesis | Engineering decision |
|---|---|---|
| Case I — baseline | Two approximately 65 mm diameter, 15-tooth sprockets connected by a reported 25.5 cm chain. The configuration did not deliver the required increase in speed. | Rejected the equal-sprocket arrangement and revised the drive layout. |
| Case II — revised layout | The revised connection increased wheel rotation, but the existing gearbox did not transfer power acceptably during gear changes; the report describes the condition as unsafe. | Rejected the arrangement because the drivetrain and shift behaviour were incompatible. |
| Case III — selected configuration | A custom approximately 150 mm master sprocket was attached by welding and paired with an approximately 65 mm driven sprocket. | Adopted as the final documented prototype configuration. |

The report establishes that the team iterated the physical arrangement and fabricated a modified sprocket. It does not establish production durability, fatigue life, chain safety factor, gearbox life or compliance with a vehicle homologation standard.

---

## Performance claims and evidence status

The academic report gives performance figures, but its calculations and underlying raw records are incomplete. The table below preserves the claims while making their evidence status visible.

| Figure in the source report | How it is represented here | What is missing for validation |
|---|---|---|
| 90.6 km/h top speed | Historical report-reported result; **not independently verified in this repository** | Calibrated GPS/speed trace, timestamped raw data, tyre rolling circumference, motor RPM and actual transmission/final-drive ratios |
| Approximately 90 km single-charge range | Historical report-reported / calculation-derived claim; **not a reproducible discharge-test result** | Route and rider/load details, battery condition, start/end state of charge, energy logs, cut-off criterion and repeat runs |
| Approximately 83.2% efficiency | Rating-based calculation; **not measured efficiency** | Simultaneous calibrated DC input measurements and dynamometer torque/RPM output |
| 3.18 N·m motor torque | Nominal calculation from 1 kW at 3,000 RPM | Dynamometer curve across the operating range |
| 48 V, 28 Ah battery bank | Recorded component configuration | Battery datasheets, condition, discharge curve and usable-capacity test |
| Four gear-speed values in the thesis | Source-reported calculations only | The source gives an inconsistent wheel-diameter statement; the tabulated speeds are not reproduced as validated wheel-speed measurements |

The original report's abstract mentions dynamometer testing, and its testing chapter gives procedures for speed, range, braking, acceleration and hill-climb checks. The supplied thesis does not include the corresponding raw dynamometer traces, calibrated instrument records or a complete numerical ten-test result matrix. A proposed test procedure is not evidence that each test was completed.

**Do not cite the 90 km range or 90.6 km/h result as independently measured or validated unless the original raw test records are recovered.**

---

## Supervisory-interface demo

The checked-in application is a front-end demonstration built with:

- React 18 and TypeScript
- Vite
- Tailwind CSS
- shadcn/ui / Radix UI components
- Lucide icons
- Capacitor configuration (native Android/iOS project output is not included)

### Current behaviour

| Display / control | Current implementation |
|---|---|
| Start / stop | Toggles local demo state only |
| Speed gauge | Locally generated demonstration speed |
| Battery state | Simulated state-of-charge value; not read from a battery monitor |
| Gear | Four-speed display estimate derived from simulated speed; does not shift the physical gearbox |
| Current / temperature | Not sourced from physical sensors; do not interpret as vehicle telemetry |
| BLE / ESP32 | No connection or firmware implementation in this repository |
| Ignition relay | Not controlled by the application |

### Run locally

Prerequisites: Node.js and npm.

<pre>
npm ci
npm run dev
</pre>

Open the local URL printed by Vite.

### Quality checks

<pre>
npm run lint
npm run build
npx tsc --noEmit -p tsconfig.app.json
</pre>

These commands verify the web project only. They do not verify the physical motorcycle, electrical safety, firmware, BLE communication or vehicle performance.

---

## Repository structure

<pre>
Raider-Sai/
├── README.md
├── index.html
├── package.json
├── vite.config.ts
├── capacitor.config.ts
├── docs/
│   ├── CONTROL_INTERFACE.md
│   ├── HARDWARE_PROOF.md
│   ├── MEASUREMENT_REGISTER.md
│   ├── VERIFICATION.md
│   └── images/
│       └── raider-sai-prototype.jpg
└── src/
    ├── components/
    │   ├── BikeControls.tsx
    │   ├── SpeedGauge.tsx
    │   ├── BatteryIndicator.tsx
    │   └── ui/
    ├── pages/
    ├── hooks/
    └── lib/
</pre>

---

## Limitations and next engineering steps

The original prototype is a student-built retrofit, not a certified road vehicle or a production-ready EV platform. The current public software is a UI simulation, not a safety controller.

Work required before stronger performance or safety claims can be made:

1. Recover the actual gearbox ratios, sprocket tooth counts, tyre rolling circumference and motor operating data; reconcile the speed calculation.
2. Rebuild the road-load and range model using complete vehicle-plus-rider mass, tyre rolling resistance, frontal area, drag coefficient, gradient, drivetrain efficiency, battery discharge limits and actual usable battery energy.
3. Conduct a repeatable range test with calibrated voltage/current logging and a defined state-of-charge end point.
4. Record speed and acceleration with a calibrated GPS/data logger and synchronised motor-RPM measurement.
5. Document the chain, sprocket, shaft, mounts and gearbox loads; perform appropriate strength, fatigue, alignment and retention checks before further road use.
6. If the supervisory concept is resumed, define the firmware state machine, BLE service/characteristics, message validation, authentication, acknowledgement, watchdog and loss-of-communications behaviour. Keep a physical emergency isolation path independent of the app.
7. Perform hardware-in-the-loop and controlled vehicle tests before claiming any safety function.

No firmware, hardware-control path or safety certification is claimed by this repository.

## Publication

**Published project paper**

Pavankumar Karsinapu, “Design and Performance Evaluation of an Electric Bike Integrated with a 4-Speed Manual Transmission System,” *International Research Journal of Engineering and Technology (IRJET)*, Vol. 12, Issue 6, June 2025.

[Read the published paper (IRJET PDF)](https://www.irjet.net/archives/V12/i6/IRJET-V12I6141.pdf)

This is the published article associated with the project. Other manuscripts are not represented here as accepted or peer-reviewed unless their publication status is independently confirmed.

## Acknowledgement and attribution

The physical retrofit was completed by a seven-member student team at Nova College of Engineering and Technology, affiliated to JNTU Kakinada. Pavan Kumar Karsinapu is identified as the team leader in the original project report. The report acknowledges project guidance from the department faculty.

The photographs in docs/images/ are cropped from the supplied project-report photographs. They are included to document the physical prototype and drivetrain installation, not to imply instrument calibration or performance validation.

## Licence

No open-source licence is currently provided. Unless a licence is added, reuse, redistribution and derivative works are not granted by this repository.
