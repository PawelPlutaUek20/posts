const jwt = require("jsonwebtoken");

isLoggedIn = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
        if (err) return res.send(err)
        else {
            req.userData = decoded;
            next();
        }
    });   
}

const auth = {
    isLoggedIn: isLoggedIn
}

module.exports = auth