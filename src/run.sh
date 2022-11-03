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

if [ ! -d "notes" ]
then
  git clone https://$GITHUB_TOKEN@github.com/AnzenKodo/notes.git
fi

echo "Making Main website..."
deno run -A home/index.js

echo "Making blog..."
cp -r notes/posts blog/posts
cd blog
deno run -A https://deno.land/x/dblog
cd ..

echo "Making blogroll..."
cd blogroll
php index.php
cd ..

echo "Coping assests folder..."
cp -r assets/ ../site/