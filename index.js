const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Post {
    constructor(post){
        this.title = post.title;
        this.lead = post.lead;
        this.content = post.content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
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

app.delete('/:id', async(req, res) => {
    const results = await db.promise().query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.status(200).send(results[0]);
})

app.post('/', async(req, res) => {
    const post = new Post(req.body);
    const results = await db.promise().query(
        'INSERT INTO posts SET ?',
        [post]
    );
    res.status(200).send(results[0]);
})

app.put('/:id', async(req, res) => {
    const post = new Post(req.body);
    const results = await db.promise().query(
        'UPDATE posts SET title = ?, lead = ?, content = ?, updatedAt = ? WHERE id = ?',
        [post.title, post.lead, post.content, post.updatedAt, req.params.id]
    );
    res.status(200).send(results[0]);
})

app.listen(3000, () => {
    console.log('http://localhost:3000/');
})