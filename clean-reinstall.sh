#!/bin/bash

echo "🚀 Cleaning up project for fresh build..."

# Step 1: Remove old dependencies
rm -rf node_modules package-lock.json

# Step 2: Install fresh dependencies
npm install

# Step 3: Upgrade Vite
npm install vite@latest --save-dev

# Step 4: Build project
npm run build

echo "✅ Project cleaned, Vite upgraded, and build completed."

# Step 5: Reminder for Git
echo ""
echo "👉 Now run:"
echo "git add ."
echo "git commit -m 'fix: clean install and upgrade vite'"
echo "git push origin main"
echo ""
echo "⚡ Also, don't forget to Clear Build Cache in Vercel before redeploy!"

