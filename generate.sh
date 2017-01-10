#!/bin/bash
cd `dirname $0`
rm -rf html-temp
rm -rf devel howtos

ikiwiki --setup setup

mv html-temp/devel html-temp/howtos html-temp/community.html .
rm -rf html-temp sources/.ikiwiki
