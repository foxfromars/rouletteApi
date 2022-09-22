function columnCounter(array){
  let firstColumn = 0;
  let secondColumn = 0;
  let thirdColumn = 0;
  let firstClNumbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
  let secondClNumbers = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
  let thirdClNumbers = [3, 6, 9, 12, 15, 18, 21, 24, 27,30,33,36]
  const lastNumber = array[0];
  for(let [index, number] of array.entries()){
    const nextNumber = parseInt(array[index - 1])
    if(number === lastNumber) {
      if (firstClNumbers.indexOf(nextNumber)!==-1){
        firstColumn = firstColumn + 1;
      }
      if (secondClNumbers.indexOf(nextNumber)!==-1){
        secondColumn = secondColumn + 1;
      }
      if (thirdClNumbers.indexOf(nextNumber)!==-1){
        thirdColumn = thirdColumn + 1;
      }
    }
  }
  return {firstColumn, secondColumn, thirdColumn}
}

module.exports = columnCounter;
