const router = require("express").Router();
const {
  getDevices,
  getDeviceById
} = require("../controllers/deviceController");

router.get("/", getDevices);
router.get("/:id", getDeviceById);

module.exports = router;
