@echo off
echo ==========================================
echo  Git Commit and Deploy Script
echo ==========================================
echo.
echo Step 1: Staging all local changes...
git add .
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to stage changes.
    goto end
)
echo [Success] All changes staged.
echo.

echo Step 2: Committing changes...
git commit -m "Configure deployment, add directory filter bar, and update premium storefront maintenance view"
if %ERRORLEVEL% neq 0 (
    echo [INFO] No changes to commit or commit failed.
) else (
    echo [Success] Committed changes.
)
echo.

echo Step 3: Pushing to GitHub...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to push changes to GitHub.
    goto end
)
echo [Success] Successfully pushed to origin main!
echo.
echo ==========================================
echo  Deployment complete!
echo  Your live services (Vercel/Render) will
echo  automatically build and deploy the changes.
echo ==========================================

:end
pause
