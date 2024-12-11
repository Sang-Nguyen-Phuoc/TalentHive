import axiosCustom from "../utils/axiosCustom"


export const getACompany = async (companyId) => {
    try {
        const data = await axiosCustom.get(`/api/v1/companies/${companyId}`);
        return data;
    } catch (error) {
        console.error("Error while getting company", error?.message || error);
        throw error;
    }
}