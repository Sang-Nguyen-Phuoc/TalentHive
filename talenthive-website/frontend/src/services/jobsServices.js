import axiosCustom from "../utils/axiosCustom";


export const getJobListAsEmployer = async (status, page, limit) => {
    try {
        const data = await axiosCustom.get("/api/v1/jobs/employer", {
            query: {
                status,
                page,
                limit,
            }
        });
        return data;
    } catch (error) {
        console.error("Error while getting job list", error?.message || error);
        throw error;
    }
}