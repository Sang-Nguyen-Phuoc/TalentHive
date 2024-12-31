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
        const data = await axiosCustom.post("/api/v1/companies", bodyData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        console.error("Error while creating company", error?.message || error);
        throw error;
    }
}

export const postUpdateCompany = async (bodyData) => {
    try {
        const data = await axiosCustom.post("/api/v1/companies/update", bodyData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        console.error("Error while updating company", error?.message || error);
        throw error;
    }
}

export const getHumanResourceList = async (id) => {
    try {
        const data = await axiosCustom.get(`/api/v1/companies/${id}/human-resources`);
        return data;
    } catch (error) {
        console.error("Error while getting human resource list", error?.message || error);
        throw error;
    }
}

export const getAccessionCode = async (id) => {
    try {
        const data = await axiosCustom.post(`/api/v1/companies/${id}/accession-code`);
        return data;
    } catch (error) {
        console.error("Error while getting accession code", error?.message || error);
        throw error;
    }
}

export const postVerifyAccessionCode = async (accessionCode) => {
    try {
        const data = await axiosCustom.post("/api/v1/companies/verify-accession-code", { 
            accession_code: accessionCode
         });
        return data;
    } catch (error) {
        console.error("Error while verifying accession code", error?.message || error);
        throw error;
    }
}