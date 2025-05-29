import { userSlice, loginUser, getUser, updateUser, logoutUser, registerUser } from '../src/services/slices/userSlice';
import { TUser } from '../src/utils/types';
import { TLoginData, TAuthResponse, TRegisterData } from '../src/utils/burger-api';

jest.mock('../src/utils/burger-api', () => ({
    loginUserApi: jest.fn(),
    registerUserApi: jest.fn(),
    logoutApi: jest.fn(),
    getUserApi: jest.fn(),
    updateUserApi: jest.fn()
}));

describe('Управление пользователем', () => {
    beforeEach(() => {
        jest.clearAllMocks();   
    });

    const testLoginData: TLoginData = {
        email: 'test@example.com',
        password: 'password123',
    };

    const testUser: TUser = {
        email: 'test@example.com',
        name: 'Test User',
    };

    const testApiResponse: TAuthResponse = {
        success: true,
        user: testUser,
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
    };

    describe('Авторизация', () => {
        it('должен установить состояние загрузки при входе', () => {
            const testInitialState = userSlice.getInitialState();
            const action = loginUser.pending('requestId', testLoginData);
            const testState = userSlice.reducer(testInitialState, action);
    
            expect(testState.isLoading).toBe(true);
            expect(testState.isAuthChecked).toBe(true);
            expect(testState.user).toBeNull();
        });
    
        it('должен обновить состояние при успешном входе', async () => {
            const loginUserApi = require('../src/utils/burger-api').loginUserApi;
            loginUserApi.mockResolvedValue(testApiResponse);
    
            const testInitialState = userSlice.getInitialState();
            const action = loginUser.fulfilled(testUser, 'requestId', testLoginData);
            const testState = userSlice.reducer(testInitialState, action);
            
            expect(testState.user).toEqual(testUser);
            expect(testState.isLoading).toBe(false);
            expect(testState.isAuthChecked).toBe(true);
        });

        it('должен обработать ошибку входа', () => {
            const testInitialState = userSlice.getInitialState();
            const action = loginUser.rejected(new Error('Неверные учетные данные'), 'requestId', testLoginData);
            const testState = userSlice.reducer(testInitialState, action);
        
            expect(testState.isLoading).toBe(false);
            expect(testState.isAuthChecked).toBe(true);
            expect(testState.user).toBeNull();
        });
    });

    describe('Выход из системы', () => {
        it('должен очистить данные пользователя при выходе', () => {
            const logoutApi = require('@api').logoutApi;
            logoutApi.mockResolvedValue({ success: true });

            const testInitialState = userSlice.getInitialState();
            const action = logoutUser.fulfilled(undefined, 'requestId');
            const testState = userSlice.reducer(testInitialState, action);

            expect(testState.user).toBeNull();
            expect(testState.isLoading).toBe(false);
            expect(testState.isAuthChecked).toBe(true);
        });
    });

    describe('Получение данных пользователя', () => {
        it('должен установить состояние загрузки при запросе данных', () => {
            const testInitialState = userSlice.getInitialState();
            const action = getUser.pending('requestId');
            const testState = userSlice.reducer(testInitialState, action);
    
            expect(testState.isLoading).toBe(true);
        });
    
        it('должен обновить данные пользователя при успешном запросе', () => {
            const getUserApi = require('@api').getUserApi;
            getUserApi.mockResolvedValue({ success: true, user: testUser });
    
            const testInitialState = userSlice.getInitialState();
            const action = getUser.fulfilled({ success: true, user: testUser }, 'requestId');
            const testState = userSlice.reducer(testInitialState, action);
    
            expect(testState.user).toEqual(testUser);
            expect(testState.isLoading).toBe(false);
            expect(testState.isAuthChecked).toBe(true);
        });
    
        it('должен обработать ошибку получения данных', () => {
            const getUserApi = require('@api').getUserApi;
            getUserApi.mockRejectedValue(new Error('Ошибка получения данных'));
    
            const testInitialState = userSlice.getInitialState();
            const action = getUser.rejected(new Error('Ошибка получения данных'), 'requestId');
            const testState = userSlice.reducer(testInitialState, action);
    
            expect(testState.isLoading).toBe(false);
            expect(testState.isAuthChecked).toBe(true);
        });
    });

    describe('Обновление данных пользователя', () => {
        it('должен обновить данные пользователя', () => {
            const updateUserApi = require('@api').updateUserApi;
            const updatedUser = { ...testUser, name: 'Обновленное имя' };
            updateUserApi.mockResolvedValue({ success: true, user: updatedUser });
    
            const testInitialState = userSlice.getInitialState();
            const action = updateUser.fulfilled(
                { success: true, user: updatedUser }, 
                'requestId', 
                { name: 'Обновленное имя' }
            );
            const testState = userSlice.reducer(testInitialState, action);
    
            expect(testState.user).toEqual(updatedUser);
            expect(testState.isLoading).toBe(false);
        });
    });
});