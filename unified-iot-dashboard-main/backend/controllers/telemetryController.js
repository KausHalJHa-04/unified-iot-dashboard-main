const Telemetry = require("../models/Telemetry");

// Latest telemetry
exports.getLatestTelemetry = async (req, res) => {
  const data = await Telemetry.find()
    .sort({ timestamp: -1 })
    .limit(50);

  res.json(data);
};

// Device telemetry
exports.getDeviceTelemetry = async (req, res) => {
  const data = await Telemetry.find({
    deviceId: req.params.deviceId
  }).sort({ timestamp: -1 });

  res.json(data);
};
