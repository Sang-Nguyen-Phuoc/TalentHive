import { useEffect } from "react";
import useReducer from "./useReducer";
import { getAccessToken } from "../utils/authToken";

function fetchReducer(state, action) {
    switch (action.type) {
        case 'fetchAPI/request':
            return { ...state, isLoading: action.isLoading };
        case 'fetchAPI/success':
        case 'fetchAPI/error':
            return {
                ...state,
                isLoading: action.isLoading,
                status: action.status,
                payload: action.payload,
            };
        default:
            return state;
    }
}

export const useFetch = (url, req) => {
    const [state, dispatch] = useReducer(fetchReducer, {
        payload: [],
        isLoading: false,
        status: 'fail',
    })
    useEffect(() => {
        (async () => {
            dispatch({
                type: 'fetchAPI/request',
                isLoading: true,
            });

            try {
                if (req.body !== null) {
                    const response = await fetch(url, req);
                    const data = await response.json();
                    if (data.status === 'success') {
                        dispatch({
                            type: 'fetchAPI/success',
                            payload: data.data,
                            isLoading: false,
                            status: 'success',
                        });
                    } else {
                        dispatch({
                            type: 'fetchAPI/error',
                            payload: [],
                            isLoading: false,
                            status: data.message,
                        });
                    }
                }
            } catch (err) {
                dispatch({
                    type: 'fetchAPI/error',
                    payload: [],
                    isLoading: false,
                    status: 'fail',
                });
            }
        })()
    }, [url, req, req.body])

    return { ...state };
}

export const fetchDataWithToken = async (url) => {
    const token = getAccessToken();

    if (!token) {
        console.error('No access token found');
        return;
    }

    useEffect(() => {
        (async () => {
            dispatch({
                type: 'fetchAPI/request',
                isLoading: true,
            });
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data.status === 'success') {
                    dispatch({
                        type: 'fetchAPI/success',
                        payload: data.data,
                        isLoading: false,
                        status: 'success',
                    });
                } else {
                    dispatch({
                        type: 'fetchAPI/error',
                        payload: [],
                        isLoading: false,
                        status: data.message,
                    });
                }
            } catch (err) {
                dispatch({
                    type: 'fetchAPI/error',
                    payload: [],
                    isLoading: false,
                    status: 'fail',
                });
            }
        })()
    }, [url, token])
};
