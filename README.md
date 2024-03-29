# Ioasys Teste

## GitHub

`<link>`: https://github.com/CarlosHSilvaVieira/empresas-backend

## Inicialização

Execute o comando abaixo para instalar as dependências do sistema

`$ npm install`

## Execução da API

## PORTA de execução da API

A porta utilizada pela API será por padrão a `3000`. Caso queira alterar a porta, navegue até o arquivo ServerConstants.ts localizado em `./src/utils/ServerConstants.ts` e altere o atributo `port` com o valore desejado.

## Execução em ambiente de desenvolvimento

`npm run dev`

## Execução em ambiente de produção

`npm run prod`

Após a execução do comando de qualquer um dos comandos acima deve ser retornada a seguinte
mensagem no terminal `Express server listening on port 3000`

## Resolução de erros

Caso Você receba o seguinte erro no terminal da aplicação: 

`ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client`

Por favor atualize o seu Client do MYSQL ou altere a senha do seu usuário no banco de dados por meio do seguinte comando:

`ALTER USER 'USER'@'HOST' IDENTIFIED WITH mysql_native_password BY 'PASSWORD'`

Onde

USER: será o nome do seu usuário

HOST: será a URL do host

PASSWORD: será sua nova senha 

Exemplo: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'q1w2e3r4'`

## Conexão com o MYSQL

Sugiro utilizar o usuário `root` com a senha `q1w2e3r4` com o banco `empresas_backend`

Porém caso queira alterar esses dados, navegue até o arquivo ServerConstants.ts localizado em `./src/utils/ServerConstants.ts` e altere os atributos `hostDB`, `portDB`, `userDB`, `passDB`, `schemaDB` com os valores desejados.

## Estruturação do projeto

Esta seção define a estrutura de pastas e arquivos do projeto

- src
    - controllers
    - models
    - routes
    - utils
    - app.ts
    - server.ts

    ### app.ts

    Neste arquivo é criado o servidor express

    ### server.ts

    Neste arquivo o servidor criado no arquivo app.ts é colocado em execução na porta definida (padrão: 3000)

    ### controllers

    Nessa pasta ficam os arquivos que executam as regras de negócio da aplicação

    ### models

    Nessa pasta ficam os arquivos executam os comandos SQL na base de dados

    ### routes

    Nessa pasta ficam os arquivos que criam as rotas da API

    ### utils

    Nessa pasta ficam os arquivos que exportam as variáveis globais do sistema

## API

### Autenticação
    
`<link>`: http://localhost:3000/api/v1/users/auth/sign_in

Método: POST

Neste endpoint é criado o token de acesso para um usuário que esteja presente no banco de dados.

O tempo de duração padrão do token é de uma hora.

Exemplo de requisição:

    {
        "email" : "lucasrizel@ioasys.com.br",
        "password" : "12345678"
    }

Exemplo de retorno: 

    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVpZCI6IjhlZWM0NDEyLWNkZWEtMTFlOS1iMDdhLTcwNGQ3YmNmMDJlYyIsImVtYWlsIjoibHVjYXNyaXplbEBpb2FzeXMuY29tLmJyIiwicGFzc3dvcmQiOiIxMjM0NTY3OCJ9LCJpYXQiOjE1Njc2MDc5NDQsImV4cCI6MTU2NzYwOTc0NH0.vYCscl0jSY5Egt-Wnxtq-WyQaE2XBFtQm1mPqNEkPdA",
        "uid": "8e8c4412-cd3a-1149-b24a-704d7bcfwedsz",
        "client": "lucasrizel@ioasys.com.br"
    }

### Filtro de empresas por nome e tipo

`<link>`: http://localhost:3000/api/v1/enterprises?enterprise_types=1&name=aQm

Método: GET

Neste endpoint é retornada uma lista de empresas de acordo com os filtros `enterprise_types` e 
`name` especificados na url do endpoint

Obs: Não se esqueça de inserir no header da requisição os valores de acesso `access-token`, `uid` e `client`

Exemplo de retorno: 

    {
        "data": [
            {
                "id": 17,
                "name": "aQm",
                "type": {
                    "id": 1,
                    "name": "pequena"
                }
            }
        ]
    }


### Detalhamento de empresas

`<link>`: http://localhost:3000/api/v1/enterprises/:id

Método: GET

Neste endpoint é retornado os detalhes de uma empresa. A consulta é realizada via id da empresa
fornecido na url do endpoint

Obs: Não se esqueça de inserir no header da requisição os valores de acesso `access-token`, `uid` e `client`

`Exemplo`: http://localhost:3000/api/v1/enterprises/16

Exemplo de retorno: 

    {
        "id": 16,
        "name": "empresa startup 4",
        "type": {
            "id": 4,
            "name": "startup"
        }
    }


### Listagem de empresas

`<link>`: http://localhost:3000/api/v1/enterprises/all

Método: GET

Neste endpoint é retornada a listagem de empresas. 

Obs: Não se esqueça de inserir no header da requisição os valores de acesso `access-token`, `uid` e `client`

Exemplo de retorno: 

    {
        "data": [
            {
                "id": 17,
                "name": "aQm",
                "type": {
                    "id": 1,
                    "name": "pequena"
                },
                {
                    "id": 2,
                    "name": "empresa pequena 2",
                    "type": {
                        "id": 1,
                        "name": "pequena"
                    }
                },
                ...
            }
        ]
    }
