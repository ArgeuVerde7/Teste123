/**
 * @jest-environment jsdom
 */

// Importa a função de inicialização do contador
const { initContador } = require('./contador.js');

describe('Contador JavaScript', () => {
    // Antes de cada teste, configuramos um DOM básico em memória
    // e ativamos os timers simulados do Jest.
    beforeEach(() => {
        // Cria uma estrutura HTML básica que o JS espera no JSDOM
        document.body.innerHTML = `
            <div id="counter">0</div>
            <p id="status-message">Contando até 100...</p>
            <button id="startButton">Iniciar Contagem</button>
        `;

        // **Chama a função de inicialização do contador explicitamente**
        // Isso garante que os event listeners e o estado inicial sejam configurados
        // no ambiente de teste, exatamente como fariam no navegador.
        initContador();

        // Ativa os timers simulados do Jest
        // Isso permite que a gente controle o tempo de setInterval/setTimeout
        jest.useFakeTimers();
    });

    // Após cada teste, restaura os timers reais para evitar interferências
    afterEach(() => {
        // Garante que todos os timers pendentes sejam executados antes de resetar
        jest.runOnlyPendingTimers();
        // Restaura os timers reais
        jest.useRealTimers();
    });

    test('o contador deve começar em 0 e a mensagem inicial deve estar correta', () => {
        const counterElement = document.getElementById('counter');
        const statusMessageElement = document.getElementById('status-message');
        const startButton = document.getElementById('startButton');

        expect(counterElement.textContent).toBe('0');
        expect(statusMessageElement.textContent).toBe('Contando até 100...');
        expect(startButton.disabled).toBe(false); // O botão deve estar habilitado inicialmente
    });

    test('a contagem deve iniciar e progredir após clicar no botão', () => {
        const startButton = document.getElementById('startButton');
        const counterElement = document.getElementById('counter');
        const statusMessageElement = document.getElementById('status-message');

        // Simula o clique no botão
        startButton.click();

        // Verifica que o botão foi desabilitado
        expect(startButton.disabled).toBe(true);
        expect(statusMessageElement.textContent).toBe('Contando até 100...');

        // Avança o tempo em 50ms para simular um incremento
        jest.advanceTimersByTime(50);
        expect(counterElement.textContent).toBe('1');

        // Avança o tempo para uma contagem parcial (ex: até 50)
        jest.advanceTimersByTime(50 * 49); // 49 incrementos de 50ms (total de 50)
        expect(counterElement.textContent).toBe('50');
    });

    test('a contagem deve parar em 100 e a mensagem de conclusão ser exibida', () => {
        const startButton = document.getElementById('startButton');
        const counterElement = document.getElementById('counter');
        const statusMessageElement = document.getElementById('status-message');

        // Simula o clique para iniciar a contagem
        startButton.click();

        // Avança o tempo até o final da contagem (100 * 50ms = 5000ms ou 5 segundos)
        jest.advanceTimersByTime(5000); // 100 incrementos de 50ms

        // Verifica se a contagem chegou a 100
        expect(counterElement.textContent).toBe('100');
        // Verifica se a mensagem de status foi atualizada
        expect(statusMessageElement.textContent).toBe('Contagem concluída!');
        // Verifica se o botão foi reabilitado
        expect(startButton.disabled).toBe(false);

        // Tenta avançar o tempo novamente, a contagem não deve mudar
        jest.advanceTimersByTime(50);
        expect(counterElement.textContent).toBe('100');
    });

    test('clicar no botão várias vezes enquanto contando não deve reiniciar a contagem', () => {
        const startButton = document.getElementById('startButton');
        const counterElement = document.getElementById('counter');

        startButton.click(); // Inicia a primeira contagem
        jest.advanceTimersByTime(250); // Avança para 5
        expect(counterElement.textContent).toBe('5');

        startButton.click(); // Clica novamente enquanto ainda contando
        jest.advanceTimersByTime(250); // Avança mais 5
        expect(counterElement.textContent).toBe('10'); // Deve continuar de 5 para 10, não reiniciar

        // Avança até o final para garantir que a contagem original completa
        jest.advanceTimersByTime(5000); // O tempo total acumulado é maior que 5000, mas o importante é que complete a contagem.
        expect(counterElement.textContent).toBe('100');
    });
});
