/**
 * Valida um número de CPF.
 * @param cpf A string do CPF a ser validada.
 * @returns Retorna true se o CPF for válido, caso contrário, false.
 */
export function validarCpf(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpfLimpo.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  // Lógica para validar os dois dígitos verificadores
  for (let i = 9; i < 11; i++) {
    let soma = 0;
    for (let j = 0; j < i; j++) {
      soma += parseInt(cpfLimpo.charAt(j)) * ((i + 1) - j);
    }
    const digitoVerificador = (soma * 10) % 11;
    if (digitoVerificador === 10 || digitoVerificador === 11) {
      if (0 !== parseInt(cpfLimpo.charAt(i))) return false;
    } else {
      if (digitoVerificador !== parseInt(cpfLimpo.charAt(i))) return false;
    }
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
  if (maiusculas) todosChars += charsMaiusculas;
  if (minusculas) todosChars += charsMinusculas;
  if (numeros) todosChars += charsNumeros;
  if (simbolos) todosChars += charsSimbolos;

  if (todosChars.length === 0) {
    throw new Error('Pelo menos um tipo de caractere deve ser selecionado.');
  }

  let senha = '';
  const requisitos: string[] = [];
  if (maiusculas) requisitos.push(charsMaiusculas);
  if (minusculas) requisitos.push(charsMinusculas);
  if (numeros) requisitos.push(charsNumeros);
  if (simbolos) requisitos.push(charsSimbolos);

  // Garante pelo menos um caractere de cada tipo selecionado
  for (const requisito of requisitos) {
    const indiceAleatorio = Math.floor(Math.random() * requisito.length);
    senha += requisito[indiceAleatorio];
  }

  // Completa o restante da senha
  for (let i = senha.length; i < comprimento; i++) {
    const indiceAleatorio = Math.floor(Math.random() * todosChars.length);
    senha += todosChars[indiceAleatorio];
  }

  // Embaralha a senha para garantir a aleatoriedade
  return senha.split('').sort(() => 0.5 - Math.random()).join('');
}
