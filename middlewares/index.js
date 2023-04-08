const { decodeToken } = require('../helpers/JWT');
const UserModel = require('../database/Users');
const createError = require('http-errors');

module.exports = {
    async auth(req, res, next){
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            throw createError(401, 'You are not authorized');
        }

        const userId = await decodeToken(token);

        const user = await UserModel.findOneById(userId.data.id);

        if(!user){
            throw createError(401, 'Token not valid');
        }

        req.user = user
        next()
    }
}