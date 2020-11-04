// connect to root path
const socket = io("/");
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001',
});

socket.emit("join-room", ROOM_ID, 10);

// Listen to the event.
socket.on('user-connected', userId => {
  console.log('User connected: ' + userId);
})