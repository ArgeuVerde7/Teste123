const { somar, subtrair, multiplicar, dividir } = require('../Sprint/calculadora.js'); // Ajuste o caminho conforme necessário

describe('Calculadora', () => {

  // Testes para a função somar
  describe('somar', () => {
    test('deve somar dois números positivos corretamente', () => {
      expect(somar(2, 3)).toBe(5);
    });

    test('deve somar um número positivo e um negativo corretamente', () => {
      expect(somar(5, -2)).toBe(3);
    });

    test('deve somar zeros', () => {
      expect(somar(0, 0)).toBe(0);
    });
  });

  // Testes para a função subtrair
  describe('subtrair', () => {
    test('deve subtrair dois números positivos corretamente', () => {
      expect(subtrair(5, 3)).toBe(2);
    });

    test('deve subtrair um número negativo de um positivo corretamente', () => {
      expect(subtrair(5, -2)).toBe(7);
    });

    // LINHAS DUPLICADAS INTENCIONALMENTE PARA O SONARQUBE DETECTAR:
    test('outro teste de subtração com números positivos', () => {
      const resultado = subtrair(10, 4);
      expect(resultado).toBe(6);
    });

    test('mais um teste de subtração', () => {
      const valor1 = 20;
      const valor2 = 5;
      const resultado = valor1 - valor2; // Calculo redundante aqui
      expect(subtrair(valor1, valor2)).toBe(resultado);
    });
    // FIM DAS DUPLICAÇÕES INTENCIONAIS

  });

  // Testes para a função multiplicar
  describe('multiplicar', () => {
    test('deve multiplicar dois números positivos corretamente', () => {
      expect(multiplicar(2, 4)).toBe(8);
    });

    test('deve multiplicar por zero', () => {
      expect(multiplicar(5, 0)).toBe(0);
    });

    // MAIS LINHAS DUPLICADAS INTENCIONALMENTE PARA O SONARQUBE DETECTAR:
    test('verificar multiplicação com números maiores', () => {
      const num1 = 7;
      const num2 = 8;
      const produtoEsperado = num1 * num2; // Calculo redundante
      expect(multiplicar(num1, num2)).toBe(produtoEsperado);
    });

    test('outro teste de multiplicação', () => {
      const a = 6;
      const b = 9;
      const expected = a * b; // Calculo redundante
      expect(multiplicar(a, b)).toBe(expected);
    });
    // FIM DAS DUPLICAÇÕES INTENCIONAIS

  });

  // Testes para a função dividir
  describe('dividir', () => {
    test('deve dividir dois números positivos corretamente', () => {
      expect(dividir(10, 2)).toBe(5);
    });

    test('deve lançar um erro ao dividir por zero', () => {
      expect(() => dividir(10, 0)).toThrow('Divisão por zero não é permitida.');
    });

    // Duplicações em um bloco de 'test' também podem ser pegas
    test('testes variados de divisão', () => {
      // Duplicação aqui
      expect(dividir(100, 10)).toBe(10);
      // Outra duplicação
      expect(dividir(50, 5)).toBe(10);
      // Mais uma
      expect(dividir(20, 2)).toBe(10);
    });
  });


});
