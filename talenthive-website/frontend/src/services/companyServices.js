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