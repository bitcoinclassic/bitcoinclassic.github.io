#!/bin/bash
cd `dirname $0`
rm -rf html-temp
rm -rf devel howtos news

ikiwiki --setup setup

mv html-temp/devel html-temp/howtos html-temp/community.html html-temp/news .
rm -rf html-temp
