const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); 

dotenv.config();

function verifyToken(req, res, next) {
    const tokenToVerify = process.env.TOKEN || req.headers['x-auth-token'];
    if (!tokenToVerify) return res.status(401).redirect('/login')

    try {
        const verified = jwt.verify(tokenToVerify, process.env.SECRET_KEY);
        req.user = verified;
        return next();
    } catch (err) {
        res.sendStatus(401).send(err.message);
    }
}

module.exports = verifyToken;