import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { LOAD_RECOMMEND_REQUEST, loadRecommendFailure, loadRecommendSuccess } from '../reducers/opponent';
import axios from 'axios';

function loadRecommendAPI({address, userNum}){
    return  (address || userNum) ? axios.get(`/user/main-page/?${userNum ? `user_num=${userNum}` : "" }${address ? `&sgg_name=${address}` : ""}`) : axios.get('/user/main-page');
}

function* loadRecommend(action) {
    try {
        const result = yield call(loadRecommendAPI, action.data);
        yield put(loadRecommendSuccess(result.data.data));
    } catch(e) {
        console.error(e);
        yield put(loadRecommendFailure(e));
    }
};
function* watchLoadRecommend() {
    yield takeLatest(LOAD_RECOMMEND_REQUEST, loadRecommend);
}
export default function* opponentSaga() {
    yield all([
        fork(watchLoadRecommend),
    ]);
};