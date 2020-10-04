import { assetsTypes } from './types';

export const getAssetsStart = (params) => ({
    type: assetsTypes.GET_ASSETS_START,
    params
});

export const getAssetsSuccess = (data) => ({
    type: assetsTypes.GET_ASSETS_SUCCESS,
    data,
});

export const getAssetsFailure = (error) => ({
    type: assetsTypes.GET_ASSETS_FAILURE,
    error,
});
