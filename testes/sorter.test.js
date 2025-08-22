// sorter.test.js
/**
 * @jest-environment jsdom
 */

// Importar o código sorter.js
const addSorting = require('../src/sorter.js');

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

    beforeEach(() => {
        document.body.innerHTML = basicHTML;
        // Chamada direta, sem depender do evento 'load'
        addSorting();
    });

    test('should initialize sorting and search functionality on page load', () => {
        const headers = document.querySelectorAll('th[data-col]');
        expect(headers[0].innerHTML).toContain('<span class="sorter"></span>');
        expect(headers[1].innerHTML).not.toContain('<span class="sorter"></span>');
        expect(headers[2].innerHTML).toContain('<span class="sorter"></span>');
        expect(document.getElementById('fileSearch')).not.toBeNull();
    });

    test('should sort rows by numeric column (Branches) correctly', () => {
        const branchesHeader = document.querySelector('th[data-col="branches"]');
        branchesHeader.click();
        const rows = document.querySelectorAll('tbody tr');
        expect(rows[0].querySelector('td[data-value="90"]')).not.toBeNull();
        expect(rows[1].querySelector('td[data-value="50"]')).not.toBeNull();

        branchesHeader.click();
        const sortedRowsDesc = document.querySelectorAll('tbody tr');
        expect(sortedRowsDesc[0].querySelector('td[data-value="50"]')).not.toBeNull();
        expect(sortedRowsDesc[1].querySelector('td[data-value="90"]')).not.toBeNull();
    });

    test('should sort rows by string column (File) correctly', () => {
        const fileHeader = document.querySelector('th[data-col="file"]');
        fileHeader.click();
        const rows = document.querySelectorAll('tbody tr');
        expect(rows[0].querySelector('td[data-value="file1.js"]')).not.toBeNull();
        expect(rows[1].querySelector('td[data-value="file2.js"]')).not.toBeNull();

        fileHeader.click();
        const sortedRowsDesc = document.querySelectorAll('tbody tr');
        expect(sortedRowsDesc[0].querySelector('td[data-value="file2.js"]')).not.toBeNull();
        expect(sortedRowsDesc[1].querySelector('td[data-value="file1.js"]')).not.toBeNull();
    });

    // TESTE CORRIGIDO
    test('should filter rows correctly based on valid search input', () => {
        const searchInput = document.getElementById('fileSearch');
        searchInput.value = 'file1';
        searchInput.dispatchEvent(new Event('input'));

        const rows = document.querySelectorAll('tbody tr');
        // A ordem no HTML é 'file2.js' (rows[0]) e 'file1.js' (rows[1])
        expect(rows[0].style.display).toBe('none'); // file2.js deve estar escondido
        expect(rows[1].style.display).toBe(''); // file1.js deve estar visível
    });

    test('should handle invalid regex search gracefully', () => {
        const searchInput = document.getElementById('fileSearch');
        searchInput.value = '[';
        searchInput.dispatchEvent(new Event('input'));
        const rows = document.querySelectorAll('tbody tr');
        expect(rows[0].style.display).toBe('none');
        expect(rows[1].style.display).toBe('none');

        searchInput.value = 'file';
        searchInput.dispatchEvent(new Event('input'));
        expect(rows[0].style.display).toBe('');
        expect(rows[1].style.display).toBe('');
    });

    // TESTE CORRIGIDO
    test('should return early if the coverage summary table is not found', () => {
        document.body.innerHTML = '';
        // A função é chamada diretamente, não há mais erro de tipo
        expect(() => addSorting()).not.toThrow();
    });

    // TESTE CORRIGIDO
    test('should use attachEvent if addEventListener is not available', () => {
        // Mockar addEventListener para ser nulo e attachEvent para ser uma função
        const originalAddEventListener = window.Element.prototype.addEventListener;
        const originalAttachEvent = window.Element.prototype.attachEvent;

        // Sobrescrever as funções para o teste
        window.Element.prototype.addEventListener = undefined;
        window.Element.prototype.attachEvent = jest.fn();

        // Chamar a função principal para testar o caminho de código
        addSorting();

        // Verificar se attachEvent foi chamado
        expect(window.Element.prototype.attachEvent).toHaveBeenCalled();

        // Restaurar as funções originais para não afetar outros testes
        window.Element.prototype.addEventListener = originalAddEventListener;
        window.Element.prototype.attachEvent = originalAttachEvent;
    });
});

