import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../services/authServices";
import { getAccessToken, saveAccessToken } from "../utils/authToken";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [role, setRole] = useState(localStorage.getItem('role') || 'guest');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setGuest = () => {
        setUser(null);
        setRole('guest');
        localStorage.removeItem('user');
        localStorage.setItem('role', 'guest');
        saveAccessToken(null);
    };

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            if (data?.user) {
                setUser(data.user);
                setRole(data.user.role);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('role', data.user.role);
            } else {
                setGuest();
            }
        } catch (error) {
            setError(error);
            setGuest();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = getAccessToken();
        if (token) fetchUser();
        else setGuest();
    }, []);

    const login = async () => fetchUser();

    const logout = setGuest;

    return (
        <UserContext.Provider value={{ user, login, logout, loading, error, role }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
