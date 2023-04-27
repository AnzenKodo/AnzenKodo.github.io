#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
if [[ "${TRACE-0}" == "1" ]]; then
    set -o xtrace
fi

echo "The script is running, now..."

cd "$(dirname "$0")"

if [ -f ../.env ]
then
  export $(cat ../.env | sed 's/#.*//g' | xargs)
fi

if [ ! -d notes ]
then
  git clone https://$GITHUB_TOKEN@github.com/AnzenKodo/notes.git
fi

echo "Making Main website..."
run() {
  for filename in $1/*; do
    deno run -A $filename
  done
}
run "home/api"
run "home/pages"

echo "Coping assests folder..."
cp -r assets/ ../site/

echo "Making blogroll..."
cd blogroll
if [ ! -d vendor ]
then
  composer install
fi
  php index.php
cd ..
