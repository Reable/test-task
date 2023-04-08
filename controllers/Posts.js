const createError = require('http-errors');
const { PostsSchemas } = require('../helpers/validateSchemas');
const PostModels = require('../database/Posts');

module.exports = {
    async create (data, user){
        const validate = await PostsSchemas.create.validate(data);

        if(validate.error){
            throw validate.error
        }

        return await PostModels.create({...data, user_id: user.id});
    },

    async delete(data, user){
        const validate = await PostsSchemas.delete.validate(data);

        if(validate.error){
            throw validate.error
        }

        const searchPost = await PostModels.findOneById(data.id);

        if(searchPost.user_id !== user.id){
            throw createError(400, 'You are not author this post');
        }

        return await PostModels.delete(data.id);
    },

    async searchById(id){
        if(!id){
            throw createError(400, 'You didn\'t pass the id')
        }
        return await PostModels.findOneById(id);
    },

    async searchAllPosts(){
        return await PostModels.findAll();
    }
}