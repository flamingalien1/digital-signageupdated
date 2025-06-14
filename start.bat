@echo off
if not exist node_modules (
    call npm install
)
if not exist .env (
    call npm run setup
)
for /f "delims=" %%A in ('node -p "require('./keys.js').PORT"') do set PORT=%%A
echo Starting dev server on http://localhost:%PORT%
call npm run dev > crash.log 2>&1
if errorlevel 1 (
    type crash.log
    echo.
    echo App crashed. See crash.log for details.
    pause
)
