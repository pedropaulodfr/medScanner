import React, { createContext, useState, useContext, useEffect } from "react";
import { useApi } from "../../api/useApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storageData = localStorage.getItem("authToken");
    return !!storageData; // Definir isLoggedIn com base na presença do token no localStorage
  });

  const [_user, set_User] = useState([])
  
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setIsLoggedIn(true);
        }
      }
    };
    validateToken();
  }, []);

  const login = async (email, senha) => {
    const response = await api.signin(email, senha)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
      if (response.data?.user && response.data?.token) {
        set_User(response.data.user);
        setToken(response.data.token)
        setIsLoggedIn(true)
        return { success: true, statusCode: response.status }
      }
    setIsLoggedIn(false)
    return { success: false, statusCode: 500 }
  };
  

  const logout = async () => {
    setToken("");
    await api.logout();
    setIsLoggedIn(false);
  };

  const setToken = (token) => {
    localStorage.setItem('authToken', token);
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, _user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
