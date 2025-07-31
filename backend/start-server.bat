@echo off
echo Starting POS Backend Server...
echo.

:: Set Node.js options for Windows compatibility
set NODE_OPTIONS=--max-old-space-size=4096 --no-warnings

:: Try to start with nodemon first
echo Attempting to start with nodemon...
nodemon app.js

:: If nodemon fails, try with regular node
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Nodemon failed, trying with regular Node.js...
    node app.js
)

pause
