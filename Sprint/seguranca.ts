/**
 * Valida um número de CPF (Cadastro de Pessoa Física) brasileiro.
 * @param cpf O CPF formatado ou não formatado (ex: '723.237.950-00').
 * @returns true se o CPF for válido, false caso contrário.
 */
export function validarCpf(cpf: string): boolean {
    // 1. Limpar o CPF: remover pontos, traços e outros caracteres não numéricos.
    const cleanCpf = cpf.replace(/[^\d]/g, '');

    // 2. Verificar o comprimento. Deve ter 11 dígitos.
    if (cleanCpf.length !== 11) {
        return false;
    }

    // 3. Checar sequências de dígitos iguais (que são CPFs inválidos,
    // mas que passariam no cálculo do DV, como '11111111111').
    if (/^(\d)\1{10}$/.test(cleanCpf)) {
        return false;
    }

    // 4. Iniciar o cálculo dos dígitos verificadores (DV).

    // Separa os 9 primeiros dígitos (base) e os 2 dígitos verificadores (DVs)
    const base = cleanCpf.substring(0, 9);
    const dv1 = parseInt(cleanCpf.charAt(9), 10);
    const dv2 = parseInt(cleanCpf.charAt(10), 10);
    
    let sum = 0;
    let remainder = 0;

    // --- CÁLCULO DO PRIMEIRO DÍGITO VERIFICADOR (DV1) ---
    for (let i = 0; i < 9; i++) {
        // Multiplica o dígito pela posição decrescente (10 a 2)
        sum += parseInt(base.charAt(i), 10) * (10 - i);
    }

    remainder = sum % 11;
    // O dígito verificador calculado (calculatedDv1)
    const calculatedDv1 = remainder < 2 ? 0 : 11 - remainder;

    // 5. Verificar se o primeiro DV calculado bate com o DV1 fornecido.
    if (calculatedDv1 !== dv1) {
        return false;
    }

    // --- CÁLCULO DO SEGUNDO DÍGITO VERIFICADOR (DV2) ---
    // Agora a soma inclui o primeiro DV calculado (9 dígitos base + 1 DV1)
    sum = 0;

    // A nova base é 'base' + 'calculatedDv1'
    const baseWithDv1 = base + calculatedDv1;

    for (let i = 0; i < 10; i++) {
        // Multiplica o dígito pela posição decrescente (11 a 2)
        sum += parseInt(baseWithDv1.charAt(i), 10) * (11 - i);
    }

    remainder = sum % 11;
    // O segundo dígito verificador calculado (calculatedDv2)
    const calculatedDv2 = remainder < 2 ? 0 : 11 - remainder;

    // 6. Verificar se o segundo DV calculado bate com o DV2 fornecido.
    return calculatedDv2 === dv2;
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
