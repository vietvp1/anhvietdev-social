const UserModel = require('../models//userModel')
const {transSuccess, transErrors} = require('../lang/vi')

/**
 * 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} email 
 * @param {*} password 
 */
let register = (firstName, lastName, email, password) => {
    return new Promise(async (resolve, reject) =>{
        let user = await UserModel.findOne({"email": email });
        if (user) {
            return reject(transErrors.account_in_use);
        }
        
        let userItem = { firstName,lastName, email, password};
        let newUser = await UserModel.create(userItem);
        resolve(newUser)
    })      
}

module.exports = {
    register: register,
}