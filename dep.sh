#!/bin/bash

if (( $# < 1 ))
then
    echo "Usage: $0 path-to-extjs"
    echo "you may need to download extjs and decompress somewhere first"
    exit 1
fi

extjs="$1"

echo -n "copying over ext-base.js ... "
cp "$extjs/adapter/ext/ext-base.js" . || exit 1
echo "DONE"

echo -n "copying over ext-all-debug.js ... "
cp "$extjs/ext-all-debug.js" . || exit 1
echo "DONE"

echo -n "copying over resources ... "
cp -r "$extjs/resources" . || exit 1
echo "DONE"

echo "you may start:  twistd -n web --port=8081 --path=."
echo "and, visit http://localhost:8081/demo.html"
