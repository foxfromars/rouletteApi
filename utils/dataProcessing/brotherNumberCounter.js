function brotherNumberCounter(array){
  let brotherNumbers = [9,12,8,11,10,13,18,21,17,20,16,19,27,30,26,29,28,31];
  let notBrotherNumbers = [1,2,3,4,5,6,7,14,15,22,23,24,25,32,33,34,35,36];
  let brotherCounter = 0;
  let notBrotherCounter = 0;

  const lastNumber = array[0]; 
  for(let [index, number] of array.entries()){
    const nextNumber = parseInt(array[index - 1])
    if(number === lastNumber){
      if (brotherNumbers.indexOf(nextNumber)!==-1){
        brotherCounter = brotherCounter + 1;
      }
      if (notBrotherNumbers.indexOf(nextNumber)!==-1){
        notBrotherCounter = notBrotherCounter + 1;
      }
    }
  }
  return {brotherCounter, notBrotherCounter}
}

module.exports = brotherNumberCounter;
