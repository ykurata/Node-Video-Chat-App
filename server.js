const express = require("express");
const app = express();
const { v4: uuidV4 } = require("uuid");

//This allows to create a server to be used with socket io.
const server = require('http').Server(app)
// Pass server to the return of this require function. 
// Socket.io knows what server we are using and how to interact with that.
const io = require("socket.io")(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render('room', { roomId: req.params.room });
})

server.listen(3000);