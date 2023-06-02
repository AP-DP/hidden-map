'use strict';

// Load packages
const express = require('express');
const app = express();

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

app.listen(PORT, HOST);
console.log('Server up and running');