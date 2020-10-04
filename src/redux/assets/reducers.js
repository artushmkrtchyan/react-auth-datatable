import { assetsTypes } from './types';

const initialState = {
    assets: {},
    error: '',
    loading: false,
};

export const assets = (state = initialState, action) => {
    switch (action.type) {
        case assetsTypes.GET_ASSETS_START:
            return { ...state, assets: {}, loading: true };
        case assetsTypes.GET_ASSETS_SUCCESS:
            return { ...state, assets: action.data, loading: false };
        case assetsTypes.GET_ASSETS_FAILURE:
            return { ...state, assets: {}, loading: false };
        default:
            return state;
    }
};
