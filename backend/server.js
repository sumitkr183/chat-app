const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { Server } = require("socket.io");

dotenv.config();

dbConnection(); // Connect MongoDB Database

app.use(cors()); // fix cors error
app.use(express.json()); // allow accept json data

const PORT = process.env.PORT || 6000; // set default PORT

var clients = [];

app.get("/", (req, res) => {
  res.send("Application is running...");
});

/**
 * Routes for users API
 * Ex- login, register, forget-password etc
 */
app.use("/api/user", userRoutes);

/**
 * Routes for chats API
 * Ex- create chat, group, add member etc
 */
app.use("/api/chat", chatRoutes);

/**
 * Routes for messages API
 * Ex- send message personal, groups
 */
app.use("/api/message", messageRoutes);

/**
 * Start Node Server
 */
const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("user connect", (userData) => {
    socket.join(userData._id);
    socket.userConnected = userData;

    clients.push(userData._id);

    console.log("new connection: ", userData);

    io.emit("user connected", clients);

    socket.on("disconnect", () => {
      clients = clients.filter(
        (client) => client !== socket?.userConnected?._id
      );

      console.log(clients, "client");

      io.emit("user disconnected", clients);
    });
  });

  socket.on("join chat", (chat) => {
    socket.join(chat);
    console.log("User Joined Chat: " + chat);
  });

  socket.on("typing", (chat) => socket.in(chat).emit("typing"));
  socket.on("stop typing", (chat) => socket.in(chat).emit("stop typing"));

  socket.on("new message", (message) => {
    let chat = message.chat;

    socket.in(chat).emit("message received", message);

    // message.users.forEach((user) => {
    //   if (user._id == message.sender._id) return;

    //   socket.in(user._id).emit("message received", message);
    // });
  });
});
