const posts = require("../controllers/post.controller.js");
const users = require("../controllers/user.controller.js");

const middleware = require('../middleware/middleware.js')

module.exports = (app) => {
    app.post("/", [middleware.isLoggedIn], posts.create);

    app.get("/", posts.findAll);

    app.get("/:id", posts.findOne);

    app.put("/:id", [middleware.isLoggedIn], posts.update);

    app.delete("/:id", [middleware.isLoggedIn], posts.delete);


    app.post('/signup', users.signup);

    app.post('/signin', users.signin);
}   

