const express = require('express');
const db = require('./db');
const app = express();

app.get('/', async(req, res) => {
    const results = await db.promise().query('SELECT * FROM posts');
    res.status(200).send(results[0]);
})

app.listen(3000, () => {
    console.log('http://localhost:3000/');
})