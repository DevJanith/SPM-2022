
export const authenticate = (response) => {
    if (window === 'undefined') return
    sessionStorage.setItem('token', JSON.stringify(response));
    sessionStorage.setItem('userId', JSON.stringify(response.result.id));

};

export const getToken = () => {
    if (window === 'undefined') return
    if (sessionStorage.getItem('token')) {
        return JSON.parse(sessionStorage.getItem('token'));
    }
};

export const getUser = () => {
    if (window === 'undefined') return
    if (sessionStorage.getItem('userId')) {
        return JSON.parse(sessionStorage.getItem('userId'));
    }
};

export const logout = next => {
    if (window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('cartData');
    }
};