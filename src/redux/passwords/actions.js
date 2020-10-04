import { passwordsTypes } from './types';

export const getPasswordsStart = (params) => ({
    type: passwordsTypes.GET_PASSWORDS_START,
    params,
});

export const getPasswordsSuccess = (data) => ({
    type: passwordsTypes.GET_PASSWORDS_SUCCESS,
    data,
});

export const getPasswordsFailure = (error) => ({
    type: passwordsTypes.GET_PASSWORDS_FAILURE,
    error,
});

export const changeFavorite = (id) => ({
    type: passwordsTypes.CHANGE_FAVORITE,
    id,
});
