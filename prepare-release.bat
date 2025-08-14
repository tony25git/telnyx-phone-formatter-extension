@echo off
REM Telnyx Phone Formatter Extension - Release Preparation Script
REM This script helps prepare a release ZIP file for GitHub

echo ========================================
echo  Telnyx Phone Formatter Release Prep
echo ========================================
echo.

REM Get version from user
set /p VERSION="Enter version (e.g., 1.3.1): "
if "%VERSION%"=="" (
    echo Error: Version is required
    pause
    exit /b 1
)

set FILENAME=telnyx-phone-formatter-v%VERSION%.zip

echo Preparing release: %FILENAME%
echo.

REM Check if required files exist
if not exist "manifest.json" (
    echo Error: manifest.json not found
    echo Make sure you're in the extension directory
    pause
    exit /b 1
)

if not exist "popup.html" (
    echo Error: popup.html not found
    pause
    exit /b 1
)

if not exist "popup.css" (
    echo Error: popup.css not found
    pause
    exit /b 1
)

if not exist "popup.js" (
    echo Error: popup.js not found
    pause
    exit /b 1
)

if not exist "Icon.png" (
    echo Error: Icon.png not found
    pause
    exit /b 1
)

echo Checking files...
echo [✓] manifest.json
echo [✓] popup.html  
echo [✓] popup.css
echo [✓] popup.js
echo [✓] Icon.png

if exist "README.txt" (
    echo [✓] README.txt
) else (
    echo [!] README.txt not found - will be excluded
)

echo.

REM Create release folder
if exist "release-temp" rmdir /s /q "release-temp"
mkdir "release-temp"

echo Copying files to release folder...
copy "manifest.json" "release-temp\" > nul
copy "popup.html" "release-temp\" > nul
copy "popup.css" "release-temp\" > nul
copy "popup.js" "release-temp\" > nul
copy "Icon.png" "release-temp\" > nul

if exist "README.txt" (
    copy "README.txt" "release-temp\" > nul
)

echo Creating ZIP file...

REM Check if PowerShell is available for ZIP creation
powershell -command "& {Compress-Archive -Path 'release-temp\*' -DestinationPath '%FILENAME%' -Force}" 2>nul

if errorlevel 1 (
    echo.
    echo PowerShell ZIP creation failed. 
    echo Please manually create a ZIP file with the contents of the release-temp folder.
    echo Name it: %FILENAME%
    pause
) else (
    echo.
    echo ========================================
    echo  Release ZIP created successfully!
    echo ========================================
    echo.
    echo File: %FILENAME%
    echo Location: %CD%
    echo.
    echo Next steps:
    echo 1. Go to your GitHub repository
    echo 2. Click on "Releases"
    echo 3. Click "Create a new release"
    echo 4. Use tag: v%VERSION%
    echo 5. Upload this ZIP file as an asset
    echo 6. Fill in release notes from RELEASE_NOTES.md
    echo.
)

REM Clean up
rmdir /s /q "release-temp"

echo Press any key to exit...
pause > nul