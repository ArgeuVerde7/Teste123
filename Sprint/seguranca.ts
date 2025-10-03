/**
 * Valida um número de CPF (Cadastro de Pessoa Física) brasileiro.
 * @param cpf O CPF formatado ou não formatado (ex: '723.237.950-00').
 * @returns true se o CPF for válido, false caso contrário.
 */
export function validarCpf(cpf: string): boolean {
    // 1. Limpar e verificar o formato.
    const cleanCpf = cpf.replace(/[^\d]/g, '');

    if (cleanCpf.length !== 11) {
        return false; // Deve ter 11 dígitos.
    }

    // 2. Bloquear CPFs inválidos com todos os dígitos iguais (ex: '111.111.111-11').
    if (/^(\d)\1{10}$/.test(cleanCpf)) {
        return false;
    }

    // 3. Função auxiliar para calcular o dígito verificador.
    const calculateDv = (base: string): number => {
        let sum = 0;
        const limit = base.length + 1; // O peso começa em 10 (para 9 dígitos) ou 11 (para 10 dígitos)

        for (let i = 0; i < base.length; i++) {
            // O multiplicador é (limite - i). Ex: para 9 dígitos, os pesos são 10, 9, 8...
            sum += parseInt(base.charAt(i), 10) * (limit - i);
        }

        const remainder = sum % 11;
        
        // Retorna 0 se o resto for 0 ou 1, caso contrário retorna 11 - resto.
        return remainder < 2 ? 0 : 11 - remainder;
    };

    // 4. Calcular e verificar o 1º dígito verificador (DV1).
    const baseDv1 = cleanCpf.substring(0, 9);
    const expectedDv1 = calculateDv(baseDv1);
    const actualDv1 = parseInt(cleanCpf.charAt(9), 10);

    if (expectedDv1 !== actualDv1) {
        return false;
    }

    // 5. Calcular e verificar o 2º dígito verificador (DV2).
    // A base agora inclui o primeiro dígito verificador (10 dígitos).
    const baseDv2 = cleanCpf.substring(0, 10);
    const expectedDv2 = calculateDv(baseDv2);
    const actualDv2 = parseInt(cleanCpf.charAt(10), 10);

    return expectedDv2 === actualDv2;
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
