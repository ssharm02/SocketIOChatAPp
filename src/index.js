const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// let count = 0;

//server (emit) => client(recieve) - countupdated
//client (emit)-> server(recieves) - increment
io.on("connection", socket => {
  console.log("New web socket connection");

  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined");
  socket.on("sendMessage", message => {
    io.emit("message", message);
  });

  socket.on("sendLocation", coords => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  });

  socket.on("disconnect", () => {
    //send message to all connected members
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  //callback function
  console.log(`Server is up on port ${port}!`);
});

//send event via server
//   socket.emit("countUpdated", count);

//   socket.on("increment", () => {
//     count += 1;
//     //update event to every single connection
//     //socket.emit emits to only one connection
//     io.emit("countUpdated", count);
//   });
