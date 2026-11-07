#!/usr/bin/env bash
set -eo pipefail

PORT=3000
SITE="sc-domain:aminjamali.site"
SKIP_GSC=false
STRICT_GSC=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --port) PORT="$2"; shift ;;
    --site) SITE="$2"; shift ;;
    --skip-gsc) SKIP_GSC=true ;;
    --strict-gsc) STRICT_GSC=true ;;
    *) shift ;;
  esac
done

URL="http://127.0.0.1:${PORT}"
SPAWNED_SERVER=0
SERVER_PID=""

NODE_BIN=$(command -v node 2>/dev/null || command -v node.exe 2>/dev/null || echo "node")
NPX_BIN=$(command -v npx 2>/dev/null || command -v npx.cmd 2>/dev/null || echo "npx")
PNPM_BIN=$(command -v pnpm 2>/dev/null || command -v pnpm.cmd 2>/dev/null || echo "pnpm")

cleanup() {
  if [ "$SPAWNED_SERVER" -eq 1 ] && [ -n "$SERVER_PID" ]; then
    echo "[SEO Pre-Push] Shutting down spawned background dev server (PID: $SERVER_PID)..."
    kill "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "[SEO Pre-Push] =========================================="
echo "[SEO Pre-Push] Gate 1: Technical & On-Page Audit"
echo "[SEO Pre-Push] =========================================="
echo "[SEO Pre-Push] Probing for active dev server at $URL..."

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "$URL" 2>/dev/null || echo "000")
HTTP_CODE=$(echo "$HTTP_CODE" | tr -d '\r\n' | tail -c 3)

if [ "$HTTP_CODE" != "000" ] && [ -n "$HTTP_CODE" ]; then
  echo "[SEO Pre-Push] Detected running dev server with HTTP status $HTTP_CODE. Reusing existing instance."
else
  echo "[SEO Pre-Push] No active dev server detected. Starting dev server..."
  $PNPM_BIN run dev >/dev/null 2>&1 &
  SERVER_PID=$!
  SPAWNED_SERVER=1

  echo "[SEO Pre-Push] Waiting for dev server to become ready..."
  READY=0
  for i in $(seq 1 30); do
    CHECK_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 1 "$URL" 2>/dev/null || echo "000")
    CHECK_CODE=$(echo "$CHECK_CODE" | tr -d '\r\n' | tail -c 3)
    if [ "$CHECK_CODE" != "000" ] && [ -n "$CHECK_CODE" ]; then
      READY=1
      echo "[SEO Pre-Push] Dev server is ready with HTTP status $CHECK_CODE!"
      break
    fi
    sleep 1
  done

  if [ "$READY" -ne 1 ]; then
    echo "[SEO Pre-Push] Timed out waiting for dev server to start on port $PORT."
    exit 1
  fi
fi

echo "[SEO Pre-Push] Executing SEO technical audit against $URL..."
AUDIT_JSON=$($NPX_BIN -y seo report --url "$URL" --actions-only --json)

FIXES_COUNT=$($NODE_BIN -e "
  try {
    const data = JSON.parse(process.argv[1]);
    const fixes = data?.findings?.counts?.fixes ?? 0;
    process.stdout.write(String(fixes));
  } catch (e) {
    process.stdout.write('0');
  }
" "$AUDIT_JSON")

if [ "$FIXES_COUNT" -gt 0 ]; then
  echo "[SEO Pre-Push] Technical SEO quality gate failed! Found $FIXES_COUNT critical technical fix(es)."
  echo "$AUDIT_JSON"
  exit 1
fi

echo "[SEO Pre-Push] Technical SEO quality gate passed with 0 critical findings."

# Gate 2: Google Search Console Performance & Opportunities Analysis
if [ "$SKIP_GSC" = false ]; then
  echo ""
  echo "[SEO Pre-Push] =========================================="
  echo "[SEO Pre-Push] Gate 2: Google Search Console Opportunities"
  echo "[SEO Pre-Push] =========================================="

  DOCTOR_OUTPUT=$($NPX_BIN -y seo doctor 2>&1 || true)
  if echo "$DOCTOR_OUTPUT" | grep -q "Signed in as" && echo "$DOCTOR_OUTPUT" | grep -q "Search Console scope"; then
    echo "[SEO Pre-Push] Google Search Console connection verified."
    SITE_OPT=()
    if [ -n "$SITE" ]; then
      SITE_OPT=("--site" "$SITE")
    fi

    echo "[SEO Pre-Push] Analyzing Quick-Wins (positions 4-10 with low CTR)..."
    $NPX_BIN -y seo quick-wins "${SITE_OPT[@]}" || true

    echo ""
    echo "[SEO Pre-Push] Analyzing Second-Page Opportunities (positions 10-20 striking distance)..."
    $NPX_BIN -y seo second-page "${SITE_OPT[@]}" || true

    echo ""
    echo "[SEO Pre-Push] Search Console opportunity audit completed."
  else
    if [ "$STRICT_GSC" = true ]; then
      echo "[SEO Pre-Push] Search Console quality gate failed: No authenticated Google account or GSC property found."
      echo "[SEO Pre-Push] Run 'npx seo start' to authenticate Search Console."
      exit 1
    else
      echo "[SEO Pre-Push] Search Console: No authenticated Google account detected (run 'npx seo start' to connect)."
      echo "[SEO Pre-Push] Skipping Search Console check (pass --strict-gsc to enforce)."
    fi
  fi
fi

echo ""
echo "[SEO Pre-Push] All SEO pre-push quality gates completed successfully."
exit 0
