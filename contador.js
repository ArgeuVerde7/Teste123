// contador.js

/**
 * Função principal que inicializa a funcionalidade do contador.
 * Esta função deve ser chamada quando o DOM estiver pronto.
 */
function initContador() {
    const counterElement = document.getElementById('counter'); // Elemento onde o número será exibido
    const statusMessageElement = document.getElementById('status-message'); // Elemento para mensagens de status
    const startButton = document.getElementById('startButton'); // Botão para iniciar a contagem
    let count = 0; // Variável para armazenar a contagem atual
    let intervalId = null; // ID do intervalo para poder pará-lo

    /**
     * Inicia a contagem de 0 a 100.
     * Atualiza o elemento 'counter' na tela.
     */
    function startCounting() {
        if (intervalId !== null) {
            // Se já estiver contando, não faz nada para evitar múltiplos intervalos
            return;
        }

        count = 0; // Reinicia a contagem
        counterElement.textContent = count; // Atualiza o display para 0
        statusMessageElement.textContent = "Contando até 100..."; // Define a mensagem de status
        startButton.disabled = true; // Desabilita o botão para evitar cliques múltiplos

        intervalId = setInterval(() => {
            count++;
            counterElement.textContent = count; // Atualiza o número no HTML

            if (count === 100) {
                clearInterval(intervalId); // Para a contagem quando chega a 100
                intervalId = null; // Reseta o ID do intervalo
                statusMessageElement.textContent = "Contagem concluída!"; // Mensagem final
                startButton.disabled = false; // Habilita o botão novamente
            }
        }, 50); // Intervalo de 50 milissegundos para cada incremento
    }

    // Adiciona um listener de evento ao botão para iniciar a contagem
    // Garante que o listener só é adicionado uma vez
    if (startButton && !startButton.dataset.listenerAdded) {
        startButton.addEventListener('click', startCounting);
        startButton.dataset.listenerAdded = 'true'; // Marca que o listener foi adicionado
    }
}

// Se estiver em um ambiente de navegador (onde 'document' existe),
// executa a função de inicialização quando o DOM estiver pronto.
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initContador);
}

// Exporta a função de inicialização para que possa ser usada nos testes
module.exports = {
    initContador
};
