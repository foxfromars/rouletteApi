const mongoose = require('mongoose');
const LoginModel = require('./../Schemas/LoginSchema');

async function LoginVerification(credentials){
  result = await LoginModel.findOne({
    username : credentials.username,
    password : credentials.password
  })
  return result;
}

module.exports = LoginVerification;
