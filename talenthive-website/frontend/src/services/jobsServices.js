import axiosCustom from "../utils/axiosCustom";

export const getJobListAsEmployer = async (status, page, limit) => {
    try {
        const data = await axiosCustom.get("/api/v1/jobs/employer", {
            query: {
                status,
                page,
                limit,
            },
        });
        return data;
    } catch (error) {
        console.error("Error while getting job list", error?.message || error);
        throw error;
    }
};

export const getPublicJobList = async (page, limit) => {
    try {
        const data = await axiosCustom.get("/api/v1/jobs/public", {
            query: {
                page,
                limit,
            },
        });
        return data;
    } catch (error) {
        console.error("Error while getting job list", error?.message || error);
        throw error;
    }
};

export const getJobDetail = async (id) => {
    try {
        const data = await axiosCustom.get(`/api/v1/jobs/${id}`);
        return data;
    } catch (error) {
        console.error("Error while getting job detail", error?.message || error);
        throw error;
    }
};

export const postCreateJob = async (bodyData) => {
    try {
        const data = await axiosCustom.post("/api/v1/jobs", bodyData);
        return data;
    } catch (error) {
        console.error("Error while creating job", error?.message || error);
        throw error;
    }
}

export const deleteJob = async (id) => {
    try {
        const data = await axiosCustom.delete(`/api/v1/jobs/${id}`);
        return data;
    } catch (error) {
        console.error("Error while deleting job", error?.message || error);
        throw error;
    }
}

export const putUpdateJob = async (id, bodyData) => {
    try {
        const data = await axiosCustom.put(`/api/v1/jobs/${id}`, bodyData);
        return data;
    } catch (error) {
        console.error("Error while updating job", error?.message || error);
        throw error;
    }
}

export const getJobTypeList = async () => {
    try {
        const data = await axiosCustom.get("/api/v1/jobs/types");
        return data;
    } catch (error) {
        console.error("Error while getting job type list", error?.message || error);
        throw error;
    }
}

export const getJobCategoryList = async () => {
    try {
        const data = await axiosCustom.get("/api/v1/jobs/categories");
        return data;
    } catch (error) {
        console.error("Error while getting job category list", error?.message || error);
        throw error;
    }
}

export const getLocationList = async () => {
    try {
        const data = await axiosCustom.get("/api/v1/jobs/locations");
        return data;
    } catch (error) {
        console.error("Error while getting location list", error?.message || error);
        throw error;
    }
}

export const postApplyJob = async (jobId, bodyData) => {
    try {
        const data = await axiosCustom.post(`/api/v1/jobs/${jobId}/apply`, bodyData);
        return data;
    } catch (error) {
        console.error("Error while applying job", error?.message || error);
        throw error;
    }
}

export const getJobsByCompany = async (companyId) => {
    try {
        const data = await axiosCustom.get(`/api/v1/jobs/companies/${companyId}`);
        return data;
    } catch (error) {
        console.error("Error while getting job list by company", error?.message || error);
        throw error;
    }
}


export const getMyAppliedJobs = async () => {
    try {
        const data = await axiosCustom.get("/api/v1/applications/applied-jobs");
        return data;
    } catch (error) {
        console.error("Error while getting applied job list", error?.message || error);
        throw error;
    }
}

export const getApplicationDetail = async (id) => {
    try {
        const data = await axiosCustom.get(`/api/v1/applications/${id}`);
        return data;
    } catch (error) {
        console.error("Error while getting applied job detail", error?.message || error);
        throw error;
    }
}

export const getApplicationForJob = async (jobId) => {
    try {
        const data = await axiosCustom.get(`/api/v1/applications/jobs/${jobId}`);
        return data;
    } catch (error) {
        console.error("Error while getting applications for job", error?.message || error);
        throw error;
    }
}

export const getJobListSearching = async (keyword, job_type, job_category, location) => {
    try {
        const data = await axiosCustom.get("/api/v1/jobs/search", {
            params: {
                keyword,
                job_type,
                job_category,
                location,
            },
        });
        return data;
    } catch (error) {
        console.error("Error while getting job list", error?.message || error);
        throw error;
    }
}


export const getAllJobApplications = async (jobID) => {
    try {
        const data = await axiosCustom.get(`/api/v1/jobs/${jobID}/all-applications`);
        return data.applications;
    }
    catch (error) {
        console.error("Error while getting all job applications", error?.message || error);
        throw error;
    }
}
export const getJobListByAdmin = async () => {
    try {
        const data = await axiosCustom.get(`/api/v1/jobs/`);
        return data;
    } catch (error) {
        console.error("Error while getting job list by admin", error?.message || error);
        throw error;
    }
}

export const postAdminApproveJob = async (id) => {
    try {
        const response = await axiosCustom.post(`/api/v1/jobs/approve`, {
            id: id
        });
        return response;
    } catch (error) {
        console.error("Error while approving job", error?.message || error);
        throw error;
    }
}

export const postAdminRejectJob = async (id) => {
    try {
        const response = await axiosCustom.post(`/api/v1/jobs/reject`, {
            id: id
        });
        return response;
    } catch (error) {
        console.error("Error while rejecting job", error?.message || error);
        throw error;
    }
}