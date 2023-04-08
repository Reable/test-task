const DB = require('../models')

module.exports = {
    async findOneById(id){
        return await DB.posts.findOne({id});
    },
    async findAll(){
        return await DB.posts.findAll();
    },
    async create(data){
        return await DB.posts.create(data);
    },
    async delete(id){
        return await DB.posts.destroy({where:{id}})
    }
}