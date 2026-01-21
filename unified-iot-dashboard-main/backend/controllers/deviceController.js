const Device = require("../models/Device");

// Get all devices
exports.getDevices = async (req, res) => {
  const devices = await Device.find().sort({ createdAt: -1 });
  res.json(devices);
};

// Get single device
exports.getDeviceById = async (req, res) => {
  const device = await Device.findOne({ deviceId: req.params.id });

  if (!device)
    return res.status(404).json({ message: "Device not found" });

  res.json(device);
};
