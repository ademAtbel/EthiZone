@echo off
echo ==========================================
echo  EthiZone Project Sync ^& Deploy Utility
echo ==========================================
echo.

:: 1. Copy backend
echo [1/3] Syncing backend folder...
robocopy "C:\Users\addmy\Desktop\ethizzone\EthiZoneStitch\backend" "C:\Users\addmy\Desktop\MERNMovie\backend" /MIR /XD node_modules

:: 2. Copy frontend
echo [2/3] Syncing frontend folder...
if exist "C:\Users\addmy\Desktop\MERNMovie\client" (
    echo Cleaning up old client folder...
    rmdir /s /q "C:\Users\addmy\Desktop\MERNMovie\client"
)
robocopy "C:\Users\addmy\Desktop\ethizzone\EthiZoneStitch\frontend" "C:\Users\addmy\Desktop\MERNMovie\frontend" /MIR /XD node_modules

:: 3. Copy root config files
echo [3/3] Syncing root configuration files...
copy /y "C:\Users\addmy\Desktop\ethizzone\EthiZoneStitch\package.json" "C:\Users\addmy\Desktop\MERNMovie\"
copy /y "C:\Users\addmy\Desktop\ethizzone\EthiZoneStitch\package-lock.json" "C:\Users\addmy\Desktop\MERNMovie\"

echo.
echo Sync Complete!
echo.
echo Staging and committing changes in Git...
git add .
git commit -m "Sync code from EthiZoneStitch and update HousesPage filters"
echo.
echo Pushing to GitHub (origin main)...
git push origin main --force
echo.
echo ==========================================
echo  Deployment complete!
echo ==========================================
pause
