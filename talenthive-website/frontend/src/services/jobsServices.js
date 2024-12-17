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
