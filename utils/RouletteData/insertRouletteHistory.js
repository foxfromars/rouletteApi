const mongoose = require('mongoose');
const RouletteHistoryModel = require('../../Schemas/RoulleteHistorySchema');


async function insertRouletteHistory(rouletteData){
    if(await RouletteHistoryModel.findOne() !== null){
      await RouletteHistoryModel.deleteMany({})
    }
  try{
    const rouletteHistory = new RouletteHistoryModel({ Data : rouletteData });
    await rouletteHistory.save();
  }catch(err){
    console.log(err)
  }
}

module.exports = insertRouletteHistory;
