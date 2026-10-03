[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [ValidateSet("mcp", "cicd", "all")]
    [string]$Mode = "all"
)

$ErrorActionPreference = "Stop"

Write-Host "=== SEO Operations Setup Verification ===" -ForegroundColor Cyan
Write-Host "Verification Mode: $Mode" -ForegroundColor Yellow

$failures = 0

# Check Node.js version >= 22
Write-Host "`n[1/3] Checking Node.js runtime..." -ForegroundColor Cyan
try {
    $nodeVersionRaw = node -v
    $nodeMajor = [int]($nodeVersionRaw -replace '^v','').Split('.')[0]
    if ($nodeMajor -ge 22) {
        Write-Host "  [OK] Node.js version: $nodeVersionRaw (>= 22)" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Node.js version $nodeVersionRaw is below required v22+" -ForegroundColor Red
        $failures++
    }
} catch {
    Write-Host "  [FAIL] Node.js binary not found in PATH" -ForegroundColor Red
    $failures++
}

# Verify MCP Mode
if ($Mode -eq "mcp" -or $Mode -eq "all") {
    Write-Host "`n[2/3] Checking SEO MCP / CLI configuration..." -ForegroundColor Cyan
    try {
        $seoVersion = seo --version 2>$null
        if ($seoVersion) {
            Write-Host "  [OK] seo CLI binary found: $seoVersion" -ForegroundColor Green
        } else {
            Write-Host "  [WARN] seo binary not in global PATH. You can install it with: npm i -g seo" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  [WARN] seo binary not found globally" -ForegroundColor Yellow
    }

    $mcpConfigFile = Join-Path (Get-Location) ".agents/mcp_config.json"
    if (Test-Path $mcpConfigFile) {
        $mcpContent = Get-Content $mcpConfigFile -Raw | ConvertFrom-Json
        if ($mcpContent.mcpServers.seo) {
            Write-Host "  [OK] SEO MCP server configured in .agents/mcp_config.json" -ForegroundColor Green
            try {
                $testRes = npx -y seo mcp serve --test 2>&1
                if ($testRes -match "constructed successfully") {
                    Write-Host "  [OK] SEO MCP daemon test passed (npx -y seo mcp serve --test)" -ForegroundColor Green
                }
            } catch {
                Write-Host "  [WARN] Failed to test MCP daemon: $_" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  [WARN] SEO entry not yet added to .agents/mcp_config.json" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [INFO] .agents/mcp_config.json does not exist yet" -ForegroundColor Gray
    }
}

# Verify CI/CD Mode
if ($Mode -eq "cicd" -or $Mode -eq "all") {
    Write-Host "`n[3/3] Checking CI/CD and pre-push gates..." -ForegroundColor Cyan
    $ciWorkflow = Join-Path (Get-Location) ".github/workflows/seo-check.yml"
    if (Test-Path $ciWorkflow) {
        Write-Host "  [OK] CI/CD workflow found: .github/workflows/seo-check.yml" -ForegroundColor Green
    } else {
        Write-Host "  [INFO] CI/CD workflow .github/workflows/seo-check.yml not created yet" -ForegroundColor Gray
    }

    $prePushHook = Join-Path (Get-Location) ".husky/pre-push"
    if (Test-Path $prePushHook) {
        Write-Host "  [OK] Husky pre-push hook found" -ForegroundColor Green
    } else {
        Write-Host "  [INFO] Husky pre-push hook not configured" -ForegroundColor Gray
    }
}

Write-Host "`n=== Verification Complete ===" -ForegroundColor Cyan
if ($failures -eq 0) {
    Write-Host "All prerequisite checks passed successfully." -ForegroundColor Green
    exit 0
} else {
    Write-Host "Verification encountered $failures failure(s)." -ForegroundColor Red
    exit 1
}
