#!/bin/bash

set -ev

git checkout gh-pages
git reset --hard master
git add -f static index.html
git commit -m "Deploy" --allow-empty
git push origin gh-pages --force
