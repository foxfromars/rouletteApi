const loginModel = require('../../Schemas/LoginSchema');

async function deleteCredentials(credentials){
  try{
    const result = await loginModel.findOneAndDelete({
      telefone : credentials.telefone
    })
    if(result != null){
      return true
    }else{
      return false
    }
  }catch(err){
    console.log(err)
    return false
  }
}
module.exports = deleteCredentials;
