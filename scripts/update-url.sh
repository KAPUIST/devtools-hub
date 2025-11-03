#!/bin/bash

# 사용법: ./scripts/update-url.sh devtools-hub-six.vercel.app

if [ -z "$1" ]; then
  echo "사용법: ./scripts/update-url.sh <새로운-도메인>"
  echo "예시: ./scripts/update-url.sh devtools-hub-six.vercel.app"
  exit 1
fi

NEW_DOMAIN=$1
OLD_DOMAIN="devtools-hub.vercel.app"

echo "🔄 URL 업데이트 시작..."
echo "Old: https://$OLD_DOMAIN"
echo "New: https://$NEW_DOMAIN"
echo ""

# 업데이트할 파일 목록
files=(
  ".env.example"
  "app/layout.tsx"
  "app/sitemap.ts"
  "app/robots.ts"
  "app/[locale]/json-formatter/metadata.ts"
  "app/[locale]/regex-tester/metadata.ts"
  "app/[locale]/base64/metadata.ts"
  "app/[locale]/jwt-debugger/metadata.ts"
  "app/[locale]/uuid-generator/metadata.ts"
  "app/[locale]/hash-generator/metadata.ts"
  "app/[locale]/url-encoder/metadata.ts"
  "app/[locale]/timestamp-converter/metadata.ts"
  "app/[locale]/color-converter/metadata.ts"
  "app/[locale]/qr-generator/metadata.ts"
  "app/[locale]/privacy/page.tsx"
  "app/[locale]/qr-generator/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✏️  업데이트: $file"
    sed -i '' "s|$OLD_DOMAIN|$NEW_DOMAIN|g" "$file"
  else
    echo "⚠️  파일 없음: $file"
  fi
done

echo ""
echo "✅ 완료! 다음 명령어로 확인:"
echo "   grep -r \"$NEW_DOMAIN\" app/ --include=\"*.ts\" --include=\"*.tsx\""
echo ""
echo "📝 변경 사항을 커밋하세요:"
echo "   git add -A"
echo "   git commit -m \"fix: Update domain to $NEW_DOMAIN\""
echo "   git push origin main"
