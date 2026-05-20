#!/bin/bash
# Copia los assets necesarios desde giina-web al proyecto coming-soon

GIINA_WEB="/c/Users/gabri/giina-web/public"
DEST="/c/Users/gabri/giina-coming-soon"

echo "Copiando video..."
cp "$GIINA_WEB/videos/hero-cut.mp4" "$DEST/videos/hero-cut.mp4"

echo "Copiando logo..."
cp "$GIINA_WEB/brand/giina-mark-white.png" "$DEST/brand/giina-mark-white.png"

echo "Assets listos. Ejecuta:"
echo "  npx serve $DEST"
echo "  y abre http://localhost:3000"
