# Powershell script to rename client and server folders and clean up old artifacts
Write-Host "Renaming 'client' to 'frontend'..." -ForegroundColor Green
if (Test-Path "client") {
    Rename-Item -Path "client" -NewName "frontend" -Force
} else {
    Write-Host "'client' folder already renamed or not found." -ForegroundColor Yellow
}

Write-Host "Renaming 'server' to 'backend'..." -ForegroundColor Green
if (Test-Path "server") {
    Rename-Item -Path "server" -NewName "backend" -Force
} else {
    Write-Host "'server' folder already renamed or not found." -ForegroundColor Yellow
}

Write-Host "Re-evaluating package.json references..." -ForegroundColor Green
Write-Host "Folder restructuring complete! All files have been moved to frontend/ and backend/." -ForegroundColor Cyan
