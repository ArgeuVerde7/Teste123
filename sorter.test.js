// sorter.test.js

/**
 * @jest-environment jsdom
 */

// Importar o código sorter.js
// O `require` executará a função anônima imediatamente após o listener de 'load'
const addSorting = require('./sorter.js');

describe('sorter.js', () => {

  // Antes de cada teste, vamos configurar um ambiente de teste com um HTML básico
  beforeEach(() => {
    document.body.innerHTML = `
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
            <td data-value="file1.js">file1.js</td>
            <td data-value="100">100%</td>
            <td data-value="90">90%</td>
          </tr>
          <tr>
            <td data-value="file2.js">file2.js</td>
            <td data-value="80">80%</td>
            <td data-value="50">50%</td>
          </tr>
        </tbody>
      </table>
      <template id="filterTemplate">
        <div class="search-box">
          <input type="text" id="fileSearch" placeholder="Search...">
        </div>
      </template>
    `;

    // A função addSorting é chamada pelo window.addEventListener('load', ...)
    // Simular o evento de carregamento para acioná-la
    window.dispatchEvent(new Event('load'));
  });

  // Cenário de teste 1: Verificar se a função principal é executada e as funções internas são chamadas
  test('should initialize sorting and search functionality on page load', () => {
    // Você pode testar se a UI foi modificada conforme esperado
    // Por exemplo, verificar se os "sorters" foram adicionados aos cabeçalhos
    const headers = document.querySelectorAll('th[data-col]');
    expect(headers[0].innerHTML).toContain('<span class="sorter"></span>'); // File (sortable)
    expect(headers[1].innerHTML).not.toContain('<span class="sorter"></span>'); // Statements (not sortable)
    expect(headers[2].innerHTML).toContain('<span class="sorter"></span>'); // Branches (sortable)

    // Verificar se a caixa de busca foi adicionada
    expect(document.getElementById('fileSearch')).not.toBeNull();
  });

  // Cenário de teste 2: Testar a funcionalidade de ordenação
  test('should sort rows correctly when a sortable column is clicked', () => {
    const branchesHeader = document.querySelector('th[data-col="branches"]');
    branchesHeader.click();

    const rows = document.querySelectorAll('tbody tr');
    // A ordem deve ser de 'file2.js' (50%) para 'file1.js' (90%)
    expect(rows[0].querySelector('td[data-value="50"]')).not.toBeNull();
    expect(rows[1].querySelector('td[data-value="90"]')).not.toBeNull();

    // Clicar novamente para testar a ordem decrescente
    branchesHeader.click();
    const sortedRowsDesc = document.querySelectorAll('tbody tr');
    // A nova ordem deve ser 'file1.js' (90%) para 'file2.js' (50%)
    expect(sortedRowsDesc[0].querySelector('td[data-value="90"]')).not.toBeNull();
    expect(sortedRowsDesc[1].querySelector('td[data-value="50"]')).not.toBeNull();
  });

  // Cenário de teste 3: Testar a funcionalidade de busca
  test('should filter rows correctly based on search input', () => {
    const searchInput = document.getElementById('fileSearch');
    searchInput.value = 'file1';
    
    // Disparar o evento 'input' para simular a digitação
    searchInput.dispatchEvent(new Event('input'));
    
    const rows = document.querySelectorAll('tbody tr');
    expect(rows[0].style.display).toBe(''); // file1.js should be visible
    expect(rows[1].style.display).toBe('none'); // file2.js should be hidden
  });
});