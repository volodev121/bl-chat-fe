# Brandlisten AI Chat Frontend

This repository contains a frontend for the AI chat component.

## Deploy current build to stagin/production (manually)
* Log into [minio](https://minio-sg.brandslisten.com/login) with the credentials for `ATF`. Ask for the password if you don't have it.
* Browse to [llm-widget](https://minio-sg.brandslisten.com/browser/llm-widget). The folder index might be broken, this doesn't prohibit the update from working.
* Upload out.js. If you don't have this file, you can create it by running the `build:widget` npm task, `./makeStagingLocal.sh` or `./updateStagingLocal.sh`
* Upload the contents of the public folder to [llm-widget/public](https://minio-sg.brandslisten.com/browser/llm-widget/public).

## Running locally

First of all you have to make sure to use the right node version. We currently use `18.13.0`. You can install it with `nvm` (Node Version Manager).

After making sure that you have the requirements go to root and execute the following command:

```sh
npm install && npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Running production

To bundle the app for production we need to run the following command

```sh
./node_modules/.bin/esbuild src/app/page.tsx --bundle --outfile=out.js
```

After bundling you probably also want to inject the widget into a web application. To do this you can fetch a page with the following command:

To create the "fake" staging side locally you can use the following commands.
```sh
# get webpage
npm install
wget -p -H -P out/ --user team --password justforus! https://wl-sg.brandslisten.com/
./node_modules/.bin/esbuild src/app/page.tsx --bundle --outfile=out.js
cp out.js out/wl-sg.brandslisten.com/out.js
sed -i 's|https://static-staging-wjs.brandslisten.com/llm-widget/out.js|out.js|g' out/wl-sg.brandslisten.com/index.html
cd out/wl-sg.brandslisten.com/
python3 -m http.server 3023
```

Likewise to just update the site locally you can use the script below (found in updateStagingLocal.sh)

```sh
# update webpage
./node_modules/.bin/esbuild src/app/page.tsx --bundle --outfile=out.js
cp out.js out/wl-sg.brandslisten.com/out.js
sed -i 's|https://static-staging-wjs.brandslisten.com/llm-widget/out.js|out.js|g' out/wl-sg.brandslisten.com/index.html
cd out/wl-sg.brandslisten.com/
python3 -m http.server 3023
```
