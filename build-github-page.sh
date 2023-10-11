#!/bin/sh

echo "delete docs"
rm -rf docs
echo "build project starts"
ng build --output-path docs/
cp ./docs/index.html  ./docs/404.html
echo 'build project finishes'
