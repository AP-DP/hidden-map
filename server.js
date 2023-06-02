'use strict';

// Load functions from other modules
const { initIO } = require('./socket');

// Load packages and set up server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = initIO(server);

// Connection variables
const PORT = 8080;
const HOST = '0.0.0.0';

/**
 * Set up redirect so that / uses html
 */
app.route('/')
    .get((req, res, next) => {
        res.redirect('/index.html');
    })

app.use('/', express.static('pages'));
app.use('/', express.static('src'));
app.use('/', express.static('assets'));

server.listen(PORT, () => {
    console.log('Server up and running');
})

// app.listen(PORT, HOST);
// console.log('Server up and running');