@echo off
if not exist node_modules (
    call npm install
)
if not exist .env (
    call npm run setup
)
call npm run dev
