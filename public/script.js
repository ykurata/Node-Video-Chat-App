// connect to root path
const socket = io("/");
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {  // Pass id === undefined because we generate an Id 
  host: '/',
  port: '3001',
});
const myVideo = document.createElement('video');
myVideo.muted = true;  // Mute my own video

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {  // Promise. Pass stream
  addVideoStream(myVideo, stream)
})

// Connect to this peer server.
// As soon as we conect to peer server and get back on ID, we want to run this code.

myPeer.on('open', id => {
  socket.emit("join-room", ROOM_ID, id);  // We pass the userId whenever we actually join
});

// Listen to the event.
socket.on('user-connected', userId => {
  console.log('User connected: ' + userId);
});

function addVideoStream(video, stream) {
  video.arcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
  videoGrid.append(video);
}