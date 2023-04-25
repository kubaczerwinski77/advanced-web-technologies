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

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on(Events.SET_NAME, (data) => {
    console.log(`User ${socket.id} set name to ${data.name}`);
    serverData.users[socket.id] = {
      name: data.name,
      socketId: socket.id,
    };
  });

  socket.on(Events.USER_JOINED, (room) => {
    console.log(`User ${socket.id} joined room ${room}`);
    socket.join(room);
    socket.to(room).emit(Events.USER_JOINED, {
      name: serverData.users[socket.id].name,
      date: new Date().toISOString(),
      message: `${serverData.users[socket.id].name} joined the room`,
      socketId: socket.id,
    });
  });

  socket.on(Events.USER_LEFT, (room) => {
    console.log(`User ${socket.id} left room ${room}`);
    socket.to(room).emit(Events.USER_LEFT, {
      name: serverData.users[socket.id].name,
      date: new Date().toISOString(),
      message: `${serverData.users[socket.id].name} left the room`,
      socketId: socket.id,
    });
    socket.leave(room);
  });

  socket.on(Events.SEND_MESSAGE, (data) => {
    console.log({ data });
    console.log(`Message from ${socket.id}: ${data}`);
    socket.to(data.room).emit(Events.RECEIVE_MESSAGE, {
      name: serverData.users[socket.id].name,
      date: data.date,
      message: data.message,
      socketId: socket.id,
      type: data.type,
    });
  });

  socket.on(Events.USER_TYPING, (room) => {
    console.log(`User ${socket.id} is typing`);
    socket.to(room).emit(Events.USER_TYPING, {
      name: serverData.users[socket.id].name,
      socketId: socket.id,
    });
  });

  socket.on(Events.USER_STOPPED_TYPING, (room) => {
    console.log(`User ${socket.id} stopped typing`);
    socket.to(room).emit(Events.USER_STOPPED_TYPING, {
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
