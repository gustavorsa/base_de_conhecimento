import React, { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

import { api, createSignin } from "../config/global";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, []);

    const login = async (email, password) => {
        const response = await createSignin(email, password);

        const loggedUser = response.data;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token)

        api.defaults.headers.Authorization = `Bearer ${token}`
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setUser(loggedUser)
        navigate("/")
    }

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
        api.defaults.headers.Authorization = null;
        api.defaults.headers.common['Authorization'] = null;
    }

    return (
        <AuthContext.Provider 
            value={{authenticate: !!user, user, login, loading, logout}}>
                {children}
        </AuthContext.Provider>
    )
}