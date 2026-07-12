@echo off
echo ===================================================
echo   EthiZone Project Merge and Clean-up Utility
echo ===================================================
echo.
echo IMPORTANT: Make sure you have stopped your local servers
echo (npm run dev and npm start) before continuing.
echo.
pause
echo.

:: 1. Copy backend
echo [1/4] Syncing backend folder from EthiZoneStitch...
robocopy "C:\Users\addmy\Desktop\ethizzone\EthiZoneStitch\backend" "C:\Users\addmy\Desktop\MERNMovie\backend" /MIR /XD node_modules

:: 2. Copy frontend to frontend
echo [2/4] Syncing frontend folder from EthiZoneStitch...
robocopy "C:\Users\addmy\Desktop\ethizzone\EthiZoneStitch\frontend" "C:\Users\addmy\Desktop\MERNMovie\frontend" /MIR /XD node_modules

:: 3. Clean up outdated folders and files
echo [3/4] Cleaning up old folders and redundant scripts...
if exist "C:\Users\addmy\Desktop\MERNMovie\client" (
    echo Deleting outdated client folder...
    rmdir /s /q "C:\Users\addmy\Desktop\MERNMovie\client"
)
if exist "C:\Users\addmy\Desktop\MERNMovie\rename-directories.bat" del "C:\Users\addmy\Desktop\MERNMovie\rename-directories.bat"
if exist "C:\Users\addmy\Desktop\MERNMovie\rename-directories.ps1" del "C:\Users\addmy\Desktop\MERNMovie\rename-directories.ps1"
if exist "C:\Users\addmy\Desktop\MERNMovie\sync_and_push.bat" del "C:\Users\addmy\Desktop\MERNMovie\sync_and_push.bat"
if exist "C:\Users\addmy\Desktop\MERNMovie\git_deploy.bat" del "C:\Users\addmy\Desktop\MERNMovie\git_deploy.bat"

:: 4. Install all dependencies
echo [4/4] Installing all dependencies...
call npm run install-all

echo.
echo ===================================================
echo   Merge and Clean-up Complete!
echo   Run .\deploy.bat to push changes to GitHub.
echo ===================================================
pause
