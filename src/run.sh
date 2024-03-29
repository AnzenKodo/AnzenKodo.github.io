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
export INFO="api/info.json"

echo "Copying assests folder..."
mkdir -p $OUTPUT
cp -r assets $OUTPUT

echo "Making api endpoints"
cp -r api $OUTPUT

if [ "$@" = "--make-blogroll" ]; then
    cd blogroll
    echo "Making Blogroll..."
    php index.php
    exit 0
fi

echo "Making AK#Notes"
cd notes
export GOMODCACHE="$(pwd)/mod"
go run .
cd -
if [ "$@" = "--only-note" ]; then
    exit 0
fi

if command -v deno &> /dev/null
then
    echo "Making Home site..."
    deno run -A home.js
fi


mkdir -vp $OUTPUT/.well-known
echo "This is a Brave Creators publisher verification file.

Domain: anzenkodo.github.io
Token: 71f75ea13a91a0b84f3042f46af322cbf1e01ad87d47c14fecad2fab04eb1f21" > $OUTPUT/.well-known/brave-rewards-verification.txt
