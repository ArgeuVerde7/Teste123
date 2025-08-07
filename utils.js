/**
 * Formata um valor monetário para o formato brasileiro (BRL).
 * @param {number} value - O valor numérico a ser formatado.
 * @returns {string} O valor formatado como string (ex: "R$ 1.234,56").
 */
function formatCurrency(value) {
  if (typeof value !== 'number' || isNaN(value)) {
    console.error("Erro: O valor fornecido não é um número.");
    return "R$ 0,00"; // Retorna um valor padrão em caso de erro
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Capitaliza a primeira letra de uma string.
 * @param {string} str - A string a ser capitalizada.
 * @returns {string} A string com a primeira letra em maiúscula.
 */
function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Exemplo de uso (opcional, pode ser removido em um ambiente de produção)
// console.log(formatCurrency(1234.56));
// console.log(capitalizeFirstLetter("hello world"));

// Exporta as funções para que possam ser usadas em outros arquivos
module.exports = {
  formatCurrency,
  capitalizeFirstLetter,
};