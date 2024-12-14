import axiosCustom from "../utils/axiosCustom";

export const postLogin = async (email, password) => {
    const bodyData = { email, password };
    try {
        const data = await axiosCustom.post("/api/v1/auth/login", bodyData);
        return data;
    } catch (error) {
        console.error("Error while logging in", error?.message || error);
        throw error;
    }
};

export const postSignup = async (email, password, name, role) => {
    const bodyData = { email, password, name, role };
    try {
        const data = await axiosCustom.post("/api/v1/auth/register", bodyData);
        return data;
    } catch (error) {
        console.error("Error while signing up", error?.message || error);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const data = await axiosCustom.get("/api/v1/auth/me");
        return data;
    } catch (error) {
        console.error("Error while getting user info", error?.message || error);
        throw error;
    }
}

export const postChangePassword = async (currentPassword, newPassword, newPasswordConfirm) => {
    const bodyData = { currentPassword, newPassword, newPasswordConfirm };
    try {
        const data = await axiosCustom.post("/api/v1/auth/change-password", bodyData);
        return data;
    } catch (error) {
        console.error("Error while changing password", error?.message || error);
        throw error;
    }
}