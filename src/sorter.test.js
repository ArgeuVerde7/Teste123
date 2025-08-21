// sorter.test.js
/**
 * @jest-environment jsdom
 */

// Importar o código sorter.js
// O `require` executará a função anônima imediatamente após o listener de 'load'
const addSorting = require('./sorter.js');

describe('sorter.js', () => {
    // Definir um HTML básico para os testes
    const basicHTML = `
      <table class="coverage-summary">
        <thead>
          <tr>
            <th data-col="file" data-type="string">File</th>
            <th data-col="statements" data-type="number" data-nosort="true">Statements</th>
            <th data-col="branches" data-type="number">Branches</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-value="file2.js">file2.js</td>
            <td data-value="80">80%</td>
            <td data-value="50">50%</td>
          </tr>
          <tr>
            <td data-value="file1.js">file1.js</td>
            <td data-value="100">100%</td>
            <td data-value="90">90%</td>
          </tr>
        </tbody>
      </table>
      <template id="filterTemplate">
        <div class="search-box">
          <input type="text" id="fileSearch" placeholder="Search...">
        </div>
      </template>
    `;

    // Configurar o ambiente antes de cada teste
    beforeEach(() => {
        document.body.innerHTML = basicHTML;
        // A função addSorting é chamada pelo window.addEventListener('load', ...)
        window.dispatchEvent(new Event('load'));
    });

    // Cenário de teste 1: Verificar se a função principal é executada e as funções internas são chamadas
    test('should initialize sorting and search functionality on page load', () => {
        const headers = document.querySelectorAll('th[data-col]');
        expect(headers[0].innerHTML).toContain('<span class="sorter"></span>'); // File (sortable)
        expect(headers[1].innerHTML).not.toContain('<span class="sorter"></span>'); // Statements (not sortable)
        expect(headers[2].innerHTML).toContain('<span class="sorter"></span>'); // Branches (sortable)
        expect(document.getElementById('fileSearch')).not.toBeNull();
    });

    // Cenário de teste 2: Testar a funcionalidade de ordenação numérica (Branches)
    test('should sort rows by numeric column (Branches) correctly', () => {
        const branchesHeader = document.querySelector('th[data-col="branches"]');
        branchesHeader.click();
        const rows = document.querySelectorAll('tbody tr');
        expect(rows[0].querySelector('td[data-value="90"]')).not.toBeNull();
        expect(rows[1].querySelector('td[data-value="50"]')).not.toBeNull();

        // Clicar novamente para testar a ordem decrescente
        branchesHeader.click();
        const sortedRowsDesc = document.querySelectorAll('tbody tr');
        expect(sortedRowsDesc[0].querySelector('td[data-value="50"]')).not.toBeNull();
        expect(sortedRowsDesc[1].querySelector('td[data-value="90"]')).not.toBeNull();
    });

    // Cenário de teste 3: Testar a funcionalidade de ordenação de strings (File)
    test('should sort rows by string column (File) correctly', () => {
        const fileHeader = document.querySelector('th[data-col="file"]');
        fileHeader.click();
        const rows = document.querySelectorAll('tbody tr');
        // A ordem deve ser de 'file1.js' para 'file2.js'
        expect(rows[0].querySelector('td[data-value="file1.js"]')).not.toBeNull();
        expect(rows[1].querySelector('td[data-value="file2.js"]')).not.toBeNull();

        // Clicar novamente para testar a ordem decrescente
        fileHeader.click();
        const sortedRowsDesc = document.querySelectorAll('tbody tr');
        // A nova ordem deve ser 'file2.js' para 'file1.js'
        expect(sortedRowsDesc[0].querySelector('td[data-value="file2.js"]')).not.toBeNull();
        expect(sortedRowsDesc[1].querySelector('td[data-value="file1.js"]')).not.toBeNull();
    });

    // Cenário de teste 4: Testar a funcionalidade de busca com filtro válido
    test('should filter rows correctly based on valid search input', () => {
        const searchInput = document.getElementById('fileSearch');
        searchInput.value = 'file1';
        searchInput.dispatchEvent(new Event('input'));
        const rows = document.querySelectorAll('tbody tr');
        expect(rows[0].style.display).toBe(''); // file1.js deve estar visível
        expect(rows[1].style.display).toBe('none'); // file2.js deve estar escondido
    });

    // Cenário de teste 5: Testar a busca com uma expressão regular inválida
    test('should handle invalid regex search gracefully', () => {
        const searchInput = document.getElementById('fileSearch');
        // Uma regex inválida, como um colchete não fechado
        searchInput.value = '[';
        searchInput.dispatchEvent(new Event('input'));
        
        const rows = document.querySelectorAll('tbody tr');
        // Ambos os arquivos devem estar visíveis, pois a busca falha e volta para o modo "plain text"
        // 'file1' e 'file2' contêm o caractere '[', então ambos devem ser ocultados
        // Se a busca for por 'file', ambos são exibidos
        // O teste deve garantir que a lógica "plain text" é usada
        expect(rows[0].style.display).toBe('none');
        expect(rows[1].style.display).toBe('none');

        // Testar com uma entrada que não resulta em erro, mas filtra com a lógica 'includes'
        searchInput.value = 'file';
        searchInput.dispatchEvent(new Event('input'));
        expect(rows[0].style.display).toBe('');
        expect(rows[1].style.display).toBe('');
    });

    // Cenário de teste 6: Testar o caso em que a tabela não existe
    test('should return early if the coverage summary table is not found', () => {
        document.body.innerHTML = '';
        // Chama a função diretamente. Ela deve retornar sem lançar erros.
        expect(() => addSorting()).not.toThrow();
    });

    // Cenário de teste 7: Testar a compatibilidade com navegadores mais antigos (attachEvent)
    test('should use attachEvent if addEventListener is not available', () => {
        // Crie um mock do objeto de elemento para simular um ambiente antigo
        const mockElement = {
            addEventListener: undefined, // Simular a falta de addEventListener
            attachEvent: jest.fn(), // Mockar attachEvent
            parentElement: {
                querySelector: () => ({ parentElement: mockElement })
            }
        };

        // Forçar o código a usar o mock
        jest.spyOn(document, 'querySelector').mockReturnValue({
            querySelector: () => ({ parentElement: mockElement }),
            querySelectorAll: () => [
                { getAttribute: () => 'file', style: {}, querySelector: () => mockElement },
            ],
        });

        jest.spyOn(document, 'getElementById').mockReturnValue({ oninput: jest.fn() });

        addSorting();
        // Verificar se attachEvent foi chamado
        expect(mockElement.attachEvent).toHaveBeenCalled();
    });
});
