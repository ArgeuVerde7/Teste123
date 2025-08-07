function calculateDiscount(price, discount) {
  // O SonarQube pode identificar que 'discount' não é validado
  if (discount > 100) {
    return price; // Exemplo de um bug potencial
  }
  return price - (price * discount) / 100;
}

const finalPrice = calculateDiscount(100, 20);
console.log(`O preço final é: ${finalPrice}`);

// Variável não utilizada, SonarQube pode identificar isso

const unusedVariable = "Hello World";

function calculateDiscount(price, discount) {
  // O SonarQube pode identificar que 'discount' não é validado
  if (discount > 100) {
    return price; // Exemplo de um bug potencial
  }
  return price - (price * discount) / 100;
}

const finalPrice = calculateDiscount(100, 20);
console.log(`O preço final é: ${finalPrice}`);

// Variável não utilizada, SonarQube pode identificar isso

const unusedVariable = "Hello World";
