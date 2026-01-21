require("dotenv").config();

// Fallback for MONGODB_URI if not set in .env
if (!process.env.MONGODB_URI) {
  console.warn("Warning: MONGODB_URI is not defined. Defaulting to mongodb://localhost:27017/iot-dashboard");
  process.env.MONGODB_URI = "mongodb://localhost:27017/iot-dashboard";
}

// Ensure MONGO_URI is also set, in case config/db.js uses that variable name instead
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI = process.env.MONGODB_URI;
}

const express = require("express");
const cors = require("cors");
const http = require("http");
const startPublisher = require("./publisher");
const connectDB = require("./config/db");

const { initSocket } = require("./socket/socketHandler");

// MQTT
require("./mqtt/subscriber");

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "*",
  methods: ["GET","POST"]
}));

app.use(express.json());


connectDB();


app.use("/api/devices", require("./routes/deviceRoutes"));
app.use("/api/telemetry", require("./routes/telemetryRoutes"));


initSocket(server);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);

  // AUTO START MQTT SIMULATOR (FREE DEPLOY SOLUTION)
  if (process.env.ENABLE_SIMULATOR === "true") {
    startPublisher();
  }
});
