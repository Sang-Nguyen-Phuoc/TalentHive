import axiosCustom from "../utils/axiosCustom";

export const postLogin = async (email, password) => {
    const bodyData = { email, password };
    try {
        const data = await axiosCustom.post("/auth/login", bodyData);
        return data;
    } catch (error) {
        console.error("Error while logging in", error?.message || error);
        throw error;
    }
};

export const postSignup = async (email, password, name, role) => {
    const bodyData = { email, password, name, role };
    try {
        const data = await axiosCustom.post("/auth/register", bodyData);
        return data;
    } catch (error) {
        console.error("Error while signing up", error?.message || error);
        throw error;
    }
};
