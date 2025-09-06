-- Script de inicialização do banco de dados
-- Execute este script no PostgreSQL para criar o banco e usuário

-- Criar usuário
CREATE USER ecomanager WITH PASSWORD 'password';

-- Criar banco de dados
CREATE DATABASE ecomanager OWNER ecomanager;

-- Conectar ao banco de dados
\c ecomanager;

-- Dar privilégios ao usuário
GRANT ALL PRIVILEGES ON DATABASE ecomanager TO ecomanager;
GRANT ALL PRIVILEGES ON SCHEMA public TO ecomanager;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecomanager;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecomanager;

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
