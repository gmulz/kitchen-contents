#!/bin/bash

pip install -r requirements.txt

sudo apt-get install postgresql

sudo -u postgres psql -c "CREATE USER kitchenadmin WITH PASSWORD 'asdfghjkl';"
sudo -u postgres psql -c "ALTER USER kitchenadmin WITH SUPERUSER CREATEDB CREATEROLE;"
sudo -u postgres psql -c "CREATE DATABASE kitchendb OWNER  kitchenadmin"

python ./kitchen/manage.py migrate

python ./kitchen/manage.py loaddata ./kitchen/kitchenapp/fixtures/fixtures.json

python ./kitchen/manage.py runserver 0.0.0.0:8001
