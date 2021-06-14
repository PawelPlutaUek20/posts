const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Post {
    constructor(post){
        this.id = null
        this.title = post.title;
        this.lead = post.lead;
        this.content = post.content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.author = null
    }
}

class User {
    constructor(user){
        this.id = user.id
        this.email = user.email;
        this.password = user.password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          process.env.SECRETKEY
        );
        req.userData = decoded;
        next();
      } catch (err) {
        return res.status(401).send({
          msg: 'Your session is not valid!'
        });
      }
}

app.get('/', async(req, res) => {
    const results = await db.promise().query('SELECT * FROM posts');
    res.status(200).send(results[0]);
})

app.get('/:id', async(req,res) => {
    const results = await db.promise().query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    res.status(200).send(results[0]);
})

app.delete('/:id', isLoggedIn, async(req, res) => {
    const results = await db.promise().query('DELETE FROM posts WHERE id = ? AND author = ?', [req.params.id, req.userData.id]);
    res.status(200).send(results[0]);
})

app.post('/', isLoggedIn, async(req, res) => {
    const post = new Post(req.body);
    post.id = uuidv4()
    post.author = req.userData.id;
    const results = await db.promise().query(
        'INSERT INTO posts SET ?',
        [post]
    );
    res.status(200).send(results[0]);
})

app.put('/:id', isLoggedIn, async(req, res) => {
    const post = new Post(req.body);
    const results = await db.promise().query(
        'UPDATE posts SET title = ?, lead = ?, content = ?, updatedAt = ? WHERE id = ? AND author = ?',
        [post.title, post.lead, post.content, post.updatedAt, req.params.id, req.userData.id]
    );
    res.status(200).send(results[0]);
})

app.post('/signup', async(req, res) => {
    const user = new User(req.body)
    const [results] = await db.promise().query(
        'SELECT * FROM users WHERE email = ?',
        [user.email]
    )

    if (results.length) return res.status(409).send({message: "This username is already in use!'"})

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return res.status(500).send({msg: err})
        user.id = uuidv4()
        const register = db.promise().query(
            'INSERT INTO users SET id = ?, email = ?, password = ?',
            [user.id, user.email, hash]
        )

        return res.status(201).send(register[0])
    })
})

app.post('/signin', async(req, res) => {
    const user = new User(req.body)
    const [results] = await db.promise().query(
        'SELECT * FROM users WHERE email = ?',
        [user.email]
    )

    if (!results.length) return res.status(404).send({message: "User Not found."})

    bcrypt.compare(user.password, results[0]['password'], (bErr, bResult) => {
        if (bErr) return res.status(401).send({msg: 'Username or password is incorrect!'});

        if (bResult) {
            const token = jwt.sign(
                { id: results[0]['id'] },
                process.env.SECRETKEY,
                { expiresIn: '1d' }
            );

            return res.status(200).send({
                id: user.id,
                email: user.email,
                accessToken: token
            });
        }
        return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
    })
    
})

app.listen(3000, () => {
    console.log('http://localhost:3000/');
})