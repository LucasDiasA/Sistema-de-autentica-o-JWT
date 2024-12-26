const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

// Configuração de conexão inicial para criar o banco, se necessário
const DATABASE_NAME = 'test_db';

async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
        });

        // Criar o banco de dados, se não existir
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE_NAME}\`;`);
        console.log(`Banco de dados "${DATABASE_NAME}" verificado/criado com sucesso.`);
        await connection.end();
    } catch (err) {
        console.error('Erro ao verificar/criar o banco de dados:', err);
        process.exit(1);
    }
}

// Inicialize o banco antes de configurar o Sequelize
initializeDatabase().then(() => {
    console.log('Banco de dados inicializado.');
});

const sequelize = new Sequelize(DATABASE_NAME, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Função para formatar data/hora no formato pt-BR
function formatDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

// Definição do modelo UsedToken
const UsedToken = sequelize.define('UsedToken', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: formatDate, // A data/hora formatada é gerada aqui
    },
}, {
    timestamps: false, // Desabilita a criação automática de timestamps
});

sequelize.sync()
    .then(() => console.log('Modelos sincronizados com o banco de dados.'))
    .catch(err => console.error('Erro ao sincronizar modelos:', err));

module.exports = { sequelize, UsedToken };
