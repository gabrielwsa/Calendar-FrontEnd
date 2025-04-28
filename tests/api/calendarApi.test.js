import calendarApi from '../../src/api/calendarApi';

describe('API Calendar', () => {

    test('should be default configured', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

});
