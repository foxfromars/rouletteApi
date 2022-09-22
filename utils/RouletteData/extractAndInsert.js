const InsertRouletteHistory = require('./insertRouletteHistory');

async function extractAndInsert(contentFrame) {
  const resultTable = await contentFrame.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        "div.roulette-history-item_enabledcxqA7lJZDNEvrUigQi80"
      )
    ).map((e) => e.textContent);
  });
  console.dir(resultTable);
  try{
    InsertRouletteHistory(resultTable);
  }catch(err){
    console.log(err);
  }

}

module.exports = extractAndInsert;
