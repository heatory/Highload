'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { current, forecast, save_weather } = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1/current/', current);
app.use('/v1/forecast/', forecast);
app.use('/v1/save_weather/', save_weather);

module.exports = app;