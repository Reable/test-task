const route = require('express').Router();
const Posts = require('../../controllers/Posts')
const { auth } = require('../../middlewares')

route.get('/search', async (req, res, next) => {
    await Posts.searchAllPosts()
        .then(data => res.json(data).status(200))
        .catch(err => next(err));
});

route.get('/search/:id', async (req, res, next) => {
    await Posts.searchById(req.params.id)
        .then(data => res.json(data).status(200))
        .catch(err => next(err));
});

route.post('/create', auth, async (req, res, next) => {
    await Posts.create(req.body, req.user)
        .then(data => res.json(data).status(200))
        .catch(err => next(err));
});

route.delete('/delete', auth, async (req, res, next) => {
    await Posts.delete(req.body, req.user)
        .then(data => res.json(data).status(200))
        .catch(err => next(err));
});

module.exports = route;