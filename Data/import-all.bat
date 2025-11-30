@echo off
REM Sanity Portfolio Data Import Script for Windows
REM This script imports all dummy data files into your Sanity dataset

setlocal enabledelayedexpansion

REM Default dataset name
set DATASET=%1
if "%DATASET%"=="" set DATASET=production

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   Sanity Portfolio Data Import Script             ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Check if sanity CLI is installed
where sanity >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Sanity CLI is not installed.
    echo Please install it with: npm install -g @sanity/cli
    exit /b 1
)

REM Check if we're in the Data directory
if not exist "skills.ndjson" (
    echo [WARNING] Not in the Data directory. Attempting to navigate...
    if exist "Data" (
        cd Data
        echo [SUCCESS] Found Data directory
    ) else (
        echo [ERROR] Cannot find Data directory with .ndjson files
        exit /b 1
    )
)

echo Dataset: %DATASET%
echo Import Mode: Replace existing documents
echo.

REM Confirm before proceeding
set /p CONFIRM="Continue with import? This will replace existing documents. [y/N]: "
if /i not "%CONFIRM%"=="y" (
    echo Import cancelled.
    exit /b 0
)

echo.
echo Starting import...
echo.

REM Import files in order
set FILES=skills.ndjson profile.ndjson education.ndjson experience.ndjson projects.ndjson blog.ndjson services.ndjson achievements.ndjson certifications.ndjson testimonials.ndjson navigation.ndjson siteSettings.ndjson contact.ndjson

set COUNT=0
for %%F in (%FILES%) do (
    set /a COUNT+=1
    if exist "%%F" (
        echo [!COUNT!/13] Importing %%F...
        call sanity dataset import "%%F" "%DATASET%" --replace
        if errorlevel 1 (
            echo [ERROR] Failed to import %%F
            exit /b 1
        )
        echo [SUCCESS] Successfully imported %%F
        echo.
    ) else (
        echo [WARNING] %%F not found, skipping...
        echo.
    )
)

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║   ✓ Import Complete!                              ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Visit your Sanity Studio to verify the data
echo   2. Upload images to documents with image fields
echo   3. Customize the content with your actual information
echo   4. Test your frontend application
echo.
echo Happy building! 🚀

