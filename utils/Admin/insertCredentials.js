const loginModel = require('../../Schemas/LoginSchema.js');

async function insertCredentials(credentials){
  try{
    const newLogin = new loginModel({
      username : credentials.username,
      password : credentials.password,
      telefone : credentials.telefone
    })
    await newLogin.save()
    console.log("credentials insert with sucess")
    return true
  }catch(err){
    console.log("error, please verify your credentials")
    return false
  }
}

module.exports = insertCredentials;
