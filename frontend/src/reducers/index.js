import { combineReducers } from 'redux';
import user from './user';
import opponent from './opponent';

const rootReducer = combineReducers({
    user,
    opponent,
})

export default rootReducer;