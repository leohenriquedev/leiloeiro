const db = require('../database/connection.js');


module.exports = {

    create(req, res) {

        var filter = [
            req.body.act_room_name,
            req.body.act_username,
            req.body.act_email,
            req.body.act_value,
            req.file.filename,
        ];
        try {
            db.query('INSERT INTO auction(act_room_name, act_username, act_email, act_value, act_image) VALUES(?,?,?,?,?)', filter, (err, results, fields) => {
                res.send({ message: 'Created' });

                db.query('SELECT * from auction WHERE act_id = ? ', results.insertId, (err, results, fields) => {
                    req.io.emit('newAuction', { data: results });
                });

            });
        }
        catch (err) {
            console.log(err);
        }
    },

    getAll(req, res) {
        try {
            db.query('SELECT * FROM auction ORDER BY act_id DESC', (err, results, fields) => {
                res.send({ data: results });
            });
        }
        catch (err) {
            console.log(err);
        }
    },

    getById(req, res) {
        const filter = [
            req.params.act_id
        ];
        try {
            db.query('SELECT * FROM auction WHERE act_id = ?', filter, (err, results, fields) => {
                res.send({ data: results });
            });
        }
        catch (err) {
            console.log(err);
        }
    }

}