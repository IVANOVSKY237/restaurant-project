@echo off
echo Starting Vite development server...
echo Press Ctrl+C once to stop the server cleanly
echo.

:: Start the server
start /B cmd /C "npx vite --host --port 5174 & pause"

echo.
echo Server started in a new window.
echo You can close that window to stop the server.
