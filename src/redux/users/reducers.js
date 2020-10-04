import { usersTypes } from './types';

const initialState = {
    users: [],
    error: '',
    isLoading: false,
};

export const users = (state = initialState, action) => {
    switch (action.type) {
        case usersTypes.GET_USERS_START:
            return { ...state, isLoading: true };
        case usersTypes.GET_USERS_SUCCESS:
            return { ...state, users: action.data, isLoading: false };
        case usersTypes.GET_USERS_FAILURE:
            return { ...state, users: [], isLoading: false };
        default:
            return state;
    }
};
