import { all, call } from 'redux-saga/effects';
import user from './user';
import opponent from './opponent';
import posts from './posts';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3065/api";

export default function* rootSaga() {
    yield all([
        call(user),
        call(opponent),
        call(posts)
    ])
}