const express = require('express');
const usersRoutes = require('./users');
const postsRoutes = require('./posts');

const app = express();

app.use('/users', usersRoutes);

app.use('/posts', postsRoutes);

module.exports = app;