import { isPrime } from '../Sprint/primo.ts';

describe('Testes para a função isPrime', () => {

  // Casos de teste para números primos
  test('deve retornar true para números primos conhecidos', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(11)).toBe(true);
    expect(isPrime(29)).toBe(true);
    expect(isPrime(97)).toBe(true);
  });

  // Casos de teste para números não primos
  test('deve retornar false para números não primos', () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(10)).toBe(false);
    expect(isPrime(25)).toBe(false);
    expect(isPrime(100)).toBe(false);
  });

  // Casos de teste para casos de borda (edge cases)
  test('deve retornar false para 0 e 1', () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
  });

  // Casos de teste para números negativos
  test('deve retornar false para números negativos', () => {
    expect(isPrime(-1)).toBe(false);
    expect(isPrime(-10)).toBe(false);
  });
});