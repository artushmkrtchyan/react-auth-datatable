import { combineReducers } from 'redux';
import { users } from '../redux/users/reducers';
import { assets } from '../redux/assets/reducers';
import { passwords } from '../redux/passwords/reducers';

const rootReducer = combineReducers({
    users,
    assets,
    passwords,
});

export default rootReducer;
