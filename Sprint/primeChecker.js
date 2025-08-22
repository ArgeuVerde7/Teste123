// primeChecker.js

/**
 * Checks if a number is a prime number.
 * @param {number} num The number to check.
 * @returns {boolean} True if the number is prime, otherwise false.
 */
function isPrime(num) {
  // Prime numbers must be greater than 1
  if (num <= 1) {
    return false;
  }
  
  // 2 is the only even prime number
  if (num === 2) {
    return true;
  }

  // All even numbers greater than 2 are not prime
  if (num % 2 === 0) {
    return false;
  }

  // Check for divisors from 3 up to the square root of the number.
  // We only need to check odd numbers.
  const limit = Math.sqrt(num);
  for (let i = 3; i <= limit; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }

  // If no divisors were found, the number is prime
  return true;
}

module.exports = isPrime;