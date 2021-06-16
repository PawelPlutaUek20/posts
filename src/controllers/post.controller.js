const Post = require("../models/post.model");

exports.create = (req, res) => {
    const new_post = new Post({
        title: req.body.title,
        lead: req.body.lead,
        content: req.body.content,
        author: req.userData.id
    })

    Post.create(new_post, (err, post) => {
        if (err) res.send(err);
        else res.send(post)
    })
};

exports.findAll = (req, res) => {
    Post.findAll((err, post) => {
        if (err) res.send(err);
        else res.send(post)
    })
};

exports.findOne = (req, res) => {
    Post.findOne(req.params.id, (err, post) => {
        if (err) res.send(err);
        else res.send(post)
    })
};

exports.update = (req, res) => {
    const new_post = new Post({
        title: req.body.title,
        lead: req.body.lead,
        content: req.body.content,
        author: req.userData.id
    })
    Post.update(
        req.params.id,
        new_post,
        (err, post) => {
            if (err) res.send(err);
            else res.send(post)
        }
    )
};

exports.delete = (req, res) => {
    Post.delete(
        req.params.id, 
        req.userData.id,
        (err, post) => {
            if (err) res.send(err);
            else res.send(post)
        }
    )

};