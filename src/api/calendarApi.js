import axios from 'axios';
import { getEnvVariables } from '../calendar/helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

//TODO: Configurar interceptores
calendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
});

export default calendarApi;