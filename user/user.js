const { DataTypes } = require('sequelize');
const { sequelize } = require('../data/database');
const { v4: uuidv4 } = require('uuid');

// Modelo de Usuário
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = { User };