var express = require('express')
var router = express.Router()
var Post = require('../schemas/postSchema')

router.post('/addPost', function(req, res, next) {
    console.log('test');
    var newPost = new Post({
        title: req.body.title,
        userId: req.body.userId
    })

    newPost.save(function(err, post) {
        if(err) {
            next(err)
            res.statusMessage(500)
            res.render('error', { error: err })
        } else {
            res.send(post)
        }
    })
})

router.get('/getPosts', function(req, res, next) {
    Post.find({ userId: req.body.userId }, function(err, posts) {
        if(err) throw err
        res.send(posts)
    })
})

module.exports = router;
