# Aplicação de Calendário - Frontend

Este projeto é o frontend da aplicação de Calendário desenvolvida com React e Vite.

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
VITE_API_URL=
```

A variável `VITE_API_URL` define o endereço base da API do backend. Ajuste conforme necessário para seu ambiente de desenvolvimento ou produção.

## Estrutura do Projeto

O projeto está organizado nas seguintes pastas principais:

- `src/auth`: Componentes e páginas relacionadas à autenticação
- `src/calendar`: Componentes, helpers e páginas do calendário
- `src/hooks`: Hooks personalizados
- `src/router`: Configuração de rotas
- `src/store`: Gerenciamento de estado (Redux)

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Visualiza a versão de produção localmente

## Tecnologias

Este template fornece uma configuração mínima para trabalhar com React no Vite com HMR e algumas regras ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh

## Expandindo a configuração ESLint

Se você estiver desenvolvendo uma aplicação para produção, recomendamos usar TypeScript e habilitar regras de lint com verificação de tipos. Confira o [modelo TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar TypeScript e [`typescript-eslint`](https://typescript-eslint.io) em seu projeto.
