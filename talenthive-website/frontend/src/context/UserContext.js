import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../services/authServices";
import { getAccessToken } from "../utils/authToken";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            setUser(data);
        } catch (error) {
            setError(error);
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
    };

    const logout = () => {
        setUser(null);
    };

    return <UserContext.Provider value={{ user, login, logout, loading, error }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};
