// calculator.test.js

const calculator = require('./calculator.js');

describe('Calculator', () => {

  describe('Addition', () => {
    test('should add two positive numbers correctly', () => {
      expect(calculator.add(5, 3)).toBe(8);
    });

    test('should add a positive and a negative number correctly', () => {
      expect(calculator.add(10, -5)).toBe(5);
    });

    test('should add two negative numbers correctly', () => {
      expect(calculator.add(-2, -4)).toBe(-6);
    });

    test('should handle floating point numbers', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('should throw an error if arguments are not numbers', () => {
      expect(() => calculator.add(5, '3')).toThrow(TypeError);
      expect(() => calculator.add('five', 3)).toThrow(TypeError);
    });
  });

  describe('Subtraction', () => {
    test('should subtract two positive numbers correctly', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract a negative number', () => {
      expect(calculator.subtract(5, -3)).toBe(8);
    });

    test('should handle negative results', () => {
      expect(calculator.subtract(2, 7)).toBe(-5);
    });

    test('should handle floating point numbers', () => {
      expect(calculator.subtract(5.5, 2.1)).toBeCloseTo(3.4);
    });
  });

  describe('Multiplication', () => {
    test('should multiply two positive numbers correctly', () => {
      expect(calculator.multiply(5, 6)).toBe(30);
    });

    test('should multiply with a negative number', () => {
      expect(calculator.multiply(4, -3)).toBe(-12);
    });

    test('should handle multiplication by zero', () => {
      expect(calculator.multiply(100, 0)).toBe(0);
    });

    test('should handle floating point numbers', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
    });
  });

  describe('Division', () => {
    test('should divide two positive numbers correctly', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    test('should divide with a negative number', () => {
      expect(calculator.divide(9, -3)).toBe(-3);
    });

    test('should handle floating point results', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });

    test('should throw an error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Cannot divide by zero.');
    });
  });

});