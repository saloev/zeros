/**
 * Factorials and Trailing Zeroes - read article for understanding algorithm
 * @see {@link https://www.purplemath.com/modules/factzero.htm|purplemath}
 *
 */

/**
 * Check if number is even
 * @param {Number} number
 * @returns {Boolean}
 */
const isEven = number => number % 2 === 0;

/**
 * Calculate how many @param {Number} number we has in range(odd or even) [1, @param {Number} toNumber]
 * @param {Number} toNumber
 * @param {Number} number
 * @returns {Number}
 */
const countOfNumbersEvenOrOdd = (toNumber, number = 5) => {
  const makeProp = `${toNumber}${number}`;
  // already calculate number?
  if (countOfNumbersEvenOrOdd[makeProp]) {
    return countOfNumbersEvenOrOdd[makeProp];
  }
  
  const iterationStartFrom = isEven(toNumber) ? 2 : 1;

  const iter = (resAcc, power) => {
    const currentNumber = Math.pow(number, power);
    if (currentNumber > toNumber) return resAcc;

    const whilePowerLessNumber = (acc, index) => {
      if (index > toNumber) return acc;
      if (index % currentNumber !== 0)
        return whilePowerLessNumber(acc, index + 2);

      return whilePowerLessNumber(acc + 1, index + 2);
    };

    const newAcc = resAcc + whilePowerLessNumber(0, iterationStartFrom);

    return iter(newAcc, power + 1);
  };

  const result = iter(0, 1);

  // save result, next time we just return result
  countOfNumbersEvenOrOdd[makeProp] = result;

  return result;
};

/**
 * Calculate how many @param {Number} number we has in range [1, @param {Number} toNumber]
 * @param {Number} toNumber
 * @param {Number} number
 */
const countNumbers = (toNumber, number = 5) => {
  const makeProp = `${toNumber}${number}`;
  // already calculate number?
  if (countNumbers[makeProp]) {
    return countNumbers[makeProp];
  }

  const iter = (accZerosCount, exponent) => {
    const countOfDividers = Math.floor(toNumber / Math.pow(number, exponent));

    if (countOfDividers <= 1) {
      const res = accZerosCount + countOfDividers;

      return res;
    }

    return iter(accZerosCount + countOfDividers, exponent + 1);
  };

  const result = iter(0, 1);

  // save result, next time we just return result 
  countNumbers[makeProp] = result;

  return result;
};

/**
 * Calculate how many zeroes in @param {String} expression
 * @param {String} expression
 * @returns {Number}
 */
module.exports = function zeros(expression) {
  const dispatchFactorials = {
    "!": number => [countNumbers(number), countNumbers(number, 2)],
    "!!": number =>
      isEven(number)
        ? [countOfNumbersEvenOrOdd(number), countOfNumbersEvenOrOdd(number, 2)]
        : [countOfNumbersEvenOrOdd(number), 0]
  };

  const countOfTwoAndFives = expression.split("*").reduce(
    (acc, factorial) => {
      const length = factorial.length;
      const typeOfFactorial = factorial[length - 2] === "!" ? "!!" : "!";
      const number =
        typeOfFactorial === "!!"
          ? +factorial.slice(0, -2)
          : +factorial.slice(0, -1);

      const countOfNumbers = dispatchFactorials[typeOfFactorial](number);

      return [acc[0] + countOfNumbers[0], acc[1] + countOfNumbers[1]];
    },
    [0, 0]
  );

  return Math.min(...countOfTwoAndFives);
};
