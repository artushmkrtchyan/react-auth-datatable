import { usersTypes } from './types';

export const getUsersStart = () => ({
    type: usersTypes.GET_USERS_START,
});

export const getUsersSuccess = (data) => ({
    type: usersTypes.GET_USERS_SUCCESS,
    data,
});

export const getUsersFailure = (error) => ({
    type: usersTypes.GET_USERS_FAILURE,
    error,
});
