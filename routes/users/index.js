const route = require('express').Router();
const Users = require('../../controllers/Users');

route.post('/registration',async (req, res, next) => {
    await Users.registration(req.body)
        .then(data => res.json(data).status(200))
        .catch(err => next(err))
});

route.post('/authorization',async (req, res, next) => {
    await Users.authorization(req.body)
        .then(data => res.json(data).status(200))
        .catch(err => next(err))
});

module.exports = route;