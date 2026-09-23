// Recorded controller values from Leon’s calibrated machine export.
// Optical watts, practical power limits, lens, air pressure and Z hardware are not inferred.
export const studioProfilePatch = {
  "controller": "Ruida",
  "widthMm": 400,
  "heightMm": 400,
  "xMaxSpeed": 500,
  "yMaxSpeed": 400,
  "xAcceleration": 8000,
  "yAcceleration": 2000,
  "xStepLengthUm": 3.178801,
  "yStepLengthUm": 3.182771,
  "source": "co2-glass",
  "machineSettings": {
    "sourceFile": "laser-axis-calibrated.lbset",
    "controller": "Ruida",
    "startSpeed": 10,
    "idleSpeed": 100,
    "cuttingAcceleration": 2000,
    "xMaxAcceleration": 10000,
    "yMaxAcceleration": 3000,
    "laser1MinPercent": 1,
    "laser1MaxPercent": 99,
    "laser1FrequencyHz": 20000,
    "airAssistOutputEnabled": true,
    "waterProtectionEnabled": false,
    "doorProtectionEnabled": false,
    "rotaryEnabled": false,
    "multiTubeEnabled": false,
    "sourceSha256": "476d70379ec8810f7c9c7e19bc93e8bdfdfa488a1f31d012e77531befe89a5b9"
  }
};
