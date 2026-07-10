@echo off
echo Renaming folders using Git...
if exist client (
    git mv client frontend
    echo [Success] Renamed client to frontend via git mv
) else (
    echo [Skip] client folder already renamed or not found.
)
if exist server (
    git mv server backend
    echo [Success] Renamed server to backend via git mv
) else (
    echo [Skip] server folder already renamed or not found.
)
echo.
echo Folder restructuring complete!
pause
