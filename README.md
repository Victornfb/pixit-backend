## 💻 Projeto

O projeto Pixit Backend é uma API CRUD de usuários que utiliza arquitetura limpa, além dos princípios SOLID e TDD.

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Swagger](https://swagger.io/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)

## 🚀 Como executar

1. Instale o MySQL
2. Execute na porta '3306'
3. Crie um banco de dados chamado "pixit"

`Obs.: Por padrão o projeto utiliza no MySQL o usuário 'root' e senha '', porém é possível alterar as credencias no arquivo ormconfig.json`

4. Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Victornfb/pixit-backend.git
$ cd pixit-backend
```

5. Instale as dependências

```bash
$ npm install
```

6. Execute as *migrations* para criar as tabelas

```bash
$ npm run typeorm migration:run
```

7. Crie um usuário inicial utilizando a *seed*

```bash
$ npm run seed:admin

# O usuário criado terá as seguintes credenciais:
{
  email: "admin@pixit.com.br",
  password: "adminpixit"
}
```

8. Execute o projeto

```bash
$ npm run dev
```

A API estará disponível no seu browser pelo endereço http://localhost:3333.

A documentação estará disponível pelo endereço http://localhost:3333/api-docs/.

## 📝 Licença

Esse projeto está sob a licença MIT. Para mais detalhes:

<a href="https://opensource.org/licenses/MIT" target="_blank"><img alt="Licença" src="https://img.shields.io/badge/license-MIT-0a66c2?style=flat-square"></a>

Feito por [Victor Nunes](https://victornfb.com.br/)

[![Linkedin Badge](https://img.shields.io/badge/-Victor%20Nunes-0a66c2?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victornfb/)](https://www.linkedin.com/in/victornfb/)
[![Gmail Badge](https://img.shields.io/badge/-victornfb@outlook.com-ea4435?style=flat-square&logo=Gmail&logoColor=white&link=mailto:victornfb@outlook.com)](mailto:victornfb@outlook.com)
