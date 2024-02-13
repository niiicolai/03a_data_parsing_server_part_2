from flask import Flask, request
import json
import pandas as pd
import yaml
import requests
import logging
from requests.exceptions import HTTPError

app = Flask(__name__)

def fetch_data():
    text = None
    error = None
    try:
        url = request.args.get('url')
        response = requests.get(url)
        response.raise_for_status()
    except HTTPError as http_err:
        error = f'HTTP error occurred: {http_err}'
    except Exception as err:
        error = f'Other error occurred: {err}'
    else:
        text = response.text
    
    return { "text": text, "error": error }

def fetch_server_b_data(params, endpoint):
    json = None
    error = None
    try:
        url = "http://localhost:3000/" + endpoint + "?"
        for key, value in params.items():
            url += key + "=" + value + "&"
        response = requests.get(url)
        response.raise_for_status()
    except HTTPError as http_err:
        error = f'HTTP error occurred: {http_err}'
    except Exception as err:
        error = f'Other error occurred: {err}'
    else:
        json = response.json()

    return { "text": json, "error": error }

def use_server_b():
    return request.args.get('server') == "B"

def handle_server_b_response(endpoint, params={}):
    app.logger.info("Handling server B response")

    url = request.args.get('url')
    if not url:
        return "URL is required", 400
    
    params["url"] = url

    response = fetch_server_b_data(params, endpoint)
    if response["error"]:
        return response["error"], 500
    else:
        return response["text"]

def handle_response(data, parse_method):
    app.logger.info("Handling response")

    if data["error"]:
        return data["error"], 500
    else:
        if not data["text"]:
            return "File at URL is empty", 500
        else:
            return parse_method(data["text"])

@app.route("/csv.json")
def parse_csv():
    if use_server_b():
        header = request.args.get('header')
        if not header:
            return "Header is required", 400

        return handle_server_b_response("csv.json", params={"header": header})
    else:
        return pd.read_csv(request.args.get('url'), sep=(request.args.get('sep') or ',')).to_json()

@app.route("/json.json")
def parse_json():
    if use_server_b():
        return handle_server_b_response("json.json")
    else:
        return handle_response(fetch_data(), lambda text: json.loads(text))

@app.route("/xml.json")
def parse_xml():
    if use_server_b():
        return handle_server_b_response("xml.json")
    else:
        return handle_response(fetch_data(), lambda text: pd.read_xml(text).to_json())

@app.route("/yaml.json")
def parse_yaml():
    if use_server_b():
        return handle_server_b_response("yaml.json")
    else:
        return handle_response(fetch_data(), lambda text: json.dumps(yaml.safe_load(text)))
    
@app.route("/text.json")
def parse_text():
    if use_server_b():
        return handle_server_b_response("text.json")
    else:
        return handle_response(fetch_data(), lambda text: json.dumps(text))

if __name__ == "__main__":
    app.run()
