'use strict';

const save_weather = require('express').Router();
const redis = require("ioredis");

const client = new redis.Cluster([
    {
      port: 6001,
      host: "127.0.0.1",
    },
    {
      port: 6002,
      host: "127.0.0.1",
    },
    {
      port: 6003,
      host: "127.0.0.1",
    },
    {
      port: 6004,
      host: "127.0.0.1",
    },
    {
      port: 6005,
      host: "127.0.0.1",
    },
    {
      port: 6006,
      host: "127.0.0.1",
    },
]);

save_weather.post('/', (req, res) => {
    console.log("Я тут.");
    let city = req.body.city;
    let dt = req.body.dt;
    let unit = req.body.unit;
    let temperature = req.body.temperature;
    client.set(`${city}:${dt}:${unit}`, temperature);

    res.send('ok');
});

module.exports = save_weather;