@echo off
echo Starting Vite Development Server (ESBuild-Free Mode)...
echo.

:: Set Node.js options for Windows compatibility
set NODE_OPTIONS=--max-old-space-size=4096 --no-warnings --experimental-loader

:: Clear ALL caches first
echo Clearing all caches...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist "dist" rmdir /s /q "dist"
npm cache clean --force

echo.
echo Installing SWC plugin if not present...
npm install --save-dev @vitejs/plugin-react-swc

echo.
echo Starting server with ESBuild completely disabled...
echo Using SWC for React compilation instead of ESBuild
echo Press Ctrl+C to stop the server
echo.

:: Force Vite to use SWC and disable ESBuild completely
set VITE_ESBUILD_DISABLE=true
node --max-old-space-size=4096 --no-warnings ./node_modules/vite/bin/vite.js --host --port 5174 --force

pause
