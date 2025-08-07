// Importa a função que você quer testar do seu arquivo index.js
const { calculateDiscountedPrice } = require('./index');

describe('calculateDiscountedPrice', () => {
  // Teste para verificar se o desconto é calculado corretamente
  test('should calculate the discount correctly for a valid value', () => {
    const price = 100;
    const discount = 20; // 20%
    const expectedFinalPrice = 80;
    expect(calculateDiscountedPrice(price, discount)).toBe(expectedFinalPrice);
  });

  // Teste para verificar o comportamento com uma porcentagem de desconto inválida
  test('should return the original price if the discount percentage is invalid (less than 0)', () => {
    const price = 100;
    const discount = -10; // Desconto inválido
    const expectedFinalPrice = 100; // Deve retornar o preço original
    expect(calculateDiscountedPrice(price, discount)).toBe(expectedFinalPrice);
  });

  test('should return the original price if the discount percentage is invalid (greater than 100)', () => {
    const price = 100;
    const discount = 110; // Desconto inválido
    const expectedFinalPrice = 100; // Deve retornar o preço original
    expect(calculateDiscountedPrice(price, discount)).toBe(expectedFinalPrice);
  });

  // Teste para verificar o desconto de 0%
  test('should return the original price for 0% discount', () => {
    const price = 150;
    const discount = 0;
    const expectedFinalPrice = 150;
    expect(calculateDiscountedPrice(price, discount)).toBe(expectedFinalPrice);
  });

  // Teste para verificar o desconto de 100%
  test('should return 0 for 100% discount', () => {
    const price = 200;
    const discount = 100;
    const expectedFinalPrice = 0;
    expect(calculateDiscountedPrice(price, discount)).toBe(expectedFinalPrice);
  });
});