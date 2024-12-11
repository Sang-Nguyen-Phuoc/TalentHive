import React, { createContext, useState, useContext } from "react";
import { getMe } from "../services/authServices";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const token = localStorage.getItem("accessToken");
    //     if (token) {
    //         setLoading(true);
    //         getMe()
    //             .then((response) => {
    //                 setUser(response.data);
    //                 setLoading(false);
    //             })
    //             .catch((err) => {
    //                 setError("Failed to fetch user data");
    //                 setLoading(false);
    //             });
    //     }
    // }, []);

    const login = (userInfo) => {
        setUser(userInfo);
    };

    const logout = () => {
        setUser(null);
    };

    return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};
