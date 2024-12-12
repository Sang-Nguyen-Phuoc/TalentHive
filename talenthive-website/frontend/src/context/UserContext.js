import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../services/authServices";
import { getAccessToken } from "../utils/authToken";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(localStorage.getItem('role') || 'guest');

    console.log("chào");
    
    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            console.log("data: ", data);
            
            setUser(data?.user);
            setRole(data?.user?.role);
        } catch (error) {
            setError(error);
            setRole('guest');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = getAccessToken();
        if (token && !user) {
            fetchUser();
        }
    }, []);

    const login = (userInfo) => {
        setUser(userInfo);
        setRole(userInfo?.role);
    };

    const logout = () => {
        setUser(null);
        setRole('guest');
    };

    return <UserContext.Provider value={{ user, login, logout, loading, error, role }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};
