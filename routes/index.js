const express = require('express');
const { User } = require('../user/user');
const { UsedToken } = require('../data/database');
const { authenticateToken } = require('../authMiddleware/authenticateToken');
const { SECRET, blacklist } = require('../secretBlacklist/constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Cadastro de usuário
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

        // Exibe o token gerado no console
        console.log(`Token gerado para o usuário ${email}: ${token}`);

        res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
    }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token recebido para logout:', token);

    if (token) {
        blacklist.add(token);

        try {
            // Adicionar token à tabela de tokens usados
            await UsedToken.create({ token });
            console.log(`Token adicionado à tabela UsedTokens: ${token}`);
        } catch (err) {
            console.error('Erro ao registrar o token usado:', err);
        }

        console.log(`Token expirado adicionado à blacklist: ${token}`);
    } else {
        console.log('Nenhum token encontrado para adicionar à blacklist.');
    }

    res.status(200).json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
