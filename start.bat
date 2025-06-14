@echo off
if not exist node_modules (
    call npm install
)
if not exist .env (
    call npm run setup
)
call npm run dev > crash.log 2>&1
if errorlevel 1 (
    type crash.log
    echo.
    echo App crashed. See crash.log for details.
    pause
)
