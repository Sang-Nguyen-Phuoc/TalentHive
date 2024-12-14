import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../services/authServices";
import { getAccessToken } from "../utils/authToken";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(localStorage.getItem('role') || 'guest');

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            console.log("data: ", data);
            
            if (data?.user) {
                
                setUser(data?.user);
                setRole(data?.user?.role);
                localStorage.setItem('user', JSON.stringify(data?.user));
                localStorage.setItem('role', data?.user?.role);
            } else {
                setRole('guest');
                localStorage.setItem('user', null);
                localStorage.setItem('role', 'guest');
            }
        } catch (error) {
            setError(error);
            setRole('guest');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = getAccessToken();
        console.log("token: ", token);
        
        if (token) {
            fetchUser();
        } else {
            setRole('guest');
            localStorage.setItem('role', 'guest');
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
