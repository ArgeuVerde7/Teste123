/**
 * contador-web.js
 *
 * Este script conta de 1 a 100 e atualiza um elemento na página HTML.
 */
document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('counter');
  let count = 0;

  // Usa setInterval para atualizar o contador a cada 100 milissegundos
  const interval = setInterval(() => {
    count++;
    counterElement.textContent = count;

    // Quando a contagem chegar a 100, limpa o intervalo
    if (count === 100) {
      clearInterval(interval);
      document.querySelector('.info').textContent = "Contagem concluída!";
    }
  }, 100);
});