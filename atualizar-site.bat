@echo off
chcp 65001 >nul
REM ==========================================================
REM  NXO Agencia - subir alteracoes para o GitHub (deploy Netlify)
REM  Repo: https://github.com/Milincon/nxo-site  (branch main)
REM  Na 1a vez conecta esta pasta ao GitHub; depois so commita+push.
REM ==========================================================

cd /d "%~dp0"

set "REPO=https://github.com/Milincon/nxo-site.git"

REM --- Verifica se git esta instalado ---
git --version >nul 2>&1
if errorlevel 1 (
  echo ERRO: Git nao encontrado. Instale em https://git-scm.com/download/win
  pause
  exit /b 1
)

REM --- 1a vez: pasta veio de ZIP, sem .git. Conecta ao repo. ---
if not exist ".git" (
  echo === Primeira execucao: conectando esta pasta ao GitHub ===
  git init
  git remote add origin "%REPO%"
  echo === Baixando historico do repositorio ===
  git fetch origin
  if errorlevel 1 (
    echo ERRO ao buscar o repositorio. Cheque a URL/conexao/credenciais.
    pause
    exit /b 1
  )
  REM Aponta para o topo do remoto mantendo SEUS arquivos como alteracoes
  git reset --soft origin/main
)

echo.
echo === Alteracoes a enviar ===
git status --short

echo.
git add -A

set "MSG=feat: remove travessoes, emojis de IA e tags de dobra; adiciona case demonstrativo LP advocacia (Dr. Lucas)"
git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo Nada novo para commitar. Seguindo para o push...
)

echo.
echo === Enviando para o GitHub (main) ===
git push origin HEAD:main
if errorlevel 1 (
  echo.
  echo ERRO no push. Provavelmente login/credenciais do GitHub.
  echo Faca login quando pedir, ou use um Personal Access Token como senha.
  pause
  exit /b 1
)

echo.
echo === Concluido! Netlify vai publicar em instantes. ===
pause
