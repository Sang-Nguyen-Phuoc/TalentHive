import axiosCustom from "../utils/axiosCustom"


export const getACompanyByEmployerId = async (employerId) => {
    try { 
        const data = await axiosCustom.get(`/api/v1/companies/employer/${employerId}`);
        return data;
    } catch (error) {
        console.error("Error while getting company", error?.message || error);
        throw error;
    }
}

export const getCompanyAsEmployer = async () => {
    try {
        const data = await axiosCustom.get("/api/v1/companies/employer");
        return data;
    } catch (error) {
        console.error("Error while getting company", error?.message || error);
        throw error;
    }
}

export const postCreateCompany = async (bodyData) => {
    try {
        const data = await axiosCustom.post("/api/v1/companies", bodyData);
        return data;
    } catch (error) {
        console.error("Error while creating company", error?.message || error);
        throw error;
    }
}