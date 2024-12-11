
export const saveAccessToken = (token) => {
    window.localStorage.setItem('access_token', token);
};

export const getAccessToken = () => {
    return window.localStorage.getItem('access_token');
};

export const removeAccessToken = () => {
    window.localStorage.removeItem('access_token');
};


