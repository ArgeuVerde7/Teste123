/**
 * accessManagementSystem.test.js
 *
 * Arquivo de testes para as funcionalidades do Sistema de Gestão de Perfis de Acesso.
 */

// Importa todas as funções e o objeto _internal para resetar os dados
const AccessManagementSystem = require('./accessManagementSystem');

describe('Sistema de Gestão de Perfis de Acesso', () => {
  // Espia console.log e console.warn para evitar poluir a saída do teste
  // e para permitir asserções sobre suas chamadas, se necessário.
  let consoleLogSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    // Reseta os dados em memória antes de cada teste para garantir isolamento
    AccessManagementSystem._internal.resetData();
    // Cria os espiões antes de cada teste
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaura as funções originais do console após cada teste
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  // --- Testes para Funções de Autenticação ---
  describe('authenticateUser', () => {
    test('deve autenticar um usuário com credenciais válidas e ativo', () => {
      const user = AccessManagementSystem.authenticateUser('admin', 'password123');
      expect(user).not.toBeNull();
      expect(user.username).toBe('admin');
      expect(user.profile.name).toBe('Administrador');
      expect(consoleLogSpy).toHaveBeenCalledWith("Usuário 'admin' autenticado com sucesso.");
    });

    test('não deve autenticar um usuário com senha inválida', () => {
      const user = AccessManagementSystem.authenticateUser('admin', 'senha_errada');
      expect(user).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Falha na autenticação para o usuário 'admin'.");
    });

    test('não deve autenticar um usuário inexistente', () => {
      const user = AccessManagementSystem.authenticateUser('inexistente', 'qualquer_senha');
      expect(user).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Falha na autenticação para o usuário 'inexistente'.");
    });

    test('não deve autenticar um usuário inativo', () => {
      // O usuário 'maria.souza' começa como inativo
      const user = AccessManagementSystem.authenticateUser('maria.souza', 'senha789');
      expect(user).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Falha na autenticação para o usuário 'maria.souza'.");
    });
  });

  // --- Testes para Funções de Gestão de Usuários ---
  describe('Gestão de Usuários', () => {
    test('listUsers deve retornar todos os usuários com nome do perfil', () => {
      const users = AccessManagementSystem.listUsers();
      expect(users).toHaveLength(3);
      expect(users[0].profileName).toBe('Administrador');
      expect(users[1].profileName).toBe('Usuário Padrão');
    });

    test('getUser deve retornar um usuário existente', () => {
      const user = AccessManagementSystem.getUser('user1');
      expect(user).not.toBeNull();
      expect(user.username).toBe('admin');
      expect(user.profileName).toBe('Administrador');
    });

    test('getUser deve retornar null para um usuário inexistente', () => {
      const user = AccessManagementSystem.getUser('user_inexistente');
      expect(user).toBeNull();
    });

    test('addUser deve adicionar um novo usuário com sucesso', () => {
      const initialCount = AccessManagementSystem.listUsers().length;
      const newUser = AccessManagementSystem.addUser({
        username: 'novo.teste',
        password: '123',
        profileId: 'profile2',
        isActive: true
      });
      expect(newUser).toHaveProperty('id');
      expect(newUser.username).toBe('novo.teste');
      expect(AccessManagementSystem.listUsers()).toHaveLength(initialCount + 1);
      expect(consoleLogSpy).toHaveBeenCalledWith("Usuário 'novo.teste' adicionado com sucesso.");
    });

    test('addUser deve lançar erro se o nome de usuário já existir', () => {
      expect(() => AccessManagementSystem.addUser({
        username: 'admin', // Nome de usuário já existente
        password: '123',
        profileId: 'profile1',
        isActive: true
      })).toThrow("Nome de usuário 'admin' já existe.");
    });

    test('updateUser deve atualizar um usuário existente', () => {
      const updatedUser = AccessManagementSystem.updateUser('user2', { username: 'joao.atualizado', isActive: false });
      expect(updatedUser.username).toBe('joao.atualizado');
      expect(updatedUser.isActive).toBe(false);
      expect(AccessManagementSystem.getUser('user2').username).toBe('joao.atualizado');
      expect(consoleLogSpy).toHaveBeenCalledWith("Usuário 'user2' atualizado com sucesso.");
    });

    test('updateUser deve retornar null para um usuário inexistente', () => {
      const updatedUser = AccessManagementSystem.updateUser('user_inexistente', { username: 'nao.existe' });
      expect(updatedUser).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Usuário com ID 'user_inexistente' não encontrado para atualização.");
    });

    test('deleteUser deve deletar um usuário existente', () => {
      const initialCount = AccessManagementSystem.listUsers().length;
      const deleted = AccessManagementSystem.deleteUser('user1');
      expect(deleted).toBe(true);
      expect(AccessManagementSystem.listUsers()).toHaveLength(initialCount - 1);
      expect(AccessManagementSystem.getUser('user1')).toBeNull();
      expect(consoleLogSpy).toHaveBeenCalledWith("Usuário com ID 'user1' deletado com sucesso.");
    });

    test('deleteUser deve retornar false para um usuário inexistente', () => {
      const initialCount = AccessManagementSystem.listUsers().length;
      const deleted = AccessManagementSystem.deleteUser('user_inexistente');
      expect(deleted).toBe(false);
      expect(AccessManagementSystem.listUsers()).toHaveLength(initialCount);
      expect(consoleWarnSpy).toHaveBeenCalledWith("Usuário com ID 'user_inexistente' não encontrado para exclusão.");
    });
  });

  // --- Testes para Funções de Gestão de Perfis ---
  describe('Gestão de Perfis', () => {
    test('listProfiles deve retornar todos os perfis', () => {
      const profiles = AccessManagementSystem.listProfiles();
      expect(profiles).toHaveLength(3);
      expect(profiles[0].name).toBe('Administrador');
    });

    test('getProfile deve retornar um perfil existente', () => {
      const profile = AccessManagementSystem.getProfile('profile1');
      expect(profile).not.toBeNull();
      expect(profile.name).toBe('Administrador');
    });

    test('getProfile deve retornar null para um perfil inexistente', () => {
      const profile = AccessManagementSystem.getProfile('profile_inexistente');
      expect(profile).toBeNull();
    });

    test('addProfile deve adicionar um novo perfil com sucesso', () => {
      const initialCount = AccessManagementSystem.listProfiles().length;
      const newProfile = AccessManagementSystem.addProfile({
        name: 'Desenvolvedor',
        description: 'Acesso a ferramentas de desenvolvimento',
        permissions: ['code_access', 'deploy_app']
      });
      expect(newProfile).toHaveProperty('id');
      expect(newProfile.name).toBe('Desenvolvedor');
      expect(AccessManagementSystem.listProfiles()).toHaveLength(initialCount + 1);
      expect(consoleLogSpy).toHaveBeenCalledWith("Perfil 'Desenvolvedor' adicionado com sucesso.");
    });

    test('addProfile deve lançar erro se o nome do perfil já existir', () => {
      expect(() => AccessManagementSystem.addProfile({
        name: 'Administrador', // Nome de perfil já existente
        description: 'Duplicado',
        permissions: []
      })).toThrow("Perfil com nome 'Administrador' já existe.");
    });

    test('updateProfile deve atualizar um perfil existente', () => {
      const updatedProfile = AccessManagementSystem.updateProfile('profile1', { description: 'Super Administrador' });
      expect(updatedProfile.description).toBe('Super Administrador');
      expect(AccessManagementSystem.getProfile('profile1').description).toBe('Super Administrador');
      expect(consoleLogSpy).toHaveBeenCalledWith("Perfil com ID 'profile1' atualizado com sucesso.");
    });

    test('updateProfile deve retornar null para um perfil inexistente', () => {
      const updatedProfile = AccessManagementSystem.updateProfile('profile_inexistente', { name: 'nao.existe' });
      expect(updatedProfile).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Perfil com ID 'profile_inexistente' não encontrado para atualização.");
    });

    test('deleteProfile deve deletar um perfil existente sem usuários associados', () => {
      // Adiciona um perfil temporário para deletar
      const tempProfile = AccessManagementSystem.addProfile({ name: 'Temp', permissions: [] });
      const initialCount = AccessManagementSystem.listProfiles().length;
      const deleted = AccessManagementSystem.deleteProfile(tempProfile.id);
      expect(deleted).toBe(true);
      expect(AccessManagementSystem.listProfiles()).toHaveLength(initialCount - 1);
      expect(AccessManagementSystem.getProfile(tempProfile.id)).toBeNull();
      expect(consoleLogSpy).toHaveBeenCalledWith(`Perfil com ID '${tempProfile.id}' deletado com sucesso.`);
    });

    test('deleteProfile deve lançar erro se o perfil tiver usuários associados', () => {
      expect(() => AccessManagementSystem.deleteProfile('profile1')).toThrow("Não é possível deletar o perfil 'profile1'. Existem usuários associados a ele.");
    });

    test('deleteProfile deve retornar false para um perfil inexistente', () => {
      const initialCount = AccessManagementSystem.listProfiles().length;
      const deleted = AccessManagementSystem.deleteProfile('profile_inexistente');
      expect(deleted).toBe(false);
      expect(AccessManagementSystem.listProfiles()).toHaveLength(initialCount);
      expect(consoleWarnSpy).toHaveBeenCalledWith("Perfil com ID 'profile_inexistente' não encontrado para exclusão.");
    });
  });

  // --- Testes para Funções de Gestão de Permissões ---
  describe('Gestão de Permissões', () => {
    test('assignPermissionsToProfile deve atribuir permissões a um perfil', () => {
      const profile = AccessManagementSystem.assignPermissionsToProfile('profile2', ['view_reports', 'edit_profile']);
      expect(profile.permissions).toEqual(['view_reports', 'edit_profile']);
      expect(consoleLogSpy).toHaveBeenCalledWith("Permissões atualizadas para o perfil 'Usuário Padrão'.");
    });

    test('assignPermissionsToProfile deve garantir unicidade das permissões', () => {
      const profile = AccessManagementSystem.assignPermissionsToProfile('profile2', ['view_reports', 'view_reports', 'edit_profile']);
      expect(profile.permissions).toEqual(['view_reports', 'edit_profile']);
    });

    test('assignPermissionsToProfile deve retornar null para um perfil inexistente', () => {
      const profile = AccessManagementSystem.assignPermissionsToProfile('profile_inexistente', ['perm1']);
      expect(profile).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Perfil com ID 'profile_inexistente' não encontrado para atribuição de permissões.");
    });

    test('getProfilePermissions deve retornar as permissões de um perfil', () => {
      const permissions = AccessManagementSystem.getProfilePermissions('profile1');
      expect(permissions).toEqual(['manage_users', 'manage_profiles', 'manage_permissions', 'view_dashboard']);
    });

    test('getProfilePermissions deve retornar null para um perfil inexistente', () => {
      const permissions = AccessManagementSystem.getProfilePermissions('profile_inexistente');
      expect(permissions).toBeNull();
    });
  });
});