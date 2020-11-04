// connect to root path
const socket = io("/");
const myPeer = new Peer(undefined, {  // Pass id === undefined because we generate an Id 
  host: '/',
  port: '3001',
});

// Connect to this peer server.
// As soon as we conect to peer server and get back on ID, we want to run this code.

myPeer.on('open', id => {
  socket.emit("join-room", ROOM_ID, id);  // We pass the userId whenever we actually join
});

// Listen to the event.
socket.on('user-connected', userId => {
  console.log('User connected: ' + userId);
})