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

export const getEmployerById = async (id) => {
    try {
        const data = await axiosCustom.get(`/api/v1/employers/${id}`);
        return data;
    } catch (error) {
        console.error("Error while getting employer by id", error?.message || error);
        throw error;
    }
}

export const getCandidateById = async (id) => {
    try {
        const data = await axiosCustom.get(`/api/v1/candidates/${id}`);
        return data;
    } catch (error) {
        console.error("Error while getting candidate by id", error?.message || error);
        throw error;
    }
}

export const postUpdateCandidate = async (data) => {
    try {
        const response = await axiosCustom.post(`/api/v1/candidates/update`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("Error while updating candidate", error?.message || error);
        throw error;
    }
}

export const getCandidateListByAdmin = async () => {
    try {
        const data = await axiosCustom.get(`/api/v1/users/candidates`);
        return data;
    } catch (error) {
        console.error("Error while getting candidate list by admin", error?.message || error);
        throw error;
    }
}

export const postUpdateEmployerInfo = async (data) => {
    try {
        const response = await axiosCustom.post(`/api/v1/employers/update`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("Error while updating employer info", error?.message || error);
        throw error;
    }
}