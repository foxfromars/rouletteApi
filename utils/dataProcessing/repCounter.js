function repCounter(array){
  const lastNumber = array[0];
  let repTotal = 0;
  for(let number of array){
    if(number === lastNumber){
      repTotal = repTotal + 1;
    }
  }
  return repTotal;
}
module.exports = repCounter;
