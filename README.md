# EcoManager - Sistema de Gestão Ambiental

Sistema completo para gestão de processos e licenças ambientais com interface moderna e intuitiva.

## Modos de Execução

### 1. Modo Demo (Apenas Frontend)
```bash
frontend-only.bat
```
- Executa apenas o frontend com dados simulados
- Não requer backend ou banco de dados
- Perfeito para demonstrações rápidas

### 2. Modo Completo (Backend + Frontend)
```bash
start-completo.bat
```
- Inicia tanto o backend quanto o frontend
- Configura ambiente Python e Node.js
- Instala todas as dependências necessárias
- Executa os serviços em janelas separadas

## Credenciais de Acesso

- **URL**: http://localhost:5173
- **Usuário**: admin
- **Senha**: qualquer senha (modo demo)

## Estrutura do Projeto

```
SyncaEco/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── contexts/    # Contextos React
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── services/    # Serviços de API
│   │   └── types/       # Tipos TypeScript
│   └── package.json     # Dependências Node.js
├── backend/           # API FastAPI
│   ├── app/
│   │   ├── core/        # Configurações e utilitários
│   │   ├── models/      # Modelos de dados
│   │   ├── routes/      # Endpoints da API
│   │   ├── schemas/     # Schemas Pydantic
│   │   └── services/    # Lógica de negócio
│   └── requirements.txt # Dependências Python
├── frontend-only.bat  # Executa apenas o frontend (modo demo)
└── start-completo.bat # Executa backend + frontend
```

## Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- PermissionGate
- Lucide React (ícones)

### Backend
- FastAPI
- Python 3.11+
- SQLAlchemy
- Pydantic
- SQLite (banco de dados)
- JWT Authentication

## Requisitos

- Node.js 18+
- Python 3.11+

## Funcionalidades

- Dashboard com métricas em tempo real
- Gestão de processos ambientais
- Monitoramento de recursos hídricos
- Controle de flora e fauna
- Sistema de alertas e notificações
- Gestão de equipe e localizações
- Relatórios e análises
- Controle de acesso baseado em permissões