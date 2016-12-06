#!/bin/bash
cd `dirname $0`

for i in `find .  -maxdepth 1 -and -not -name sources -and -not -name '.*' -type d`
do
    rm -rf $i
done

ikiwiki --setup setup

rm -rf favicon.ico local.css ikiwiki ikiwiki.html recentchanges.html \
    sandbox.html shortcuts.html style.css templates templates.html \
    wikiicons sources/.ikiwiki .ikiwiki

