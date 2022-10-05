import Item from "antd/lib/list/Item";
import React, { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }

        setLoading(false)
    }, []);

    const login = (email, password) => {
        const loggedUser = {
            id: "123",
            email,
        }

        localStorage.setItem("user", JSON.stringify(loggedUser))

        if(password === "123") {
            setUser({id: "123", email})
            navigate("/")
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider 
            value={{authenticate: !!user, user, login, loading, logout}}>
                {children}
        </AuthContext.Provider>
    )
}