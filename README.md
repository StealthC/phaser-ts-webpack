# phaser-ts-webpack-gulp
Esqueleto para criação de games usando Phaser e Typescript.

Tem as seguintes características:

* Usa o typings para gerenciar as declarações typescript.
* Usa o webpack como bundler.
* Usa o webpack-dev-server como servidor de testes.
* Usa gulp como executor de tarefas.
* Declara Phaser como objeto global (não é necessário fazer o import da biblioteca).
* Pode usar tanto o gulp quanto npm na execução das tarefas principais pela linha de comando.

## Antes de começar:

`npm install`

## Comandos npm:

`npm start` ou `npm test` - Inicia o servidor de teste. (Não é necessário executar o build antes).

`npm run build` - Cria o diretório "build" com todos os arquivos necessários para a produção, junto com o pacote javascript com todas as dependências.

## Comandos gulp:

`gulp` - Inicia o servidor de teste. (Não é necessário executar o build antes).

`gulp build` - Cria o diretório "build" com todos os arquivos necessários para a produção, junto com o pacote javascript com todas as dependências.