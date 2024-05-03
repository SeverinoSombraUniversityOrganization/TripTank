import axios from 'axios';
import BACKEND_API_URL from '../config/backendApiUrlConfig';

const authService = {
    login: (username, password) => {
        return axios.post(`${BACKEND_API_URL}/auth/sign-in`, { username, password })
            .then(response => {
                if (!response.data) {
                    throw new Error('Error response');
                }
                return response.data;
            })
            .catch(error => {
                console.log('Unknown error:', error);
                throw error;
            });
    }
};

export default authService;
