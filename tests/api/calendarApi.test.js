import calendarApi from '../../src/api/calendarApi';

describe('API Calendar', () => {

    test('should be default configured', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });


    // As variaveis de ambiente tem que ter o protocolo http:// porque jest nao reconhece o localhost como valido
    test('should have token when user is logged in', async () => {
    
        const token = 'ABC123';
        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');

        expect(res.config.headers['x-token']).toBe(token);
    });
});
