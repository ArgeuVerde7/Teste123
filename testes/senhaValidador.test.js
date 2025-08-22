// passwordValidator.test.js

const validatePassword = require('../Sprint/senhaValidator.js');

describe('validatePassword', () => {

  // Teste de sucesso: cobrindo o caminho onde não há erros
  test('should return isValid: true for a valid password', () => {
    const result = validatePassword('Senha123!');
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  // Testes para cenários de erro (cobrem os caminhos 'if')
  test('should return isValid: false and an error if password is not a string', () => {
    const result = validatePassword(123456);
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(['Password must be a string.']);
  });

  test('should return an error for a password shorter than 8 characters', () => {
    const result = validatePassword('Short1!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must be at least 8 characters long.');
  });
  
  test('should return an error for a password without an uppercase letter', () => {
    const result = validatePassword('password123!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one uppercase letter.');
  });

  test('should return an error for a password without a lowercase letter', () => {
    const result = validatePassword('PASSWORD123!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one lowercase letter.');
  });
  
  test('should return an error for a password without a number', () => {
    const result = validatePassword('Password!a');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one number.');
  });
  
  test('should return an error for a password without a special character', () => {
    const result = validatePassword('Password123');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one special character (!@#$%^&*).');
  });

  // Teste para múltiplos erros de uma vez, garantindo que o array de erros é populado corretamente
  test('should return multiple errors for an invalid password', () => {
    const result = validatePassword('abc');
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual([
      'Password must be at least 8 characters long.',
      'Password must contain at least one uppercase letter.',
      'Password must contain at least one number.',
      'Password must contain at least one special character (!@#$%^&*).'
    ]);
  });
  
});