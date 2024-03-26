import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

console.log("api", process.env.REACT_APP_API);

export const useApi = () => ({
    validateToken: async (token) => {
        const response = await api.post('/validate', { token });
        return {
            user: {username : response.data.username, email: response.data.email}
        };
    },
    signin: async (email, password) => {
        try {
            const response = await api.post('/login', { email, password })
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
            
            return response;
        } catch (error) {
            return error            
        }
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
});