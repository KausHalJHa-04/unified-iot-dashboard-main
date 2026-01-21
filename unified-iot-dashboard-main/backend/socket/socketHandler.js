let io;

const initSocket = (server) => {
  const socketIO = require("socket.io");

  io = socketIO(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

// Emit telemetry to frontend
const emitTelemetry = (data) => {
  if (io) {
    io.emit("telemetry-update", data);
  }
};

module.exports = { initSocket, emitTelemetry };
