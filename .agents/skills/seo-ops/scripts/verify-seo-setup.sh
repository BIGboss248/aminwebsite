#!/usr/bin/env bash
set -e

MODE="all"

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -m|--mode) MODE="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

echo "=== SEO Operations Setup Verification ==="
echo "Verification Mode: $MODE"

FAILURES=0

echo ""
echo "[1/3] Checking Node.js runtime..."
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node -v)
    NODE_MAJOR=$(echo "$NODE_VERSION" | sed 's/^v//' | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 22 ]; then
        echo "  [OK] Node.js version: $NODE_VERSION (>= 22)"
    else
        echo "  [FAIL] Node.js version $NODE_VERSION is below required v22+"
        FAILURES=$((FAILURES + 1))
    fi
else
    echo "  [FAIL] Node.js binary not found in PATH"
    FAILURES=$((FAILURES + 1))
fi

if [ "$MODE" = "mcp" ] || [ "$MODE" = "all" ]; then
    echo ""
    echo "[2/3] Checking SEO MCP / CLI configuration..."
    if command -v npx >/dev/null 2>&1; then
        SEO_VERSION=$(npx -y seo --version 2>/dev/null || echo "installed")
        echo "  [OK] seo CLI binary found via npx: $SEO_VERSION"
    else
        echo "  [WARN] npx binary not found in PATH"
    fi

    if [ -f ".agents/mcp_config.json" ]; then
        if grep -q '"seo"' .agents/mcp_config.json; then
            echo "  [OK] SEO MCP server configured in .agents/mcp_config.json"
            if npx -y seo mcp serve --test >/dev/null 2>&1; then
                echo "  [OK] SEO MCP daemon test passed (npx -y seo mcp serve --test)"
            fi
        else
            echo "  [WARN] SEO entry not yet added to .agents/mcp_config.json"
        fi
    else
        echo "  [INFO] .agents/mcp_config.json does not exist yet"
    fi
fi

if [ "$MODE" = "cicd" ] || [ "$MODE" = "all" ]; then
    echo ""
    echo "[3/3] Checking CI/CD and pre-push gates..."
    if [ -f ".github/workflows/seo-check.yml" ]; then
        echo "  [OK] CI/CD workflow found: .github/workflows/seo-check.yml"
    else
        echo "  [INFO] CI/CD workflow .github/workflows/seo-check.yml not created yet"
    fi

    if [ -f ".husky/pre-push" ]; then
        echo "  [OK] Husky pre-push hook found"
    else
        echo "  [INFO] Husky pre-push hook not configured"
    fi
fi

echo ""
echo "=== Verification Complete ==="
if [ "$FAILURES" -eq 0 ]; then
    echo "All prerequisite checks passed successfully."
    exit 0
else
    echo "Verification encountered $FAILURES failure(s)."
    exit 1
fi
