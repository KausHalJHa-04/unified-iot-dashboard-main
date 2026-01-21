const router = require("express").Router();
const {
  getLatestTelemetry,
  getDeviceTelemetry
} = require("../controllers/telemetryController");

router.get("/", getLatestTelemetry);
router.get("/:deviceId", getDeviceTelemetry);

module.exports = router;
