// Importa as funções do seu arquivo utils.js
const { formatCurrency, capitalizeFirstLetter } = require('./utils');

// Função auxiliar para normalizar espaços em strings formatadas
// Isso resolve o problema de "espaço sem quebra" (\u00A0) vs. espaço normal
function normalizeSpace(str) {
  return str.replace(/\u00A0/g, ' ');
}

// --- Testes para a função formatCurrency ---
describe('formatCurrency', () => {
  // Deve formatar um número positivo corretamente
  test('deve formatar um número positivo para o formato BRL', () => {
    expect(normalizeSpace(formatCurrency(1234.56))).toBe('R$ 1.234,56');
  });

  // Deve formatar um número com casas decimais zero
  test('deve formatar um número com casas decimais zero', () => {
    expect(normalizeSpace(formatCurrency(100))).toBe('R$ 100,00');
  });

  // Deve formatar zero
  test('deve formatar zero corretamente', () => {
    expect(normalizeSpace(formatCurrency(0))).toBe('R$ 0,00');
  });

  // Deve formatar um número negativo (o Intl.NumberFormat lida com o sinal)
  test('deve formatar um número negativo corretamente', () => {
    expect(normalizeSpace(formatCurrency(-50.25))).toBe('-R$ 50,25');
  });

  // Deve retornar "R$ 0,00" e logar um erro para entrada não numérica
  test('deve retornar "R$ 0,00" e logar um erro para entrada não numérica', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(normalizeSpace(formatCurrency('abc'))).toBe('R$ 0,00');
    expect(consoleSpy).toHaveBeenCalledWith("Erro: O valor fornecido não é um número.");
    consoleSpy.mockRestore(); // Restaura o console.error original
  });

  // Deve retornar "R$ 0,00" e logar um erro para NaN
  test('deve retornar "R$ 0,00" e logar um erro para NaN', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(normalizeSpace(formatCurrency(NaN))).toBe('R$ 0,00');
    expect(consoleSpy).toHaveBeenCalledWith("Erro: O valor fornecido não é um número.");
    consoleSpy.mockRestore();
  });

  // Deve formatar um número grande
  test('deve formatar um número grande corretamente', () => {
    expect(normalizeSpace(formatCurrency(1234567.89))).toBe('R$ 1.234.567,89');
  });
});

// --- Testes para a função capitalizeFirstLetter ---
describe('capitalizeFirstLetter', () => {
  // Deve capitalizar a primeira letra de uma string
  test('deve capitalizar a primeira letra de uma string', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
  });

  // Deve retornar uma string vazia para uma string vazia
  test('deve retornar uma string vazia para uma string vazia', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  // Deve retornar a mesma string se a primeira letra já for maiúscula
  test('deve retornar a mesma string se a primeira letra já for maiúscula', () => {
    expect(capitalizeFirstLetter('Apple')).toBe('Apple');
  });

  // Deve lidar com strings de um único caractere
  test('deve lidar com strings de um único caractere', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
  });

  // Deve retornar uma string vazia para entrada não string
  test('deve retornar uma string vazia para entrada não string', () => {
    expect(capitalizeFirstLetter(123)).toBe('');
    expect(capitalizeFirstLetter(null)).toBe('');
    expect(capitalizeFirstLetter(undefined)).toBe('');
  });
});
