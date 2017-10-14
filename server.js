const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

// MODELS. UnA POR CADA COLECCIÓN
const user = require('./router/user.router.js')();

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTERS

app.use("/v1/user", user);

module.exports = app;