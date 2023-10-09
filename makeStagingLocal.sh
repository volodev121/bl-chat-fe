#!/usr/bin/bash

wget -p -H -P out/ --user team --password justforus! https://wl-sg.brandslisten.com/
./node_modules/.bin/esbuild src/app/page.tsx --bundle --outfile=out.js
cp out.js out/wl-sg.brandslisten.com/out.js
sed -i 's|https://static-staging-wjs.brandslisten.com/llm-widget/out.js|out.js|g' out/wl-sg.brandslisten.com/index.html
cd out/wl-sg.brandslisten.com/
python3 -m http.server 3023