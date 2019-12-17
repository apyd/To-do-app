const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Invalid token');

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        return next();
    } catch (err) {
        res.sendStatus(401).send(err.message);
    }
}

module.exports = verifyToken;