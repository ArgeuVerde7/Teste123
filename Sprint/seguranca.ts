/**
 * Valida um número de CPF.
 * @param cpf A string do CPF a ser validada.
 * @returns Retorna true se o CPF for válido, caso contrário, false.
 */
export function validarCpf(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/[^\D]/g, '');

  // Verifica se o CPF tem 11 dígitos e se não é uma sequência de números repetidos
  if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  // Lógica para validar o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10) {
    resto = 0;
  }
  if (resto !== parseInt(cpfLimpo.charAt(9))) {
    return false;
  }

  // Lógica para validar o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10) {
    resto = 0;
  }
  if (resto !== parseInt(cpfLimpo.charAt(10))) {
    return false;
  }

  return true;
}

/**
 * Gera uma senha segura e aleatória.
 * @param comprimento O comprimento da senha. Padrão é 12.
 * @param maiusculas Se a senha deve incluir letras maiúsculas. Padrão é true.
 * @param minusculas Se a senha deve incluir letras minúsculas. Padrão é true.
 * @param numeros Se a senha deve incluir números. Padrão é true.
 * @param simbolos Se a senha deve incluir símbolos. Padrão é true.
 * @returns Uma string contendo a senha gerada.
 */
export function gerarSenhaSegura(
  comprimento: number = 12,
  maiusculas: boolean = true,
  minusculas: boolean = true,
  numeros: boolean = true,
  simbolos: boolean = true
): string {
  const charsMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charsMinusculas = 'abcdefghijklmnopqrstuvwxyz';
  const charsNumeros = '0123456789';
  const charsSimbolos = '!@#$%^&*()_+-=[]{}|;:",.<>/?`~';

  let todosChars = '';
  const requisitos: string[] = [];
  
  if (maiusculas) {
    todosChars += charsMaiusculas;
    requisitos.push(charsMaiusculas);
  }
  if (minusculas) {
    todosChars += charsMinusculas;
    requisitos.push(charsMinusculas);
  }
  if (numeros) {
    todosChars += charsNumeros;
    requisitos.push(charsNumeros);
  }
  if (simbolos) {
    todosChars += charsSimbolos;
    requisitos.push(charsSimbolos);
  }

  if (todosChars.length === 0) {
    throw new Error('Pelo menos um tipo de caractere deve ser selecionado.');
  }

  // Verifica o suporte à API de criptografia
  if (!window.crypto?.getRandomValues) {
    throw new Error('Ambiente não suporta um gerador de números aleatórios criptograficamente seguro.');
  }

  const senhaArray: string[] = [];

  // Garante pelo menos um caractere de cada tipo selecionado usando um gerador seguro
  for (const requisito of requisitos) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const charAleatorio = requisito[array[0] % requisito.length];
    senhaArray.push(charAleatorio);
  }
  
  // Gera o restante da senha
  const array = new Uint32Array(comprimento - senhaArray.length);
  window.crypto.getRandomValues(array);

  // Completa o restante da senha usando um for-of loop
  for (const randomValue of array) {
    const indiceAleatorio = randomValue % todosChars.length;
    senhaArray.push(todosChars[indiceAleatorio]);
  }

  // Embaralha a senha para garantir a aleatoriedade
  return shuffleArray(senhaArray).join('');
}

/**
 * Função auxiliar para embaralhar um array.
 * @param array O array a ser embaralhado.
 * @returns O array embaralhado.
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomBytes = new Uint32Array(1);
    window.crypto.getRandomValues(randomBytes);
    const j = randomBytes[0] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
