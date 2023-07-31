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
        let socketID = socket.id;
        // Register new connection
        console.log('a user connected: ' + socketID);
        io.emit("new-user", socketID);
        // Alert existing users about new connection
        for (const [key, value] of Object.entries(users)) {
            console.log(key);
            socket.emit("new-user", key);
        }
        // After alerting existing users, update user tracker
        users[socketID] = lastUsedID;
        lastUsedID++;
        // Mouse data event
        socket.on('mouse', (data) => {
            socket.broadcast.emit('mouse', data);
        })
        // Remove user after they disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Make a new object with all users but the one that disconnected
            // Avoid editing teh object directly
            let userkeys = Object.keys(users);
            let remainingUserKeys = userkeys.filter((userID) => {
                return userID !== socketID;
            });
            let remainingUsers = {};
            for (let i=0; i < remainingUserKeys.length; i++) {
                let key = remainingUserKeys[i];
                let value = users[key];
                remainingUsers[key] = value;
            }
            // Assign new object to variable
            users = remainingUsers;
            socket.broadcast.emit('disconnected', socketID);
        });
    });

    return io;
}

module.exports = { initIO }