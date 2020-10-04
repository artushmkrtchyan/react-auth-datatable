import { fetcher } from './fetcher';

export const fetchUsers = (start, limit) =>
    fetcher(`/users?_start=${start}&_limit=${limit}`);

export const login = (body) => fetcher('/auth/login', 'POST', body);
export const oauth = (body) => fetcher('/auth/oauth', 'POST', body);
export const register = (body) => fetcher('/auth/register', 'POST', body);
export const sendPasswordToken = (body) =>
    fetcher('/auth/send-password-token', 'POST', body);
export const resetPassword = (body) =>
    fetcher('/auth/reset-password', 'POST', body);
export const fetchDashboard = () => fetcher('');
export const verifiedEmail = (body) => fetcher('/auth/verified', 'POST', body);
