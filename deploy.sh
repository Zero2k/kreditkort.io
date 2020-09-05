#!/bin/bash

echo What should the version be?
read VERSION

sudo docker build --no-cache -t zero2k/backend:$VERSION .
sudo docker push zero2k/backend:$VERSION