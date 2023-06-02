// Handle all socket logic here

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
    });

    return io;
}

module.exports = { initIO }