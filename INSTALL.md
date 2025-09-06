# EcoManager - Guia de Instalação Completo

## Pré-requisitos

### Software Necessário
- **Python 3.11+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **PostgreSQL 13+** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Git** - [Download Git](https://git-scm.com/)

### Verificação dos Pré-requisitos
```bash
python --version
node --version
npm --version
psql --version
```

## Instalação Rápida (Recomendado)

1. **Execute o script de instalação automática:**
   ```bash
   start.bat
   ```

2. **Para iniciar o desenvolvimento:**
   ```bash
   run-dev.bat
   ```

## Instalação Manual

### 1. Configuração do Banco de Dados

```bash
# Conectar ao PostgreSQL como superusuário
psql -U postgres

# Executar script de inicialização
\i scripts/init-database.sql

# Sair do PostgreSQL
\q
```

### 2. Configuração do Backend

```bash
# Navegar para o diretório do backend
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual (Windows)
venv\Scripts\activate

# Ativar ambiente virtual (Linux/Mac)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp env.example .env
# Editar .env com suas configurações

# Executar migrações
alembic upgrade head

# Inserir dados de exemplo
psql -U ecomanager -d ecomanager -f ../scripts/sample-data.sql

# Iniciar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Configuração do Frontend

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## Acessos

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **Documentação da API:** http://localhost:8000/docs
- **Admin do Banco:** http://localhost:8000/redoc

## Usuários de Exemplo

### Credenciais de Login
- **Administrador:** admin / password
- **Gerente:** manager / password
- **Analista:** analyst / password

## Estrutura do Projeto

```
SyncaEco/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── core/           # Configurações e utilitários
│   │   ├── models/         # Modelos do banco de dados
│   │   ├── routes/         # Endpoints da API
│   │   ├── schemas/        # Schemas Pydantic
│   │   └── services/       # Lógica de negócio
│   ├── alembic/            # Migrações do banco
│   └── requirements.txt    # Dependências Python
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── contexts/       # Contextos React
│   │   ├── pages/          # Páginas da aplicação
│   │   └── services/       # Serviços de API
│   └── package.json        # Dependências Node.js
├── shared/                 # Tipos compartilhados
├── scripts/                # Scripts de automação
├── start.bat              # Instalação automática
└── run-dev.bat            # Inicialização do desenvolvimento
```

## Funcionalidades Implementadas

### ✅ Backend
- [x] Autenticação JWT
- [x] CRUD de usuários
- [x] CRUD de processos
- [x] CRUD de localizações
- [x] CRUD de alertas
- [x] Métricas ambientais
- [x] Dashboard com dados em tempo real
- [x] Controle de acesso baseado em roles

### ✅ Frontend
- [x] Interface moderna e responsiva
- [x] Sistema de autenticação
- [x] Dashboard interativo
- [x] Navegação por sidebar
- [x] Controle de acesso com PermissionGate
- [x] Integração com API
- [x] Design system com Tailwind CSS

### 🔄 Em Desenvolvimento
- [ ] Páginas completas de monitoramento
- [ ] Gráficos e visualizações
- [ ] Upload de arquivos
- [ ] Notificações em tempo real
- [ ] Relatórios avançados
- [ ] Mapa interativo

## Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **Alembic** - Sistema de migrações
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação segura
- **Pydantic** - Validação de dados

### Frontend
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápida
- **Tailwind CSS** - Framework CSS utilitário
- **React Query** - Gerenciamento de estado
- **React Router** - Roteamento
- **Lucide React** - Ícones

## Comandos Úteis

### Backend
```bash
# Criar nova migração
alembic revision --autogenerate -m "descrição"

# Aplicar migrações
alembic upgrade head

# Reverter migração
alembic downgrade -1

# Formatar código
black .
isort .

# Executar testes
pytest
```

### Frontend
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

## Solução de Problemas

### Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
# Windows: Serviços > PostgreSQL
# Linux: sudo systemctl status postgresql

# Verificar conexão
psql -U ecomanager -d ecomanager -h localhost
```

### Erro de Porta em Uso
```bash
# Verificar portas em uso
netstat -ano | findstr :8000
netstat -ano | findstr :5173

# Matar processo
taskkill /PID <PID> /F
```

### Erro de Dependências
```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
rm -rf node_modules package-lock.json
npm install
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
