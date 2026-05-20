param(
  [int]$Port = 3000,
  [string[]]$Urls = @(
    "http://localhost:3000/en",
    "http://localhost:3000/en/projects/villa-noura"
  )
)

$ErrorActionPreference = "Stop"
if (Get-Variable PSNativeCommandUseErrorActionPreference -ErrorAction SilentlyContinue) {
  $PSNativeCommandUseErrorActionPreference = $false
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$logDir = Join-Path $root ".diagnostics"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$stdoutLog = Join-Path $logDir "next-dev-$timestamp.out.log"
$stderrLog = Join-Path $logDir "next-dev-$timestamp.err.log"
$resultLog = Join-Path $logDir "http-$timestamp.json"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$listeners = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
foreach ($listener in $listeners) {
  try {
    Stop-Process -Id $listener.OwningProcess -Force -ErrorAction Stop
  } catch {
    Write-Warning "Could not stop process $($listener.OwningProcess) on port ${Port}: $($_.Exception.Message)"
  }
}

$node = "C:\Program Files\nodejs\node.exe"
$next = Join-Path $root "node_modules\next\dist\bin\next"

$process = Start-Process `
  -FilePath $node `
  -ArgumentList @($next, "dev", "-p", $Port) `
  -WorkingDirectory $root `
  -RedirectStandardOutput $stdoutLog `
  -RedirectStandardError $stderrLog `
  -PassThru `
  -WindowStyle Hidden

try {
  Start-Sleep -Seconds 8

  $results = foreach ($url in $Urls) {
    try {
      $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
      [PSCustomObject]@{
        url = $url
        status = [int]$response.StatusCode
        length = [int]$response.Content.Length
        error = $null
      }
    } catch {
      [PSCustomObject]@{
        url = $url
        status = "ERR"
        length = 0
        error = $_.Exception.Message
      }
    }
  }

  $buildOutput = & cmd.exe /c "npm.cmd run build 2>&1"
  $buildStatus = $LASTEXITCODE

  $report = [PSCustomObject]@{
    createdAt = (Get-Date).ToString("o")
    port = $Port
    http = $results
    buildStatus = $buildStatus
    stdoutLog = $stdoutLog
    stderrLog = $stderrLog
    buildTail = @($buildOutput | Select-Object -Last 80)
  }

  $report | ConvertTo-Json -Depth 5 | Set-Content -Path $resultLog -Encoding UTF8
  $report | ConvertTo-Json -Depth 5

  if (($results | Where-Object { $_.status -ne 200 }).Count -gt 0 -or $buildStatus -ne 0) {
    exit 1
  }
} finally {
  if ($process -and -not $process.HasExited) {
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
  }
}
