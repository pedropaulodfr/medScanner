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
            const token =  localStorage.getItem("authToken");
            const response = await api.get(path, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    post: async (path, data) => {
        try {
            const token =  localStorage.getItem("authToken");
            const response = await api.post(path, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
            const token =  localStorage.getItem("authToken");
            const response = await api.delete(`${path}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
            const token =  localStorage.getItem("authToken");
            const response = await api.put(path, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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