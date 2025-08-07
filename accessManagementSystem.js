/**
 * accessManagementSystem.js
 *
 * Este arquivo contém a lógica JavaScript para um Sistema de Gestão de Perfis de Acesso.
 * Ele simula operações de banco de dados em memória para usuários e perfis,
 * e inclui funcionalidades básicas de autenticação e gestão de permissões.
 */

// --- Dados em Memória (Simulando um Banco de Dados) ---
let users = [
  { id: 'user1', username: 'admin', password: 'password123', profileId: 'profile1', isActive: true },
  { id: 'user2', username: 'joao.silva', password: 'senha456', profileId: 'profile2', isActive: true },
  { id: 'user3', username: 'maria.souza', password: 'senha789', profileId: 'profile3', isActive: false }
];

let profiles = [
  { id: 'profile1', name: 'Administrador', description: 'Acesso total ao sistema', permissions: ['manage_users', 'manage_profiles', 'manage_permissions', 'view_dashboard'] },
  { id: 'profile2', name: 'Usuário Padrão', description: 'Acesso limitado a funcionalidades básicas', permissions: ['view_dashboard', 'view_self_profile'] },
  { id: 'profile3', name: 'Visitante', description: 'Apenas visualização de dados públicos', permissions: ['view_dashboard'] }
];

// --- Funções Auxiliares ---

/**
 * Gera um ID único simples. Em um ambiente real, usaria UUIDs ou IDs de banco de dados.
 * @returns {string} Um ID único.
 */
function generateUniqueId() {
  return 'id_' + Date.now() + Math.random().toString(36).substr(2, 9);
}

// --- Funções de Autenticação ---

/**
 * Autentica um usuário no sistema.
 * @param {string} username - O nome de usuário.
 * @param {string} password - A senha do usuário.
 * @returns {object|null} O objeto do usuário autenticado se as credenciais forem válidas, caso contrário, null.
 */
function authenticateUser(username, password) {
  const user = users.find(u => u.username === username && u.password === password && u.isActive);
  if (user) {
    console.log(`Usuário '${username}' autenticado com sucesso.`);
    // Em um sistema real, aqui você geraria um token JWT ou sessão.
    return { ...user, profile: getProfile(user.profileId) }; // Retorna o usuário com seu perfil associado
  }
  console.warn(`Falha na autenticação para o usuário '${username}'.`);
  return null;
}

// --- Funções de Gestão de Usuários (CRUD) ---

/**
 * Lista todos os usuários.
 * @returns {Array<object>} Uma lista de todos os usuários.
 */
function listUsers() {
  return users.map(user => ({ ...user, profileName: getProfile(user.profileId)?.name }));
}

/**
 * Obtém um usuário pelo ID.
 * @param {string} userId - O ID do usuário.
 * @returns {object|null} O objeto do usuário ou null se não encontrado.
 */
function getUser(userId) {
  const user = users.find(u => u.id === userId);
  return user ? { ...user, profileName: getProfile(user.profileId)?.name } : null;
}

/**
 * Adiciona um novo usuário.
 * @param {object} userData - Os dados do novo usuário (username, password, profileId, isActive).
 * @returns {object} O objeto do usuário adicionado.
 * @throws {Error} Se o nome de usuário já existir.
 */
function addUser(userData) {
  if (users.some(u => u.username === userData.username)) {
    throw new Error(`Nome de usuário '${userData.username}' já existe.`);
  }
  const newUser = {
    id: generateUniqueId(),
    username: userData.username,
    password: userData.password, // Em produção, a senha deve ser hashada!
    profileId: userData.profileId,
    isActive: typeof userData.isActive === 'boolean' ? userData.isActive : true
  };
  users.push(newUser);
  console.log(`Usuário '${newUser.username}' adicionado com sucesso.`);
  return newUser;
}

/**
 * Atualiza um usuário existente.
 * @param {string} userId - O ID do usuário a ser atualizado.
 * @param {object} updates - Os campos a serem atualizados (ex: { username: 'novo.nome', isActive: false }).
 * @returns {object|null} O objeto do usuário atualizado ou null se não encontrado.
 */
