/**
 * Calcula o preço com desconto.
 * @param {number} price - O preço original do item.
 * @param {number} discountPercentage - A porcentagem de desconto a ser aplicada (0-100).
 * @returns {number} O preço final após o desconto.
 */
function calculateDiscountedPrice(price, discountPercentage) {
  // Validação para garantir que discountPercentage esteja entre 0 e 100.
  if (discountPercentage < 0 || discountPercentage > 100) {
    console.warn("Porcentagem de desconto inválida. Deve estar entre 0 e 100.");
    return price; // Retorna o preço original se a porcentagem for inválida
  }

  const discountedAmount = (price * discountPercentage) / 100;
  return price - discountedAmount;
}

const originalProductPrice = 200;
const discountApplied = 15; // 15% de desconto

const finalPrice = calculateDiscountedPrice(originalProductPrice, discountApplied);
console.log(`O preço original era: R$${originalProductPrice}`);
console.log(`Com ${discountApplied}% de desconto, o preço final é: R$${finalPrice}`);

// Esta variável não é usada em nenhum lugar, o SonarQube deve detectá-la como um code smell.
const greetingMessage = "Bem-vindo ao nosso exemplo de SonarQube!";

// Função de exemplo adicional
function greetUser(name) {
  console.log(`Olá, ${name}!`);
}

greetUser("Mundo");

// Exporta a função para que ela possa ser testada
module.exports = { calculateDiscountedPrice };
