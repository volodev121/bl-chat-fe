#!/bin/bash
set -e

npm install --force
npm run build:widget
mc cp out.* staging-llm/llm-widget/
mc cp -r public staging-llm/llm-widget/public/
