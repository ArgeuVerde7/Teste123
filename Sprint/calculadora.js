/**
 * Adiciona dois números e retorna o resultado.
 * @param {number} a - O primeiro número.
 * @param {number} b - O segundo número.
 * @returns {number} A soma dos dois números.
 */
function somar(a, b) {
  return a + b;
}

/**
 * Subtrai dois números e retorna o resultado.
 * @param {number} a - O primeiro número.
 * @param {number} b - O segundo número.
 * @returns {number} A diferença entre os dois números.
 */
function subtrair(a, b) {
  return a - b;
}

/**
 * Multiplica dois números e retorna o resultado.
 * @param {number} a - O primeiro número.
 * @param {number} b - O segundo número.
 * @returns {number} O produto dos dois números.
 */
function multiplicar(a, b) {
  return a * b;
}

/**
 * Divide dois números e retorna o resultado.
 * @param {number} a - O primeiro número.
 * @param {number} b - O segundo número.
 * @returns {number} O quociente dos dois números.
 * @throws {Error} Se o divisor for zero.
 */
function dividir(a, b) {
  if (b === 0) {
    throw new Error("Divisão por zero não é permitida.");
  }
  return a / b;
}

// Exporta as funções para que possam ser testadas e utilizadas
module.exports = {
  somar,
  subtrair,
  multiplicar,
  dividir
};