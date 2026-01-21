const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceId: String,
    name: String,
    type: String,
    location: String,
    status: {
      type: String,
      default: "offline",
    },
    lastActive: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Device", deviceSchema);
