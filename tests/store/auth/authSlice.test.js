import { authSlice, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { initialState, authenticatedState, notAuthenticatedState } from '../../__fixtures__/authSlice';
import { testUserCredentials } from '../../__fixtures__/testUser';

describe('authSlice', () => {
    test('should return the initial state', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('should be logged in', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    test('should be logged out', () => {
        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });
});