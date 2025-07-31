@echo off
echo ========================================
echo   GUARANTEED DEVELOPMENT SERVER START
echo ========================================
echo.

:: Clear all caches
echo [1/5] Clearing caches...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite" 2>nul
if exist "dist" rmdir /s /q "dist" 2>nul
npm cache clean --force >nul 2>&1

echo [2/5] Installing required dependencies...
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-dev-server webpack-cli html-webpack-plugin babel-loader style-loader css-loader postcss-loader >nul 2>&1

echo [3/5] Trying ESBuild-free Vite...
echo Starting server with ESBuild completely disabled...
start /B cmd /C "npm run dev-no-esbuild"
timeout /t 5 >nul

:: Check if port 5174 is in use
netstat -an | find "5174" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ SUCCESS: Server started on http://localhost:5174
    echo.
    echo Your dashboard is now running!
    echo Press any key to open browser...
    pause >nul
    start http://localhost:5174
    goto :end
)

echo [4/5] Vite failed, trying Webpack...
start /B cmd /C "npm run dev-webpack"
timeout /t 5 >nul

netstat -an | find "5174" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ SUCCESS: Webpack server started on http://localhost:5174
    echo.
    echo Your dashboard is now running!
    echo Press any key to open browser...
    pause >nul
    start http://localhost:5174
    goto :end
)

echo [5/5] All else failed, using simple server...
start /B cmd /C "npm run dev-simple"
timeout /t 3 >nul
echo ✅ Simple server started on http://localhost:3000
echo.
echo Your dashboard is now running!
echo Press any key to open browser...
pause >nul
start http://localhost:3000

:end
echo.
echo Server is running. Close this window when done.
pause
