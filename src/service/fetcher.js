import axios from 'axios';
import cnf from '../config/config';

export const fetcher = (url, method = 'GET', body = {}) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = localStorage.getItem('token');

    if (token) {
        headers.headers.Authorization = 'Bearer ' + token;
    }

    if (method.toLowerCase() === 'get') {
        return axios.get(cnf.apiUrl + url, headers).then((res) => res.data);
    }

    return axios[method.toLowerCase()](
        cnf.apiUrl + url,
        JSON.stringify(body),
        headers,
    ).then((res) => res.data);
};
