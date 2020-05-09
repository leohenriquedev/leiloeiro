//  Modules
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/', routes);

server.listen(3333);