const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
  deviceId: String,
  metric: String,
  value: mongoose.Schema.Types.Mixed,
  unit: String,
  timestamp: Date,
});

module.exports = mongoose.model("Telemetry", telemetrySchema);
