### Essa é uma aplicação Next.js iniciada com o comando create-next-app.

## Create-next-app

Configura Typescript, Next, React, React-DOM, ESLint, Tailwind CSS e APP Router;

## Minhas escolhas

Configurei Prettier, Jest, cz-git, commitlint e Github Actions.

## Iniciando o banco de dados

Para rodar o sistema de usuário e senha, faça o seguinte:

```bash
npm run docker:down
# Isso limpa o banco de dados, se ele já existir.
npm run docker:up
# Isso sobe o banco de dados.
# Crie outro terminal.
npm run migrate:up
# Isso cria a tabela `users` no banco de dados.
npm run dev
```

## Cadastrando o usuário

Do lado do botão terminal, tá escrito portas. Clica na porta 3000. Isso vai te redirecionar pro site.
Coloque qualquer email, desde que termine com @gmail.com. A senha deve ter letra maiúscula, 8 dígitos e algum símbolo.

## Consultando o banco de dados:

```bash
npm run docker:enter
# Isso entra no banco de dados.
SELECT \* FROM users
# Vai selecionar tudo da tabela users. O usuário que você cadastrou deve aparecer lá.
# Pra sair, digita \q
```

### Só isso 😘
