const mongoose = require('mongoose');
const LoginModel = require('./../Schemas/LoginSchema');

async function LoginVerification(credentials){
  try{
    result = await LoginModel.findOne({
      username : credentials.username,
      password : credentials.password
    })
    console.log(credentials)
    if(result !== null){
      return true
    }else{
      return false
    }
  }catch(err){
    return false
  }
}

module.exports = LoginVerification;
