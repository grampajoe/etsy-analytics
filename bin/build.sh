#!/bin/bash

set -ev

npm install -g browserify
browserify index.js > static/analytics.js
