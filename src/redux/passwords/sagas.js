import { put, call, takeLatest } from 'redux-saga/effects';
import { getPasswordsSuccess, getPasswordsFailure } from './actions';
import { passwordsTypes } from './types';
import { delay, sortArrayOfObject } from '../../helpers/helpers';
import { passwords } from '../../components/shared/dataTable/data';

export function* getPasswords({ params }) {
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
            name = '',
            username = '',
            description = '',
            url = '',
            modified = '',
        } = item;

        const regex = RegExp(searchText, 'gi');
        return (
            regex.test(name) ||
            regex.test(username) ||
            regex.test(description) ||
            regex.test(url) ||
            regex.test(modified)
        );
    };
    try {
        yield delay(300);
        if (searchText) {
            data = yield call(() => {
                const arr = sortArrayOfObject(
                    passwords.filter(filterCallback),
                    sortField,
                    sortOrder,
                );
                total = arr.length;
                return arr.slice(offset, limit);
            });
        } else {
            data = yield call(() => {
                const arr = sortArrayOfObject(passwords, sortField, sortOrder);
                return arr.slice(offset, limit);
            });
            total = passwords.length;
        }
        yield put(getPasswordsSuccess({ data, total }));
    } catch (e) {
        yield put(getPasswordsFailure(e.message));
    }
}

export function* passwordsSaga() {
    yield takeLatest(passwordsTypes.GET_PASSWORDS_START, getPasswords);
}
