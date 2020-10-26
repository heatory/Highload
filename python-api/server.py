from flask import Flask, request, jsonify
import os
from os.path import join, dirname
from dotenv import load_dotenv

import requests

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

PORT = os.environ.get('PORT')
CURRENT_URL = str(os.environ.get('CURRENT_WEATHER_URL'))
FORECAST_URL = str(os.environ.get('FORECAST_WEATHER_URL'))
API_KEY = str(os.environ.get('API_KEY'))

app = Flask(__name__)

@app.route("/v1/current/")
def current():
    city = request.args.get('city', None)
    if city is None :
        return 'Invalid parametres'
    weather_data = requests.get(CURRENT_URL + '?q=' + city + '&units=metric&appid=' + API_KEY).json()
    return jsonify(city=city, unit='celsius', temperature=round(weather_data['main']['temp']))

@app.route("/v1/forecast/")
def forecast():
    city = request.args.get('city', None)
    dt = request.args.get('dt', None)
    if city is None or dt is None :
        return 'Invalid parametres'
    weather_data = requests.get(FORECAST_URL + '?q=' + city + '&units=metric&appid=' + API_KEY).json()
    for weather in weather_data['list']:
    	if int(dt) == int(weather['dt']):
    	    return jsonify(city=city, unit='celsius', temperature=round(weather['main']['temp']))    
    return 'Forecast not found'	
    

@app.errorhandler(404)
def notFound(e):
    return 'Page not found', 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT)
