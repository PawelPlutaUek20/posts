const db = require('../../db')
const { v4: uuidv4 } = require('uuid');

const User = function(user){
    this.id = uuidv4();
    this.email = user.email;
    this.password = user.password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
}

User.findOne = (email, result) => {
    db.query('SELECT * FROM users WHERE email = ?', email, (err, res) => {
        if (err) result(err, null);
        else result(null, res);
    })
}

User.create = (user, result) => {
    db.query('INSERT INTO users SET ?', user, (err, res) => {
        if (err) result(err, null);
        else result(null, res);
    })
}

module.exports = User