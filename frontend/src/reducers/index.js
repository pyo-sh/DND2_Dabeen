import { combineReducers } from 'redux';
import user from './user';
import opponent from './opponent';
import posts from './posts'
import questions from './questions';

const rootReducer = combineReducers({
    user,
    opponent,
    posts,
    questions
})

export default rootReducer;