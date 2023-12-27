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

if [ "$@" = "--make-blogroll" ]; then
    cd blogroll
    echo "Downloading required packages for Blogroll..."
    composer install
    echo "Making Blogroll..."
    php index.php
    exit 0
fi

if command -v deno &> /dev/null
then
    echo "Making Home site..."
    deno run -A home.js
fi

echo "Making AK#Notes"
cd notes
go run .
cd -

mkdir -vp $OUTPUT/.well-known
echo "This is a Brave Creators publisher verification file.

Domain: anzenkodo.github.io
Token: 71f75ea13a91a0b84f3042f46af322cbf1e01ad87d47c14fecad2fab04eb1f21" > $OUTPUT/.well-known/brave-rewards-verification.txt
