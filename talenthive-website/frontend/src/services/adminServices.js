import axiosCustom from "../utils/axiosCustom";


export const getAppOverview = async () => {
    try {
        const data = await axiosCustom.get("/api/v1/admin/overview");
        return data;
    } catch (error) {
        console.error("Error while getting app overview", error?.message || error);
        throw error;
    }
}

export const getActivitiesData = async (period, startTime, endTime) => {
    try {
        const data = await axiosCustom.get("/api/v1/admin/activities")
            .params({ period, startTime, endTime });
        return data;
    } catch (error) {
        console.error("Error while getting activities data", error?.message || error);
        throw error;
    }
}

export const getLogs = async (filters, search) => {
    try {
        const data = await axiosCustom.get("/api/v1/admin/logs", {
            params: { ...filters, search },
        });
        return data;
    } catch (error) {
        console.error("Error while getting logs", error?.message || error);
        throw error;
    }
}