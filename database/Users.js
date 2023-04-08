const DB = require('../models')

module.exports = {
    async findOneById(id){
        return await DB.users.findOne({ id });
    },
    async findOne(query){
        return await DB.users.findOne(query);
    },
    async createUser(data){
        return await DB.users.create(data);
    }
}