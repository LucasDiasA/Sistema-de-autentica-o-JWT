# Sistema de Login e Logout com JWT

## Descrição
Este projeto é um sistema de autenticação simples que permite cadastro, login e logout de usuários, utilizando JSON Web Tokens (JWT) para segurança. Inclui tanto o backend quanto o frontend, utilizando tecnologias modernas para gerenciamento de dados e interfaces.

---

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework minimalista para construção de APIs.
- **Sequelize**: ORM para interagir com o banco de dados MySQL.
- **JWT (jsonwebtoken)**: Para autenticação segura de usuários.
- **bcrypt**: Para hashing de senhas de usuários.

### Frontend
- **HTML5 e CSS3**: Estruturação e estilo da interface.
- **JavaScript**: Para manipulação da interface e comunicação com a API.

### Banco de Dados
- **MySQL**: Banco de dados relacional utilizado para armazenar informações de usuários.
- **MySQL2**: Biblioteca para conexão ao banco de dados.
- **uuid**: Geração de identificadores únicos universais para usuários.

---

## Rotas Principais

### Usuários
- `POST /api/register`: Cadastro de novos usuários.
- `POST /api/login`: Login de usuários.
- `POST /api/logout`: Logout e invalidação do token JWT.
- `GET /api/session`: Verificação da validade do token JWT.

