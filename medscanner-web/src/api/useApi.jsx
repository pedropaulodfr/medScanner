import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
    validateToken: async (token) => {
        const response = await api.post('/validate', { token });
        return {
            user: {username : response.data.username, email: response.data.email}
        };
    },
    signin: async (email, senha) => {
        try {
            const response = await api.post('/login', { email, senha })
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
    },
    get: async (path) => {
        try {
            const response = await api.get(path)
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
    post: async (path, data) => {
        try {
            const response = await api.post(path, data)
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
    delete: async (path, id) => {
        try {
            const response = await api.delete(`${path}/${id}`)
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
    put: async (path, data) => {
        try {
            const response = await api.put(path, data)
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
});