import { all, spawn } from 'redux-saga/effects';
import { usersSaga } from '../redux/users/sagas';
import { assetsSaga } from '../redux/assets/sagas';
import { passwordsSaga } from '../redux/passwords/sagas';

export default function* rootSaga() {
    yield all([spawn(usersSaga)]);
    yield all([spawn(assetsSaga)]);
    yield all([spawn(passwordsSaga)]);
}
