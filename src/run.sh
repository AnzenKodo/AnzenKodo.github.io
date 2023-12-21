#!/usr/bin/env bash

echo "The script is running, now..."
set -o errexit
set -o nounset
set -o pipefail
if [[ "${TRACE-0}" == "1" ]]; then
    set -o xtrace
fi
cd "$(dirname "$0")"

echo "Setting up environment variables..."
export OUTPUT="../site"
export CONFIG="./data/config.json"

echo "Copying assests folder..."
mkdir -p $OUTPUT
cp -r assets $OUTPUT

echo "Making Home site..."
deno run -A home.js

echo "Making AK#Notes"
cd notes
go run .
cd -

cd blogroll
if [ ! -d vendor ]
then
  echo "Downloading required packages for Blogroll..."
  composer install
fi
  echo "Making Blogroll..."
  php index.php
cd ..

mkdir $OUTPUT/.well-know
touch $OUTPUT/.well-know/brave-rewards-verification.txt
echo "This is a Brave Rewards publisher verification file.

Domain: anzenkodo.github.io
Token: 4165d0e625cb72d07a870bbb7c17ef9583e535ce6ecd7a47284d965f87f2bc17
" > $OUTPUT/.well-know/brave-rewards-verification.txt

