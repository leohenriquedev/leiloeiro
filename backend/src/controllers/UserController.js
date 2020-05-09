const db = require('../database/connection.js');
const authJWT = require('../auth.js');

module.exports = {

    create(req, res) {
        var filter = [
            req.body.username,
            req.body.password,
            req.body.email,
            req.body.type
        ];

        db.query('INSERT INTO users(username, password, email, type) VALUES (?,?,?,?)', filter, (err, results, fields) => {
            if (err) throw err;
            res.send({ message: 'Created' });
        });
    },

    getAll(req, res) {
        db.query('SELECT * FROM users', (err, results, fields) => {
            if (err) throw err;
            res.send({ data: results });
        });
    },

    getById(req, res) {
        var filter = [
            req.params.id
        ];
        db.query('SELECT * FROM users WHERE id = ?', filter, (err, results, fields) => {
            if (err) throw err;
            res.send({ data: results });
        });
    },

    logIn(req, res) {
        var filter = [
            req.body.username,
            req.body.password
        ];
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', filter, (err, results, fields) => {
            if (results.length) {
                const token = authJWT.generateJWT(results.id);
                res.status(200).send({ auth: true, token: token, data: results });
                req.io.emit('message', results);

            }
            else {
                res.status(500).send({ message: 'Invalid username/password!' });
            }
        });
    }

};