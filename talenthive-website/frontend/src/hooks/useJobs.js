import { useFetch } from './useFetch';
import { BASE_URL } from '../utils/Constants';

export const useJobList = () => {
    const { payload, isLoading, status } = useFetch(`${BASE_URL}/jobs`, {
        method: 'GET',
        body: null,
    });

    return { jobs: payload, loading: isLoading, error: status };
};

export const useJobDetails = (jobId) => {
    const { payload, isLoading, status } = useFetch(`${BASE_URL}/jobs/${jobId}`, {
        method: 'GET',
        body: null,
    });

    return { job: payload, loading: isLoading, error: status };
};