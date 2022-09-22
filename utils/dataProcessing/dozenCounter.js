function dozenCounter(array) {
  console.log(array);
  let firstDozen = 0;
  let secondDozen = 0;
  let thirdDozen = 0;
  const lastNumber = array[0];
  for (let [index, number] of array.entries()) {
    if (number === lastNumber) {
      if (parseInt(array[index - 1]) > 0 && parseInt(array[index - 1]) <= 12) {
        firstDozen = firstDozen + 1;
      }
      if (parseInt(array[index - 1]) > 12 && parseInt(array[index - 1]) <= 24) {
        secondDozen = secondDozen + 1;
      }
      if (parseInt(array[index - 1]) > 24 && parseInt(array[index - 1]) <= 36) {
        thirdDozen = thirdDozen + 1;
      }
    }
  }
  return { firstDozen, secondDozen, thirdDozen };
}
module.exports = dozenCounter;
