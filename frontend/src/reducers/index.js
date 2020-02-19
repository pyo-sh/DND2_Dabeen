import { combineReducers } from 'redux';
import user from './user';
import opponent from './opponent';
import posts from './posts'

const rootReducer = combineReducers({
    user,
    opponent,
    posts
})

export default rootReducer;