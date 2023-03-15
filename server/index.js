const Joi = require("joi");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
require("dotenv").config({ path: path.join(__dirname, ".env") });

var cors = require("cors");
const app = express();

const options = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true,
  allowedHeaders: "Content-Type, Accept",
};
app.use(cors(options));

const server = http.createServer(app);
const io = new Server(server, {
  cors: options,
});

app.use(express.json());
app.use(cookieParser());
app.use("/", require("./apis/routes/userRoutes.js"));
app.use("/influencer/", require("./apis/routes/influencerRoutes.js"));
app.use(
  "/entrepreneurprofile/",
  require("./apis/routes/entrepreneurRoutes.js")
);
app.use("/buisnessprofile/", require("./apis/routes/buisnessRoutes.js"));
app.use("/scrapper/", require("./apis/routes/scrappingRoutes.js"));
app.use("/newsletter/", require("./apis/routes/newsletterRoutes.js"));
app.use("/connections/", require("./apis/routes/connectionroutes.js"));

app.use("/group/", require("./apis/routes/groupRoutes.js"));
app.use("/chat", require("./apis/routes/chatRoutes.js"));
app.use("/message", require("./apis/routes/messageRoutes.js"));
// app.use("/admin", require('./apis/routes/admin.router'));

// app.use(function (req, res, next) {

//     // UI port you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4100');
//     next();
// });

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Connected to MongoDb"))
  .catch((e) => console.error("Could not connect to mongodb", e));

//Run when client connects
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
  // console.log(socket.id)

  // socket.on("disconnect",()=>{
  //   console.log('user disconnected',socket.id)
  // })
});

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Listening to port ${port}`));
