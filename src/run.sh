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

mkdir ../site/.well-know
touch ../site/.well-know/brave-rewards-verification.txt
echo "This is a Brave Rewards publisher verification file.

Domain: anzenkodo.github.io
Token: 4165d0e625cb72d07a870bbb7c17ef9583e535ce6ecd7a47284d965f87f2bc17
" > ../site/.well-know/brave-rewards-verification.txt
