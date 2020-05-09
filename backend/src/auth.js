require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

module.exports = {
    
    generateJWT(id) {
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 86400
        });
        return token;
    },

    verifyJWT(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No Token provided' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });

            req.userId = decoded.id;
            next();
        });
    }
};