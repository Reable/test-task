const Joi = require('joi')

const UsersSchemas = {
    registration: Joi.object({
        login: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }),

    authorization: Joi.object().keys({
        login: Joi.string().required(),
        password: Joi.string().required().min(6)
    }),
};

const PostsSchemas = {
    create: Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(5).max(200).required(),
    }),

    delete: Joi.object({
        id: Joi.number().required(),
    }),
};

module.exports = {
    UsersSchemas,
    PostsSchemas
}