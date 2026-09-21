param (
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$ComponentPath,

    [Parameter(Mandatory = $false)]
    [string]$ComponentName
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $ComponentPath)) {
    Write-Host "[FAIL] Path not found: $ComponentPath" -ForegroundColor Red
    exit 1
}

$resolvedItem = Get-Item $ComponentPath

if ($resolvedItem.PSIsContainer) {
    $resolvedDir = $resolvedItem.FullName
    if ($ComponentName) {
        $compName = $ComponentName
    } else {
        $compName = $resolvedItem.Name
    }
} else {
    $resolvedDir = $resolvedItem.DirectoryName
    $compName = [System.IO.Path]::GetFileNameWithoutExtension($resolvedItem.Name)
}

$componentFile = Join-Path $resolvedDir "$compName.tsx"
$skeletonFile = Join-Path $resolvedDir "${compName}Skeleton.tsx"
$testFile = Join-Path $resolvedDir "$compName.test.tsx"
if (-not (Test-Path $testFile)) {
    $testFile = Join-Path $resolvedDir "$compName.spec.tsx"
}

$missing = @()
if (-not (Test-Path $componentFile)) { $missing += "$compName.tsx" }
if (-not (Test-Path $skeletonFile))  { $missing += "${compName}Skeleton.tsx" }
if (-not (Test-Path $testFile))      { $missing += "$compName.test.tsx" }

if ($missing.Count -gt 0) {
    Write-Host "[FAIL] Missing dev companion files for $compName in $($resolvedDir):" -ForegroundColor Red
    foreach ($m in $missing) {
        Write-Host "  - Missing: $m" -ForegroundColor Red
    }
    exit 1
}

Write-Host "[PASS] Files present: $compName.tsx, ${compName}Skeleton.tsx, $(Split-Path $testFile -Leaf)" -ForegroundColor Green

# Detect package manager
$pkgManager = "pnpm"
if (Test-Path "pnpm-lock.yaml") { $pkgManager = "pnpm" }
elseif (Test-Path "bun.lockb") { $pkgManager = "bun" }
elseif (Test-Path "package-lock.json") { $pkgManager = "npm" }
elseif (Test-Path "yarn.lock") { $pkgManager = "yarn" }

Write-Host "[INFO] Executing unit test suite via $pkgManager..." -ForegroundColor Cyan

$testCmd = "$pkgManager test -- `"$testFile`""
Write-Host "Running: $testCmd" -ForegroundColor DarkGray

Invoke-Expression $testCmd
if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] Unit tests failed for $compName." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "[SUCCESS] Dev verification passed for $compName." -ForegroundColor Green
exit 0

