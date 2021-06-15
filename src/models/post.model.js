const db = require('../../db')
const { v4: uuidv4 } = require('uuid');

const Post = function(post){
    this.id = uuidv4();
    this.title = post.title;
    this.lead = post.lead;
    this.content = post.content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.author = post.author;
}

Post.create = (newPost, result) => {
    db.query('INSERT INTO posts SET ?', newPost, (err, res) => {
        if (err) result(err, null);
        else result(null, res);   
    })
}

Post.findOne = (id, result) => {
    db.query('SELECT * FROM posts WHERE id = ?', id, (err, res) => {
        if (err) result(err, null);
        else result(null, res);
    })
}

Post.findAll = result => {
    db.query('SELECT * FROM posts', (err, res) => {
        if (err) result(err, null);
        else result(null, res);
    })
}

Post.update = (id, post, result) => {
    db.query(
        'UPDATE posts SET title = ?, lead = ?, content = ?, updatedAt = ? WHERE id = ? AND author = ?',
        [post.title, post.lead, post.content, post.updatedAt, id, post.author],
        (err, res) => {
            if (err) result(err, null);
            else result(null, res);
        }
    )
}

Post.delete = (id, author, result) => {
    db.query(
        'DELETE FROM posts WHERE id = ? AND author = ?',
        [id, author],
        (err, res) => {
            if (err) result(err, null);
            else result(null, res);
        }
    )
}

module.exports = Post