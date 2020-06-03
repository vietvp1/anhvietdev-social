require('dotenv').config();
process.setMaxListeners(30);
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
const http = require('http')
const path = require('path');
const socketio= require('socket.io')
const events = require('events');
const configApp = require('./config/app')
events.EventEmitter.defaultMaxListeners = configApp.app.max_event_listeners;
const server = http.createServer(app)
const io = socketio(server);
const {socketAuth} = require('./config/socketAuth')

const {connectDB} = require('./config/db');
const initRoutes = require('./routes/web');
const initSockets = require('./sockets/index')

app.use(express.json({ extended: false }));
connectDB();
initRoutes(app);

app.use('/uploads', express.static("uploads"));
app.use('/client/public', express.static("client/public"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//config socketio
socketAuth(io);
initSockets(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {console.log(`Server start at port ${port}`)}) 