function updateUser(userId, updates) {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    // Evita que o ID seja alterado
    const { id, ...updatableFields } = updates;
    users[userIndex] = { ...users[userIndex], ...updatableFields };
    console.log(`Usuário '${userId}' atualizado com sucesso.`);
    return users[userIndex];
  }
  console.warn(`Usuário com ID '${userId}' não encontrado para atualização.`);
  return null;
}

/**
 * Deleta um usuário.
 * @param {string} userId - O ID do usuário a ser deletado.
 * @returns {boolean} True se o usuário foi deletado, false caso contrário.
 */
function deleteUser(userId) {
  const initialLength = users.length;
  users = users.filter(u => u.id !== userId);
  if (users.length < initialLength) {
    console.log(`Usuário com ID '${userId}' deletado com sucesso.`);
    return true;
  }
  console.warn(`Usuário com ID '${userId}' não encontrado para exclusão.`);
  return false;
}

// --- Funções de Gestão de Perfis (CRUD) ---

/**
 * Lista todos os perfis de acesso.
 * @returns {Array<object>} Uma lista de todos os perfis.
 */
function listProfiles() {
  return profiles;
}

/**
 * Obtém um perfil pelo ID.
 * @param {string} profileId - O ID do perfil.
 * @returns {object|null} O objeto do perfil ou null se não encontrado.
 */
function getProfile(profileId) {
  return profiles.find(p => p.id === profileId) || null;
}

/**
 * Adiciona um novo perfil de acesso.
 * @param {object} profileData - Os dados do novo perfil (name, description, permissions).
 * @returns {object} O objeto do perfil adicionado.
 * @throws {Error} Se o nome do perfil já existir.
 */
function addProfile(profileData) {
  if (profiles.some(p => p.name === profileData.name)) {
    throw new Error(`Perfil com nome '${profileData.name}' já existe.`);
  }
  const newProfile = {
    id: generateUniqueId(),
    name: profileData.name,
    description: profileData.description || '',
    permissions: Array.isArray(profileData.permissions) ? profileData.permissions : []
  };
  profiles.push(newProfile);
  console.log(`Perfil '${newProfile.name}' adicionado com sucesso.`);
  return newProfile;
}

/**
 * Atualiza um perfil existente.
 * @param {string} profileId - O ID do perfil a ser atualizado.
 * @param {object} updates - Os campos a serem atualizados (ex: { description: 'Nova descrição' }).
 * @returns {object|null} O objeto do perfil atualizado ou null se não encontrado.
 */
function updateProfile(profileId, updates) {
  const profileIndex = profiles.findIndex(p => p.id === profileId);
  if (profileIndex !== -1) {
    const { id, ...updatableFields } = updates;
    profiles[profileIndex] = { ...profiles[profileIndex], ...updatableFields };
    console.log(`Perfil com ID '${profileId}' atualizado com sucesso.`);
    return profiles[profileIndex];
  }
  console.warn(`Perfil com ID '${profileId}' não encontrado para atualização.`);
  return null;
}

/**
 * Deleta um perfil.
 * @param {string} profileId - O ID do perfil a ser deletado.
 * @returns {boolean} True se o perfil foi deletado, false caso contrário.
 * @throws {Error} Se houver usuários associados a este perfil.
 */
function deleteProfile(profileId) {
  if (users.some(u => u.profileId === profileId)) {
    throw new Error(`Não é possível deletar o perfil '${profileId}'. Existem usuários associados a ele.`);
  }
  const initialLength = profiles.length;
  profiles = profiles.filter(p => p.id !== profileId);
  if (profiles.length < initialLength) {
    console.log(`Perfil com ID '${profileId}' deletado com sucesso.`);
    return true;
  }
  console.warn(`Perfil com ID '${profileId}' não encontrado para exclusão.`);
  return false;
}

// --- Funções de Gestão de Permissões ---

/**
 * Atribui permissões a um perfil.
 * @param {string} profileId - O ID do perfil.
 * @param {Array<string>} newPermissions - Um array de strings representando as permissões.
 * @returns {object|null} O perfil atualizado ou null se não encontrado.
 */
function assignPermissionsToProfile(profileId, newPermissions) {
  const profile = getProfile(profileId);
  if (profile) {
    profile.permissions = Array.isArray(newPermissions) ? [...new Set(newPermissions)] : []; // Garante unicidade
    console.log(`Permissões atualizadas para o perfil '${profile.name}'.`);
    return profile;
  }
  console.warn(`Perfil com ID '${profileId}' não encontrado para atribuição de permissões.`);
  return null;
}

