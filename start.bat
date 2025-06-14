@echo off
if not exist node_modules (
    npm install
)
if not exist .env (
    npm run setup
)
cmd /c "npm run dev"
