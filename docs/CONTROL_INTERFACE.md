# Supervisory-interface boundary

## Purpose

The React application in this repository is a **visual demonstration** of a possible rider/supervisory interface for RAIDER SAI. It is not the 2023 motorcycle controller and it is not connected to a physical vehicle.

## What the current code implements

- Local start/stop demo state.
- Locally generated speed values.
- A simulated state-of-charge ring that decreases while the demo runs.
- A four-speed gear estimate derived from the simulated speed.
- Static project reference values such as nominal system voltage, motor rating and gearbox count.

These values are generated or displayed locally. They are not read from a CAN bus, BLE peripheral, ESP32, battery-management system, current sensor, Hall sensor or motor controller.

## What is not implemented

- ESP32 firmware or firmware build instructions.
- BLE scanning, pairing, GATT service/characteristic definitions or reconnect logic.
- Command framing, validation, acknowledgements or replay protection.
- Ignition relay driver or electrical isolation design.
- State-machine interlocks, watchdog or loss-of-communications handling.
- Physical sensor acquisition or hardware-in-the-loop testing.
- Verified command latency, actuation reliability or functional-safety evidence.

The later project history describes an ESP32, BLE 4.2, battery-voltage divider, Hall-effect wheel-speed sensor and ignition-authorisation concept. Those descriptions do not mean that the hardware-control path is present in this repository.

## Intended architecture if the hardware project is resumed

<pre>
Mobile / web interface
        |
        | authenticated, versioned commands
        v
BLE transport layer
        |
        v
ESP32 supervisory state machine
        |
        | validated request + interlock checks
        v
Independent ignition-authorisation interface
        |
        v
Vehicle controller / propulsion enable
</pre>

This is a design concept only. It must not be interpreted as an implemented or safety-approved architecture.

## Minimum engineering work before real actuation

1. Define the threat model, electrical boundary and fail-safe state.
2. Specify BLE services, characteristics, message schema, sequence numbers, timeout and acknowledgement behaviour.
3. Implement a deterministic firmware state machine with explicit guards and a hardware watchdog.
4. Define sensor plausibility checks, undervoltage/overvoltage thresholds and stale-data handling from verified component limits.
5. Ensure loss of BLE, reboot, brownout and malformed messages cannot cause unintended propulsion enable.
6. Keep emergency isolation independent of the phone and web interface.
7. Perform bench, HIL and controlled vehicle tests with archived firmware versions, raw logs and test procedures.

A mobile interface or a successful BLE packet exchange alone is not proof of vehicle safety.
