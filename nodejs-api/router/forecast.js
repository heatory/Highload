'use strict';

const forecast = require('express').Router();

const fetch = require('node-fetch');
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

forecast.get('/', async (req, res) => {
    let city = req.query.city,
        unit = 'celsius',
        dt = req.query.dt,
        temperature = null;
    

    if(!city || !dt) {
        res.send('Invalid parametres');
        return;
    }

    let redis_res = await client.get(`${city}:${dt}:${unit}`);
    if(redis_res == null){
        const weather = await (await fetch(process.env.FORECAST_WEATHER_URL + '?q=' + city + '&units=metric&appid=' + process.env.API_KEY)).json();
        
        for(let weather_item of weather.list){
            //console.log(weather_item.dt);
            if(dt == weather_item.dt){
                await fetch (`http://${req.headers.host}/v1/save_weather/`, { 
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        city,
                        dt,
                        unit,
                        temperature: Math.round(weather_item.main.temp),
                    }),
                });
                
                temperature = Math.round(weather_item.main.temp);
            }
        }
    }
    else {
        temperature = parseInt(redis_res);
    }

    res.send(temperature == null ? 
        'Forecast not found' :
        JSON.stringify({
            city,
            unit,
            temperature,
        })
    );
    return;
});

module.exports = forecast;