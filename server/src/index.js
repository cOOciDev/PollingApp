const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const adminRoutes = require("./routes/admin.routes");
const pollRoutes = require("./routes/poll.routes");
const pollManager = require("./models/PollManager");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/poll", pollRoutes);

// Socket.IO for real-time updates
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Client will emit 'subscribe' with groupName to get updates
  socket.on("subscribe", (groupName) => {
    socket.join(groupName);
    // Send current polls immediately
    const polls = pollManager.getPolls(groupName) || [];
    socket.emit("polls", polls);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// When polls update, notify sockets in group room
pollManager.on("pollUpdated", (groupName) => {
  const polls = pollManager.getPolls(groupName);
  io.to(groupName).emit("polls", polls);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
