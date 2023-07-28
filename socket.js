// Handle all socket logic here

let users = {};
let lastUsedID = 1;

/**
 * Set up io object
 * @param {Object} HTTP Server
 */
function initIO(server) {
    // Set up socket.io
    io = require('socket.io')(server, {
        cors: {origin: "*"}
    })

    //Handle connection
    io.on('connection', (socket) => {
        console.log('a user connected: ' + socket.id);
        io.emit("new-user", socket.id);
        for (const [key, value] of Object.entries(users)) {
            console.log(key);
            socket.emit("new-user", key);
        }
        users[socket.id] = lastUsedID;
        lastUsedID++;
        socket.emit("test-event");
        socket.on('mouse', (data) => {
            socket.broadcast.emit('mouse', data);
        })
    });

    return io;
}

module.exports = { initIO }