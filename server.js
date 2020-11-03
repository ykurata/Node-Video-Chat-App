const express = require("express");
const app = express();
//This allows to create a server to be used with socket io.
const server = require('http').Server(app)
// Pass server to the return of this require function. 
// Socket.io knows what server we are using and how to interact with that.
const io = require("socket.io")(server);

server.listen(3000);