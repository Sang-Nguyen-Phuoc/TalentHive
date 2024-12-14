import axiosCustom from "../utils/axiosCustom";

export const getUserById = async (id) => {
    try {
        const data = await axiosCustom.get(`/api/v1/users/${id}`);
        return data;
    } catch (error) {
        console.error("Error while getting user by id", error?.message || error);
        throw error;
    }
}

