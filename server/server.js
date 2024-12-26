
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('../data/database');
const routes = require('../routes/index');
const app = express();
const PORT = 8081;

// Middleware
app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static('public'));

// Configuração das rotas
app.use('/api', routes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota para a raiz
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});
