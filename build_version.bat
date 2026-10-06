@echo off
title MYKE AI V1 - Build Version
echo.
echo ==========================================
echo  MYKE AI V1 - Creation du dossier version
echo ==========================================
echo.

set "ROOT=C:\Users\laddp\Music\AI V1\MYKE-AI"
cd /d "%ROOT%"

:: Etape 1: Installer les dependances (seulement si node_modules absent)
if not exist node_modules (
    echo [1/5] Installation des dependances...
    call npm install
    if errorlevel 1 (
        echo ERREUR: npm install a echoue !
        pause
        exit /b 1
    )
) else (
    echo [1/5] Dependances deja installees.
)

:: Etape 2: Build frontend
echo [2/5] Construction du frontend...
call npm run build
if errorlevel 1 (
    echo ERREUR: Build frontend echoue !
    pause
    exit /b 1
)

:: Etape 3: Creer le dossier version
echo [3/5] Creation du dossier version...
if not exist version mkdir version

:: Etape 4: Build installateur Windows (.exe)
echo [4/5] Construction de l'installateur Windows...
call npx electron-builder --win nsis
if errorlevel 1 (
    echo AVERTISSEMENT: Build .exe echoue, on continue quand meme...
)

:: Copier l'installateur dans version\
if exist "dist\MYKE AI V1 Setup.1.0.0.exe" (
    copy /Y "dist\MYKE AI V1 Setup.1.0.0.exe" "version\MYKE AI V1 Setup.1.0.0.exe" >nul
    echo      Installateur copie dans version\
) else (
    echo      AVERTISSEMENT: Installateur .exe introuvable dans dist\
)

:: Etape 5: Build Android (.apk / .aab) - necessite Android SDK
echo [5/5] Construction Android (si configure)...
if exist "android" (
    call npx cap sync android
    if exist "android\app\build\outputs\apk\release\app-release.apk" (
        copy /Y "android\app\build\outputs\apk\release\app-release.apk" "version\MYKE AI.apk" >nul
        echo      APK copie dans version\
    )
    if exist "android\app\build\outputs\bundle\release\app-release.aab" (
        copy /Y "android\app\build\outputs\bundle\release\app-release.aab" "version\MYKE AI.aab" >nul
        echo      AAB copie dans version\
    )
) else (
    echo      Dossier android introuvable - build Android ignore.
    echo      (Pour Android: npx cap add android, puis ouvrir Android Studio)
)

echo.
echo ==========================================
echo  Termine ! Contenu du dossier version\ :
echo ==========================================
dir /b version
echo.
pause
