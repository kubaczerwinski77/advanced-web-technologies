const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { Events } = require("./events/events");

const HOSTNAME = "localhost";
const PORT = 3001;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const serverData = {
  users: {},
  messages: [{}],
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on(Events.SET_NAME, (data) => {
    console.log(`User ${socket.id} set name to ${data.name}`);
    serverData.users[socket.id] = {
      name: data.name,
      socketId: socket.id,
    };
  });

  socket.on(Events.SEND_MESSAGE, (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
    socket.broadcast.emit(Events.RECEIVE_MESSAGE, {
      message: data,
      name: serverData.users[socket.id].name,
    });
  });

  socket.on(Events.USER_TYPING, () => {
    console.log(`User ${socket.id} is typing`);
    socket.broadcast.emit(Events.USER_TYPING, {
      name: serverData.users[socket.id].name,
      socketId: socket.id,
    });
  });

  socket.on(Events.USER_STOPPED_TYPING, () => {
    console.log(`User ${socket.id} stopped typing`);
    socket.broadcast.emit(Events.USER_STOPPED_TYPING, {
      name: serverData.users[socket.id].name,
      socketId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
