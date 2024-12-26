const jwt = require('jsonwebtoken');
const { SECRET, blacklist } = require('../secretBlacklist/constants');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token ausente' });
    if (blacklist.has(token)) return res.status(403).json({ message: 'Token inválido' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };