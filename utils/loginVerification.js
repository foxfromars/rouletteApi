const mongoose = require('mongoose');
const LoginModel = require('./../Schemas/LoginSchema');

async function LoginVerification(credentials, fingerprint){
  try{
    result = await LoginModel.findOneAndUpdate({
      username : credentials.username,
      password : credentials.password
    },{fingerprint : fingerprint})
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
