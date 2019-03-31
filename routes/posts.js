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
    
        // console.log('Object.keys(req)', Object.keys(req));
    console.log('req.query', req.query);
    console.log('req.path', req.path);
    console.log('req.body', req.body);
    console.log('req.headers', req.headers);
    console.log('req.param', req.param('userId'));
    Post.find({ userId: req.param('userId') }, function(err, posts) {
        if(err) throw err
        res.send(posts)
    })
})

module.exports = router;
