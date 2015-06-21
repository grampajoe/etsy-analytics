#!/bin/bash

set -ev

git checkout gh-pages
git add -f static index.html
git commit -m "Deploy"
git push origin gh-pages
