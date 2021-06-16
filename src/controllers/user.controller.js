const User = require('../models/user.model');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
    const new_user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    User.create(new_user, (err, user) => {
        if (err) res.send(err);
        else res.send(user)
    })
}

exports.signin = (req, res) => {
    User.findOne(req.body.email, (err, user) => {
        if (err) res.send(err);
        else if (user.length) {
            bcrypt.compare(req.body.password, user[0].password, (bErr, bResult) =>{
                if (bErr) res.send(bErr)
                else if (bResult) res.send(jwt.sign({ id: user[0].id }, process.env.SECRETKEY))
                else res.send(bResult)
            })
        }
        else res.send(user)
    })
}