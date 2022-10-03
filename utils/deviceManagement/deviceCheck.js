const LoginModel = require("../../Schemas/LoginSchema");

async function deviceCheck(username, fingerprint){
  try{
    const result = await LoginModel.findOne({
      username : username,
      fingerprint : fingerprint
    })
    if(result !== null){
      return true
    }
    else {
      return false
    }
  }
  catch(err){
    console.log(err)
    return false
  }
} 

module.exports = deviceCheck; 
