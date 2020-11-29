'use strict';

const current = require('express').Router();

const fetch = require('node-fetch');
const redis = require('ioredis');

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

current.get('/', async (req, res) => {
    let city = req.query.city,
        unit = 'celsius',
        dt = Math.floor(new Date().getTime() / 1000),
        temperature = null;

    if(!city) {
        res.send('Invalid parametres')
        return;
    };
    let redis_res = await client.get(`${city}:${dt}:${unit}`);
    if(redis_res == null){
        const weather = await (await fetch(process.env.CURRENT_WEATHER_URL + '?q=' + city + '&units=metric&appid=' + process.env.API_KEY)).json();
        
        temperature = Math.round(weather.main.temp);
    }
    else {
        temperature = parseInt(redis_res);
    }
    
    res.send(JSON.stringify({
        city,
        unit,
        temperature,
    }));
    return;
});

module.exports = current;