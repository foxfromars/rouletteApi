const initiateLogin = require('./RouletteData/initiateLogin');
const selectFrame = require('./RouletteData/selectFrame');
const extractAndInsert = require('./RouletteData/extractAndInsert');

async function rouletteDataUpdate(){
  const { browser, page } = await initiateLogin();
  const contentFrame = await selectFrame( browser , page); 
  
  setInterval(async ()=>{
    await extractAndInsert(contentFrame); 
  },35000)
}

module.exports = rouletteDataUpdate;
