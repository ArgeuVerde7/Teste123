import { validarCpf, gerarSenhaSegura } from '../Sprint/seguranca';

describe('validarCpf', () => {
  // Testes para CPFs válidos
  it('should return true for a valid CPF with all digits', () => {
    // CPFs válidos
    // Este teste deve passar quando a implementação de validarCpf for corrigida.
    expect(validarCpf('723.237.950-00')).toBe(true); 
    expect(validarCpf('987.654.321-09')).toBe(true);
    // Adicionando mais um CPF válido para aumentar a cobertura
    expect(validarCpf('158.745.963-00')).toBe(true);
  });

  // Testes para CPFs inválidos
  it('should return false for an invalid CPF', () => {
    // CPF com menos de 11 dígitos
    expect(validarCpf('123.456.789-0')).toBe(false);
    // CPF com mais de 11 dígitos
    expect(validarCpf('123.456.789-012')).toBe(false);
    // Sequência de 11 dígitos iguais
    expect(validarCpf('111.111.111-11')).toBe(false);
    // Dígitos verificadores incorretos
    expect(validarCpf('123.456.789-01')).toBe(false);
  });
});

describe('gerarSenhaSegura', () => {
  // Teste para comprimento padrão
  it('should generate a password with a default length of 12', () => {
    const password = gerarSenhaSegura();
    expect(password.length).toBe(12);
  });

  // Teste para um comprimento específico
  it('should generate a password with the specified length', () => {
    const password = gerarSenhaSegura(16);
    expect(password.length).toBe(16);
  });

  // Teste para inclusão de tipos de caracteres
  it('should generate a password with only lowercase letters', () => {
    const password = gerarSenhaSegura(10, false, true, false, false);
    expect(password).toMatch(/^[a-z]+$/);
  });

  it('should generate a password with only uppercase letters and numbers', () => {
    const password = gerarSenhaSegura(10, true, false, true, false);
    expect(password).toMatch(/^[A-Z0-9]+$/);
  });

  // Teste para erro quando nenhum tipo de caractere é selecionado
  it('should throw an error if no character type is selected', () => {
    expect(() => gerarSenhaSegura(10, false, false, false, false)).toThrow('Pelo menos um tipo de caractere deve ser selecionado.');
  });

  // Teste para garantir que a senha é aleatória
  it('should generate different passwords on different calls', () => {
    const password1 = gerarSenhaSegura();
    const password2 = gerarSenhaSegura();
    expect(password1).not.toBe(password2);
  });
});
