#!/usr/bin/env python
# coding=utf-8


import json
import requests
from flask import Flask, render_template

app = Flask(__name__, template_folder='public', static_folder='public')
# app.config.from_pyfile('flaskapp.cfg') # production only
#app.config['JSON_AS_ASCII'] = False

@app.route('/')
def main():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
