# Aplicação de Calendário - Frontend

Este projeto é o frontend da aplicação de Calendário desenvolvida com React e Vite, proporcionando uma interface interativa para gerenciamento de eventos e compromissos.

## Funcionalidades Principais

- **Autenticação de Usuários**: Sistema completo de login e registro
- **Gerenciamento de Eventos**: Criação, edição e exclusão de eventos no calendário
- **Visualizações Múltiplas**: Modo dia, semana, mês e agenda
- **Proteção de Eventos**: Apenas o criador do evento pode editá-lo ou excluí-lo
- **Interface Responsiva**: Design adaptável para diferentes dispositivos

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
VITE_API_URL=http://localhost:4000/api
```

A variável `VITE_API_URL` define o endereço base da API do backend. Ajuste conforme necessário para seu ambiente de desenvolvimento ou produção.

## Estrutura do Projeto

O projeto está organizado nas seguintes pastas principais:

- `src/api`: Configuração e instância do Axios para comunicação com o backend
- `src/auth`: Componentes e páginas relacionadas à autenticação de usuários
- `src/calendar`: Componentes, helpers e páginas do calendário
- `src/hooks`: Hooks personalizados para gerenciamento de estado e ações
- `src/router`: Configuração de rotas e proteção de rotas privadas
- `src/store`: Gerenciamento de estado global com Redux Toolkit

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Visualiza a versão de produção localmente
- `npm run test`: Executa os testes em modo de observação contínua
- `npm run lint`: Executa a verificação de lint no código

## Tecnologias Utilizadas

- **React 19**: Biblioteca principal para construção da interface
- **Vite 6**: Ferramenta de build e desenvolvimento
- **Redux Toolkit**: Gerenciamento de estado global
- **React Router 6**: Navegação entre páginas
- **React Big Calendar**: Componente de calendário interativo
- **DateFns**: Biblioteca para manipulação de datas
- **Axios**: Cliente HTTP para comunicação com o backend
- **Bootstrap 5**: Framework CSS para estilização
- **SweetAlert2**: Notificações e alertas personalizados
- **Jest & React Testing Library**: Ferramentas para testes

## Sistema de Autenticação

O sistema implementa autenticação baseada em tokens JWT, com armazenamento local para persistência entre sessões. Possui renovação automática de tokens, registro de novos usuários e logout seguro.

## Gerenciamento de Eventos

Os eventos são sincronizados com o backend e possuem um mecanismo de proteção que permite apenas ao criador do evento editá-lo ou excluí-lo. As operações incluem:

- Criar novos eventos
- Visualizar detalhes de eventos existentes
- Editar informações de eventos (título, data, hora, notas)
- Excluir eventos

## Integração com Backend

O frontend se comunica com uma API RESTful desenvolvida em Node.js/Express, utilizando Axios para as requisições HTTP. Todas as operações de autenticação e manipulação de eventos são validadas no servidor.

## Contribuição

Para contribuir com o projeto, siga estas etapas:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
