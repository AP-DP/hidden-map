// Handle all multiuser actions
const socket = io('ws://localhost:8080');

function getSocket() {
    return socket;
}

socket.on("test-event", () => {
    console.log("Testing server to client event");
})

socket.on("mouse", (data) => {
    sketch.collabDraw(data);
})

function sendMessage(msgName, msgBody) {
    socket.emit(msgName, msgBody);
}