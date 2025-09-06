@echo off
color 0A
title EcoManager - Sistema Completo

echo.
echo  ======================================================
echo    EcoManager - Sistema de Gestao Ambiental
echo    Inicializacao Completa (Backend + Frontend)
echo  ======================================================
echo.

REM Verificar Python
echo [*] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo    [X] Python nao encontrado!
    echo.
    echo    Por favor instale Python 3.11 ou superior:
    echo    https://www.python.org/downloads/
    echo.
    echo    Durante a instalacao, marque "Add Python to PATH"
    echo.
    pause
    exit /b 1
)
echo    [OK] Python encontrado

REM Verificar Node.js
echo [*] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo    [X] Node.js nao encontrado!
    echo.
    echo    Por favor instale Node.js 18 ou superior:
    echo    https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo    [OK] Node.js encontrado

echo.
echo  ======================================================
echo    CONFIGURANDO BACKEND
echo  ======================================================
echo.

cd backend

if not exist "venv" (
    echo [*] Criando ambiente virtual Python...
    python -m venv venv
)

echo [*] Ativando ambiente virtual...
call venv\Scripts\activate.bat

echo [*] Instalando dependencias do backend...
pip install fastapi uvicorn sqlalchemy pydantic pydantic-settings email-validator python-jose passlib python-multipart python-dotenv

echo.
echo  ======================================================
echo    CONFIGURANDO FRONTEND
echo  ======================================================
echo.

cd ..
cd frontend

echo [*] Limpando cache do Vite...
if exist "node_modules\.vite" (
    rmdir /s /q node_modules\.vite
)

echo [*] Instalando dependencias do frontend...
call npm install

cd ..

echo.
echo  ======================================================
echo    INICIANDO SERVICOS
echo  ======================================================
echo.

echo [1/2] Iniciando Backend (porta 8000)...
start "Backend - EcoManager" cmd /c "cd backend && venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo [*] Aguardando backend inicializar...
timeout /t 5 /nobreak >nul

echo [2/2] Iniciando Frontend (porta 5173)...
start "Frontend - EcoManager" cmd /c "cd frontend && npm run dev"

echo.
echo  ======================================================
echo    SISTEMA INICIADO COM SUCESSO!
echo  ======================================================
echo.
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo    Credenciais de teste:
echo    Usuario: admin
echo    Senha: qualquer senha (modo demo)
echo.
echo  ======================================================
echo.
echo  Modos de operacao:
echo    1. Modo Frontend (Demo): O frontend usa dados simulados
echo    2. Modo Completo: Se o backend estiver funcionando, 
echo       o frontend tentara se conectar a ele
echo.
echo  ======================================================
echo.
echo  Pressione qualquer tecla para abrir o navegador...
pause >nul

start http://localhost:5173

echo.
echo  As janelas do Backend e Frontend estao rodando.
echo  Para parar os servicos, feche as janelas do terminal.
echo.
pause
