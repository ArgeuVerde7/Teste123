// calculator.js

/**
 * A simple calculator object.
 */
const calculator = {
  /**
   * Adds two numbers.
   * @param {number} a The first number.
   * @param {number} b The second number.
   * @returns {number} The sum of a and b.
   */
  add: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('Both arguments must be numbers.');
    }
    return a + b;
  },

  /**
   * Subtracts the second number from the first.
   * @param {number} a The first number.
   * @param {number} b The second number.
   * @returns {number} The difference of a and b.
   */
  subtract: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('Both arguments must be numbers.');
    }
    return a - b;
  },

  /**
   * Multiplies two numbers.
   * @param {number} a The first number.
   * @param {number} b The second number.
   * @returns {number} The product of a and b.
   */
  multiply: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('Both arguments must be numbers.');
    }
    return a * b;
  },

  /**
   * Divides the first number by the second.
   * @param {number} a The numerator.
   * @param {number} b The denominator.
   * @returns {number} The quotient of a and b.
   * @throws {Error} if the denominator is zero.
   */
  divide: (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('Both arguments must be numbers.');
    }
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return a / b;
  }
};

module.exports = calculator;