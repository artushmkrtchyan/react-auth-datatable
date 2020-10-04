import { passwordsTypes } from './types';

const initialState = {
    passwords: {},
    error: '',
    loading: false,
};

export const passwords = (state = initialState, action) => {
    switch (action.type) {
        case passwordsTypes.GET_PASSWORDS_START:
            return { ...state, passwords: {}, loading: true };
        case passwordsTypes.GET_PASSWORDS_SUCCESS:
            return { ...state, passwords: action.data, loading: false };
        case passwordsTypes.GET_PASSWORDS_FAILURE:
            return { ...state, passwords: {}, loading: false };
        case passwordsTypes.CHANGE_FAVORITE:
            const data = state.passwords.data.map((i) =>
                i.id === action.id ? { ...i, personal: !i.personal } : i,
            );
            return { ...state, passwords: { ...state.passwords, data } };
        default:
            return state;
    }
};
