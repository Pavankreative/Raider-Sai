# Supervisory interface boundary

The public application is a **simulation demo**. Local state represents start/
stop, speed, battery and a gear estimate. It is not an ESP32 firmware release.
The original mechanical transmission has four gears; the demo now caps its
estimate at four instead of displaying a nonexistent fifth gear.

The intended later architecture is mobile UI → BLE transport → ESP32 supervisory
logic → an appropriately designed ignition-authorisation interface. Firmware,
GATT definitions, message framing, acknowledgement, state-transition guards,
reconnect behaviour, loss-of-communication behaviour and physical test records
must be supplied before claiming implemented end-to-end control.

Reported hardware latency is separate from browser rendering or timer intervals.
Record the command origin and relay-response measurement points, clock alignment,
number of trials, firmware revision and latency distribution. Mean latency alone
is not evidence of fail-safe behaviour or actuation reliability.

This change does not introduce real ignition commands or certify vehicle control.
