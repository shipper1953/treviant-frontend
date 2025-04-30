#!/bin/bash

echo "🧼 Cleaning up node_modules and lock file..."
rm -rf node_modules package-lock.json

echo "📦 Reinstalling packages..."
npm install

echo "🔧 Fixing any plugin dependencies..."
npm install --save-dev vite-plugin-commonjs

echo "🏗️ Running Vite build..."
npm run build

echo "✅ Build completed."

echo ""
echo "👉 Next steps:"
echo "   git add ."
echo "   git commit -m 'chore: clean reinstall and deploy'"
echo "   git push origin main"
echo ""
echo "⚠️ IMPORTANT: In Vercel, disable 'Use existing Build Cache' before deploying."
