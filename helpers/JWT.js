const jwt = require('jsonwebtoken');

async function generateToken(data){
    return {
        token: await jwt.sign({
                data,
            }, process.env.JWT_KEY, {
                expiresIn: process.env.TOKEN_LIFETIME,
            })
    };
}

async function decodeToken(token){
    try {
        return await jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
        throw 'Invalid token';
    }
}

module.exports = {
    generateToken,
    decodeToken
};