const createError = require('http-errors');
const { UsersSchemas } = require('../helpers/validateSchemas');
const UserModel = require('../database/Users');
const bcrypt = require('bcrypt')
const {generateToken} = require("../helpers/JWT");

module.exports = {
    async registration (data){
        const validate = await UsersSchemas.registration.validate(data);

        if(validate.error){
            throw validate.error
        }

        const findUser = await UserModel.findOne({login: data.login});

        if(findUser){
            throw createError(401, 'User already exists');
        }

        data.password  = await bcrypt.hash(data.password, 10);

        const {id} = await UserModel.createUser(data);

        return await generateToken({ id })
    },

    async authorization (data){
        const validate = await UsersSchemas.authorization.validate(data);

        if(validate.error){
            throw validate.error
        }

        const user = await UserModel.findOne({login: data.login});

        if(!user){
            throw createError(401, 'User not found');
        }

        const checkPassword = await bcrypt.compare(data.password, user.password);

        if(!checkPassword){
            throw createError(401, 'Password incorrect');
        }

        return await generateToken({ id: user.id })
    }
}