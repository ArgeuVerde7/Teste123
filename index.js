function calculateDiscount(price, discount) {
  // A cobertura de código vai mostrar que essa linha é executada
  // e o novo 'if' vai garantir que o 'branch' para desconto negativo seja coberto
  if (discount < 0 || discount > 100) {
    return price;
  }
  return price - (price * discount) / 100;
}
const finalPrice = calculateDiscount(100, 20);
console.log(`O preço final é: ${finalPrice}`);
const unusedVariable = "Hello World";
