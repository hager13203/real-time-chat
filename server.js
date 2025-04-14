// const path = require("path");
// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// app.use(express.static(path.join(__dirname, "/public")));
// const PORT = process.env.PORT || 7000;

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

// io.on("connection", (socket) => {
//   socket.on("newuser", function (username) {
//     socket.broadcast.emit("update", username + " joined the conversation");
//   });
//   socket.on("exituser", function (username) {
//     socket.broadcast.emit("update", username + " left the conversation");
//   });
//   socket.on("chat", function (message) {
//     socket.broadcast.emit("chat", message);
//   });
// });

// app.listen(PORT, () => {
//   console.log("http://localhost:" + PORT);
// });
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// Route for index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Socket events
io.on("connection", (socket) => {
  socket.on("newuser", function (username) {
    socket.broadcast.emit("update", username + " joined the conversation");
  });

  socket.on("exituser", function (username) {
    socket.broadcast.emit("update", username + " left the conversation");
  });

  socket.on("chat", function (message) {
    socket.broadcast.emit("chat", message);
  });
});

// Start server
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
