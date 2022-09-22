const mongoose = require('mongoose');
const rouletteHistoryModel = require('../Schemas/RoulleteHistorySchema');

async function roulleteHistoryQuery(){
  const [result] = await rouletteHistoryModel.find({});
  try{
    return result.Data;
  }catch(err){
    console.log(err)
    return null;
  }
}

module.exports = roulleteHistoryQuery;
