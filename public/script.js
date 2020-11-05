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
  // Allow ourselves to connect to ohter users
  socket.on('user-connnected', userId => {
    connectToNewUser(userId, stream);
  });
})

// Connect to this peer server.
// As soon as we conect to peer server and get back on ID, we want to run this code.

myPeer.on('open', id => {
  socket.emit("join-room", ROOM_ID, id);  // We pass the userId whenever we actually join
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call();
  // Call a user that we give a certain ID. Sending the userId and sending them ouer video 
  // and audio stream.
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {   // Taking stream from other user we are calling,
    addVideoStream(video, userVideoStream);  // and adding it into our own custom video element on our page.
  });
  call.on('close', () => {
    video.remove();
  })
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}