/**
 * Obtém as permissões de um perfil.
 * @param {string} profileId - O ID do perfil.
 * @returns {Array<string>|null} Um array de permissões ou null se o perfil não for encontrado.
 */
function getProfilePermissions(profileId) {
  const profile = getProfile(profileId);
  return profile ? [...profile.permissions] : null;
}

// --- Exportações para uso externo (ex: em um módulo Node.js ou para testes) ---
module.exports = {
  // Funções de Autenticação
  authenticateUser,

  // Funções de Gestão de Usuários
  listUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,

  // Funções de Gestão de Perfis
  listProfiles,
  getProfile,
  addProfile,
  updateProfile,
  deleteProfile,

  // Funções de Gestão de Permissões
  assignPermissionsToProfile,
  getProfilePermissions,

  // Para fins de teste/exemplo, expõe os dados em memória (NÃO FAÇA ISSO EM PRODUÇÃO!)
  _internal: {
    users,
    profiles,
    resetData: () => {
      users = [
        { id: 'user1', username: 'admin', password: 'password123', profileId: 'profile1', isActive: true },
        { id: 'user2', username: 'joao.silva', password: 'senha456', profileId: 'profile2', isActive: true },
        { id: 'user3', username: 'maria.souza', password: 'senha789', profileId: 'profile3', isActive: false }
      ];
      profiles = [
        { id: 'profile1', name: 'Administrador', description: 'Acesso total ao sistema', permissions: ['manage_users', 'manage_profiles', 'manage_permissions', 'view_dashboard'] },
        { id: 'profile2', name: 'Usuário Padrão', description: 'Acesso limitado a funcionalidades básicas', permissions: ['view_dashboard', 'view_self_profile'] },
        { id: 'profile3', name: 'Visitante', description: 'Apenas visualização de dados públicos', permissions: ['view_dashboard'] }
      ];
    }
  }
};

// --- Exemplos de Uso (para testar no console do navegador ou Node.js) ---
/*
console.log('--- Autenticação ---');
const authenticatedAdmin = authenticateUser('admin', 'password123');
console.log('Admin autenticado:', authenticatedAdmin);

const failedAuth = authenticateUser('joao.silva', 'senha_errada');
console.log('Autenticação falha:', failedAuth);

console.log('\n--- Gestão de Usuários ---');
console.log('Usuários iniciais:', listUsers());

try {
  const newUser = addUser({ username: 'novo.usuario', password: 'abc', profileId: 'profile2', isActive: true });
  console.log('Novo usuário adicionado:', newUser);
} catch (error) {
  console.error(error.message);
}

const updatedUser = updateUser('user2', { isActive: false, profileId: 'profile3' });
console.log('Usuário 2 atualizado:', updatedUser);

console.log('Usuário 1:', getUser('user1'));

deleteUser('user3');
console.log('Usuários após exclusão:', listUsers());

console.log('\n--- Gestão de Perfis ---');
console.log('Perfis iniciais:', listProfiles());

try {
  const newProfile = addProfile({ name: 'Gerente', description: 'Gerencia equipes', permissions: ['view_dashboard', 'manage_users'] });
  console.log('Novo perfil adicionado:', newProfile);
} catch (error) {
  console.error(error.message);
}

updateProfile('profile2', { description: 'Acesso básico para funcionários' });
console.log('Perfil 2 atualizado:', getProfile('profile2'));

// Tentativa de deletar perfil com usuários associados (deve falhar)
try {
  deleteProfile('profile2');
} catch (error) {
  console.error(error.message);
}

// Deletar um perfil sem usuários associados
const newProfileId = profiles.find(p => p.name === 'Gerente')?.id;
if (newProfileId) {
  deleteProfile(newProfileId);
}
console.log('Perfis após exclusão:', listProfiles());

console.log('\n--- Gestão de Permissões ---');
assignPermissionsToProfile('profile2', ['view_reports', 'edit_self_profile']);
console.log('Permissões do Perfil 2:', getProfilePermissions('profile2'));

// Resetar dados para múltiplos testes/execuções
// module.exports._internal.resetData();
// console.log('\nDados resetados:', listUsers(), listProfiles());
*/