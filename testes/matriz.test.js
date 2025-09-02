// Importa a função a ser testada
const create3DArray = require('./Sprint/matriz');

// Bloco de testes para a função create3DArray
describe('create3DArray', () => {

  // Teste 1: Verifica se a matriz tem as dimensões corretas
  test('should create an array with the specified dimensions', () => {
    const x = 3;
    const y = 4;
    const z = 5;
    const array = create3DArray(x, y, z);
    
    // Assegura que o número de "camadas" é 3
    expect(array.length).toBe(x);
    // Assegura que o número de "linhas" na primeira camada é 4
    expect(array[0].length).toBe(y);
    // Assegura que o número de "colunas" na primeira linha é 5
    expect(array[0][0].length).toBe(z);
  });

  // Teste 2: Verifica se todos os elementos são inicializados com `null`
  test('should initialize all elements with null', () => {
    const array = create3DArray(2, 2, 2);
    
    // Verifica se o elemento em uma posição específica é null
    expect(array[0][0][0]).toBeNull();
    // Verifica outro elemento para garantir
    expect(array[1][1][1]).toBeNull();
  });

  // Teste 3: Lida com dimensões zero
  test('should return an empty array for zero dimensions', () => {
    const arrayZero = create3DArray(0, 5, 5);
    expect(arrayZero).toEqual([]);
    
    const arrayZeroTwo = create3DArray(5, 0, 5);
    expect(arrayZeroTwo[0]).toEqual([]);

    const arrayZeroThree = create3DArray(5, 5, 0);
    expect(arrayZeroThree[0][0]).toEqual([]);
  });
  
  // Teste 4: Verifica a imutabilidade do retorno, garantindo que não é a mesma referência
  test('should return a new array instance each time', () => {
    const array1 = create3DArray(1, 1, 1);
    const array2 = create3DArray(1, 1, 1);
    
    expect(array1).not.toBe(array2);
  });

});