const express = require('express');
const routes = express.Router();
const authJWT = require('./auth.js');

const multer = require('multer');
const uploadConfig = require('./config/upload.js');
const upload = multer(uploadConfig);

const UserController = require('./controllers/UserController.js');
const AuctionController = require('./controllers/AuctionController.js');

routes.post('/login', UserController.logIn);
routes.post('/users', UserController.create);
routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getById);

routes.post('/auction', upload.single('act_image'), AuctionController.create);
routes.get('/auction', AuctionController.getAll);
routes.get('/auction/:act_id', AuctionController.getById);

module.exports = routes;