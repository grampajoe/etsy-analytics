#!/bin/bash

set -ev

git checkout gh-pages
git add -f static
git commit -m "Deploy"
git push origin gh-pages
