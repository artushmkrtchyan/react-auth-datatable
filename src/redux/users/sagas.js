import { put, call, takeLatest } from 'redux-saga/effects';
import * as service from '../../service';
import { getUsersSuccess, getUsersFailure } from './actions';
import { usersTypes } from './types';
import { delay } from '../../helpers/helpers';

export function* getUsers() {
    try {
        yield delay(500);
        const data = yield call(() => {
            return service.fetchUsers(2, 5);
        });
        yield put(getUsersSuccess(data));
    } catch (e) {
        yield put(getUsersFailure(e.message));
    }
}

export function* usersSaga() {
    yield takeLatest(usersTypes.GET_USERS_START, getUsers);
}
