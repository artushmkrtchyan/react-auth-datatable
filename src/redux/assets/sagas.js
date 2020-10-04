import { put, call, takeLatest } from 'redux-saga/effects';
import { getAssetsSuccess, getAssetsFailure } from './actions';
import { assetsTypes } from './types';
import { delay, sortArrayOfObject } from '../../helpers/helpers';
import { products } from '../../components/shared/dataTable/data';

export function* getAssets({ params }) {
    const {
        searchText = '',
        offset = 0,
        limit = 10,
        sortField = '',
        sortOrder = '',
    } = params;
    let data = [];
    let total = 0;

    const filterCallback = (item) => {
        const {
            asset_tag = '',
            serial = '',
            model = {},
            category = {},
            assigned_to = {},
            status_label = {},
        } = item;

        const regex = RegExp(searchText, 'gi');
        return (
            regex.test(asset_tag) ||
            regex.test(serial) ||
            (model.name && regex.test(model.name)) ||
            (category.name && regex.test(category.name)) ||
            (assigned_to && assigned_to.name && regex.test(assigned_to.name)) ||
            (status_label.name && regex.test(status_label.name))
        );
    };
    try {
        yield delay(300);
        if (searchText) {
            data = yield call(() => {
                const arr = sortArrayOfObject(
                    products.filter(filterCallback),
                    sortField,
                    sortOrder,
                );
                total = arr.length;
                return arr.slice(offset, limit);
            });
        } else {
            data = yield call(() => {
                const arr = sortArrayOfObject(products, sortField, sortOrder);
                return arr.slice(offset, limit);
            });
            total = products.length;
        }
        yield put(getAssetsSuccess({ data, total }));
    } catch (e) {
        yield put(getAssetsFailure(e.message));
    }
}

export function* assetsSaga() {
    yield takeLatest(assetsTypes.GET_ASSETS_START, getAssets);
}
