# EcoManager - Modo Demonstração

## Sobre o Modo Demonstração

Este modo permite executar o EcoManager **apenas com o frontend**, sem necessidade de backend ou banco de dados. Perfeito para demonstrações e testes rápidos.

## Como Executar

Execute o arquivo:

```
frontend-only.bat
```

## Funcionalidades no Modo Demo

- **Login Simulado**: Qualquer usuário/senha funciona
- **Dashboard Completo**: Com gráficos e indicadores
- **Processos**: Visualização de processos ambientais
- **Monitoramento**: Dados de qualidade ambiental
- **Recursos Hídricos**: Monitoramento de água
- **Flora & Fauna**: Dados de biodiversidade
- **Equipe**: Gerenciamento de usuários
- **Localizações**: Pontos de monitoramento
- **Alertas**: Sistema de notificações
- **Configurações**: Preferências do sistema

## Credenciais de Acesso

- **URL**: http://localhost:5173
- **Usuário**: admin
- **Senha**: qualquer_senha

## Observações

- Todos os dados são simulados e gerados localmente
- As alterações não são persistidas entre sessões
- Os avisos no console sobre React Router são normais e não afetam o funcionamento

## Requisitos

- Node.js 18+
- NPM 8+

## Solução de Problemas

Se encontrar algum erro:

1. Verifique se o Node.js está instalado corretamente
2. Execute `cd frontend && npm install` para garantir que todas as dependências estão instaladas
3. Tente limpar o cache do Vite: `cd frontend && rmdir /s /q node_modules\.vite`

## Próximos Passos

Para uma instalação completa com backend e banco de dados, consulte o arquivo INSTALL.md na raiz do projeto.
