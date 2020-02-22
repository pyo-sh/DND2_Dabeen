import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { addHelpPostSuccessAction, addHelpPostFailureAction, updateHelpPostSuccessAction, updateHelpPostFailureAction, removeHelpPostSuccessAction, removeHelpPostFailureAction, loadHelpPostSuccessAction, loadHelpPostFailureAction, LOAD_HELPPOST_REQUEST, LOAD_LIVEPOST_REQUEST, loadLivePostSuccessAction, loadLivePostFailureAction } from '../reducers/posts';
import axios from 'axios';

function addHelpPostAPI() { //게시글 업로드

};

function* addHelpPost(data) {
    try{
        yield call(addPostAPI);
        yield put(addHelpPostSuccessAction(data));
    }
    catch(e) {
        console.log(e);
        yield put(addHelpPostFailureAction(e));
    }
};

function* watchAddHelpPost() {
    yield takeLatest(ADD_HELPPOST_REQUEST, addHelpPost);
};

function updateHelpPostAPI() {

};

function* updateHelpPost() {
    try{
        yield call(updateHelpPostAPI);
        yield put(updateHelpPostSuccessAction());
    } catch(e) {
        console.log(e);
        yield put(updateHelpPostFailureAction(e));
    }
}

function* watchUpdateHelpPost() {
    yield takeLatest(UPDATE_HELPPOST_REQUEST, updateHelpPost);
};

function removeHelpPostAPI() {

};

function* removeHelpPost() {
    try{
        yield call(removeHelpPostAPI);
        yield put(removeHelpPostSuccessAction());
    } catch(e) {
        console.log(e);
        yield put(removeHelpPostFailureAction(e));
    }
};

function* watchRemoveHelpPost() {
    yield takeLatest(REMOVE_HELPPOST_REQUEST, removeHelpPost);
};

function loadHelpPostAPI(helpNum) {
   return axios.post(`/help/${helpNum}`);
};

function* loadHelpPost(action) {
    try{
        const result = yield call(loadHelpPostAPI, action.data);
        yield put(loadHelpPostSuccessAction(result.data.data));
    } catch(e) {
        console.log(e);
        yield put(loadHelpPostFailureAction(e));
    }
};

function* watchLoadHelpPost() {
    yield takeLatest(LOAD_HELPPOST_REQUEST, loadHelpPost);
};

function loadLivePostAPI(data) {
   return axios.get(`/help/${data}/main-page`);
};

function* loadLivePost(action) {
    try{
        const result = yield call(loadLivePostAPI, action.data);
        // console.log(result.data.data);
        yield put(loadLivePostSuccessAction(result.data.data));
    } catch(e) {
        console.log(e);
        yield put(loadLivePostFailureAction(e));
    }
};

function* watchLoadLivePost() {
    yield takeLatest(LOAD_LIVEPOST_REQUEST, loadLivePost);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadHelpPost),
        fork(watchLoadLivePost),
    ]);
};