#!/bin/sh

export LD_LIBRARY_PATH=/usr/local/lib/python3.5/site-packages/pyopenms-2.2.0-py3.5-linux-x86_64.egg/pyopenms

pserve /opt/production.ini

