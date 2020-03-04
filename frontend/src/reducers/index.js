import { combineReducers } from 'redux';
import user from './user';
import opponent from './opponent';
import posts from './posts'
import questions from './questions';
import basket from './basket';

const rootReducer = combineReducers({
    user,
    opponent,
    posts,
    questions,
    basket
})

export default rootReducer;