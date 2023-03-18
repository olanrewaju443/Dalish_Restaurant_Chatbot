const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const logger = require("./logger/logger");

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { maxAge: 24 * 60 * 60 * 1000 * 14 },
});

app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const botResponse = require("./Schedules/botResponse");
const SessionData = require("./Schedules/sessionData");

let socketRoom = {};

io.on("connection", (socket) => {
  console.log("a user is connected");
  const session = socket.request.session;
  let sessionData;

  //connection from different tabs

  if (socketRoom[session.id]) {
    socketRoom[session.id].sessionMessages.forEach((message) => {
      //update this
      socket.emit("chat message", message);
    });
    sessionData = socketRoom[session.id];
    socket.join(session.id);
  } else {
    sessionData = new SessionData(session, io);
    socketRoom[session.id] = sessionData;
    socket.join(session.id);
    botResponse.response(null, sessionData);
  }

  socket.on("chat message", function (msg) {
    if (sessionData.currentNode.index === "greeting") {
      botResponse.response(msg, sessionData);
      botResponse.response(null, sessionData);
    } else {
      botResponse.response(msg, sessionData);
    }

    //if currentNode has no child node, go back to start node
    if (!Object.keys(sessionData.currentNode.children).length) {
      sessionData.currentNode = sessionData.navigationTree.start;
      sessionData.listStartIndex = 0;
      io.to(session.id).emit(
        "chat message",
        botResponse.response(null, sessionData)
      );
    }
  });

  socket.on("disconnect", () => {
    console.log('user is disconnected');
    //saving sessionData to db and disconnecting tab
    if (!io.sockets.adapter.rooms.get(session.id)) {
      session.userName = sessionData.userName;
      session.orders = sessionData.orders;
      session.save();
      logger.info({
        userID: session.id,
        messages: sessionData.sessionMessages,
      });
      //clears session data 10 seconds affter disconnection - so that refresh wont clear data
      setTimeout(() => {
        if (!io.sockets.adapter.rooms.get(session.id)) {
          delete socketRoom[session.id];
          console.log("sessionData deleted");
        }
      }, 5000);
    }
  });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
