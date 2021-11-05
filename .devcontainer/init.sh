#!/bin/bash

WORKSPACEDIR=$PWD

echo "Installing Core NPM modules..."
cd $WORKSPACEDIR/core && yarn

echo "Installing UI NPM modules..."
cd $WORKSPACEDIR/ui && yarn
