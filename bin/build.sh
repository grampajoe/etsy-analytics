#!/bin/bash

npm install -g browserify
browserify index.js > static/analytics.js
