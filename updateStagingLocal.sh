#!/usr/bin/bash
./node_modules/.bin/esbuild src/app/page.tsx --bundle --outfile=out.js
cp out.js out/wl-sg.brandslisten.com/out.js
cp -R public out/wl-sg.brandslisten.com/
sed -i 's|https://static-staging-wjs.brandslisten.com/llm-widget/out.js|out.js|g' out/wl-sg.brandslisten.com/index.html
cd out/wl-sg.brandslisten.com/
netstat -tuln | grep ":3023 " &> /dev/null

if [ $? -eq 0 ]; then
    echo "Port 3023 is in use. Not starting server"
else
    echo "Port 3023 is not in use. Starting webserver"
    python3 -m http.server 3023
fi
