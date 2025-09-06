@echo off
color 0A
title EcoManager - Frontend Demo

echo.
echo  ======================================================
echo    EcoManager - Sistema de Gestao Ambiental
echo    MODO DEMONSTRACAO (FRONTEND APENAS)
echo  ======================================================
echo.

cd frontend

echo [1/2] Limpando cache do frontend...
if exist "node_modules\.vite" (
    rmdir /s /q node_modules\.vite
)

echo [2/2] Iniciando frontend em modo demonstracao...
echo.
echo  ======================================================
echo    INFORMACOES IMPORTANTES
echo  ======================================================
echo.
echo    * Este modo usa dados SIMULADOS
echo    * Nao e necessario backend ou banco de dados
echo    * Todos os dados sao gerados localmente
echo    * Perfeito para demonstracao do sistema
echo.
echo  ======================================================
echo.
echo Iniciando servidor...

npm run dev

echo.
echo  ======================================================
echo    SISTEMA INICIADO COM SUCESSO!
echo  ======================================================
echo.
echo    Acesse: http://localhost:5173
echo.
echo    Credenciais:
echo    Usuario: admin
echo    Senha: qualquer_senha
echo.
echo  ======================================================
echo.
echo Pressione qualquer tecla para abrir o navegador...
pause >nul

start http://localhost:5173

echo.
echo Para encerrar, feche esta janela.
pause
