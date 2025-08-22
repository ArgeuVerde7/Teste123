// primeChecker.test.js

const isPrime = require('../Sprint/primeChecker.js');

describe('isPrime', () => {

  // Testes para números que são primos
  test('should return true for a prime number', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(11)).toBe(true);
    expect(isPrime(13)).toBe(true);
    expect(isPrime(29)).toBe(true);
    expect(isPrime(97)).toBe(true);
    expect(isPrime(101)).toBe(true);
  });

  // Testes para números que não são primos
  test('should return false for a non-prime number', () => {
    // Números menores ou iguais a 1
    expect(isPrime(-1)).toBe(false);
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    
    // Números pares maiores que 2
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(10)).toBe(false);

    // Números ímpares compostos
    expect(isPrime(9)).toBe(false);
    expect(isPrime(15)).toBe(false);
    expect(isPrime(21)).toBe(false);
    expect(isPrime(35)).toBe(false);
    expect(isPrime(49)).toBe(false);
    expect(isPrime(51)).toBe(false); // 51 é divisível por 3 e 17
    expect(isPrime(91)).toBe(false); // 91 é divisível por 7 e 13
  });

  // Testes de limite
  test('should handle large prime numbers correctly', () => {
    // Exemplo de um número primo grande
    expect(isPrime(7919)).toBe(true); 
  });

  test('should handle large non-prime numbers correctly', () => {
    // Exemplo de um número composto grande
    expect(isPrime(7920)).toBe(false);
  });
  
});