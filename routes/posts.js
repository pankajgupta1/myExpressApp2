var express = require('express')
var router = express.Router()
var Post = require('../schemas/postSchema')
const jwt = require('jsonwebtoken');
var User = require('../schemas/userSchema');

router.post('/addPost', function (req, res, next) {
    console.log('test');
    var newPost = new Post({
        title: req.body.title,
        userId: req.body.userId
    })

    newPost.save(function (err, post) {
        if (err) {
            next(err)
            res.statusMessage(500)
            res.render('error', { error: err })
        } else {
            res.send(post)
        }
    })
})

router.get('/getPosts', function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, 'mytokenkey', function (err, payload) {

        console.log('payload', payload);
        if (payload) {
            User.findById(payload.userId).then(
                Post.find({ userId: payload.userId }, function (err, posts) {
                    if (err) throw err
                    res.send(posts)
                })
            )
        }
        if (err) {
            res.render('error', { error: err })
        }
    })
    // console.log('Object.keys(req)', Object.keys(req));
    console.log('req.query', req.query);
    console.log('req.path', req.path);
    console.log('req.body', req.body);
    console.log('req.headers', req.headers);
    console.log('req.param', req.param('userId'));
})

module.exports = router;
