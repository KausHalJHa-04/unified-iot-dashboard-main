const mqtt = require("mqtt");
const Device = require("../models/Device");
const Telemetry = require("../models/Telemetry");
const { emitTelemetry } = require("../socket/socketHandler");

setInterval(async () => {
  const offlineLimit = new Date(Date.now() - 15000); // 15 sec

  await Device.updateMany(
    { lastActive: { $lt: offlineLimit } },
    { status: "offline" }
  );
}, 5000);

const brokerUrl = process.env.MQTT_BROKER_URL || "mqtt://broker.hivemq.com:1883";

// Connect MQTT
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("MQTT Connected");

  // Subscribe all device telemetry
  client.subscribe("iot/devices/+/telemetry");
});

// Message Handler
client.on("message", async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    const {
      deviceId,
      deviceType,
      metric,
      value,
      unit,
      location,
      timestamp
    } = payload;

    // 1. Auto register device
    let device = await Device.findOne({ deviceId });

    if (!device) {
      device = await Device.create({
        deviceId,
        name: deviceId,
        type: deviceType,
        location,
        status: "online",
        lastActive: new Date()
      });
    } else {
      device.status = "online";
      device.lastActive = new Date();
      await device.save();
    }

    // 2. Save telemetry
    const telemetry = await Telemetry.create({
      deviceId,
      metric,
      value,
      unit,
      timestamp: new Date(timestamp)
    });

    // 3. Emit real-time to frontend
    emitTelemetry({
      deviceId,
      metric,
      value,
      unit,
      timestamp
    });

    console.log("Telemetry saved:", deviceId, value);
  } catch (error) {
    console.error("MQTT Message Error:", error.message);
  }
});
