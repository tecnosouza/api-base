const authController = require('@controllers/authController');
const authService = require('@services/authService');
const { successResponse, errorResponse } = require('@utils/responseUtils');
const { AuthRegisterResponseDTO, AuthLoginResponseDTO } = require('@dtos/authDTO');

// Mockar os módulos
jest.mock('../services/authService');
jest.mock('../utils/responseUtils');
jest.mock('../dtos/authDTO');

describe('authController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Limpar mocks antes de cada teste
        jest.clearAllMocks();

        // Mockar DTOs para retornar instâncias simples para testes
        AuthRegisterResponseDTO.mockImplementation((data) => ({ ...data, type: 'AuthRegisterResponseDTO' }));
        AuthLoginResponseDTO.mockImplementation((data) => ({ token: data, type: 'AuthLoginResponseDTO' }));
    });

    describe('register', () => {
        it('deve registrar um novo usuário com sucesso e retornar status 201', async () => {
            const mockPerson = { id: 1, email: 'test@example.com' };
            req.body = { email: 'test@example.com', password: 'password123' };
            authService.register.mockResolvedValue(mockPerson);

            await authController.register(req, res);

            expect(authService.register).toHaveBeenCalledWith(req.body);
            expect(successResponse).toHaveBeenCalledWith(res, 'Registro realizado com sucesso.', { ...mockPerson, type: 'AuthRegisterResponseDTO' }, 201);
            expect(AuthRegisterResponseDTO).toHaveBeenCalledWith(mockPerson);
        });

        it('deve retornar 400 se a pessoa já existir', async () => {
            req.body = { email: 'existing@example.com', password: 'password123' };
            authService.register.mockRejectedValue(new Error('Person already exists'));

            await authController.register(req, res);

            expect(authService.register).toHaveBeenCalledWith(req.body);
            expect(errorResponse).toHaveBeenCalledWith(res, 'Pessoa já existe.', [{ field: 'email', message: 'E-mail já cadastrado.' }], 400);
        });

        it('deve retornar 500 para erros internos do servidor durante o registro', async () => {
            req.body = { email: 'error@example.com', password: 'password123' };
            authService.register.mockRejectedValue(new Error('Database error'));

            await authController.register(req, res);

            expect(authService.register).toHaveBeenCalledWith(req.body);
            expect(errorResponse).toHaveBeenCalledWith(res, 'Erro interno do servidor.', [], 500);
        });
    });

    describe('login', () => {
        

        it('deve retornar 400 para credenciais inválidas', async () => {
            req.body = { username: 'invaliduser', password: 'wrongpassword' };
            authService.login.mockRejectedValue(new Error('Invalid credentials'));

            await authController.login(req, res);

            expect(authService.login).toHaveBeenCalledWith(req.body.username, req.body.password);
            expect(errorResponse).toHaveBeenCalledWith(res, 'Credenciais inválidas.', [{ field: 'credentials', message: 'Usuário ou senha inválidos.' }], 400);
        });

        it('deve retornar 500 para erros internos do servidor durante o login', async () => {
            req.body = { username: 'erroruser', password: 'password123' };
            authService.login.mockRejectedValue(new Error('Network error'));

            await authController.login(req, res);

            expect(authService.login).toHaveBeenCalledWith(req.body.username, req.body.password);
            expect(errorResponse).toHaveBeenCalledWith(res, 'Erro interno do servidor.', [], 500);
        });
    });
});
