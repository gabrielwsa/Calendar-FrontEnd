import { authSlice, onLogin, onLogout, clearErrorMessage } from '../../../src/store/auth/authSlice';
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

    test('should handle error message when logging out', () => {
        const errorMessage = 'Invalid credentials';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('should clear error message', () => {
        const errorMessage = 'Invalid credentials';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage());
        expect(newState.errorMessage).toBe(undefined);
    });
});