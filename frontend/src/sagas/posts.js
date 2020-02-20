import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { addHelpPostSuccessAction, addHelpPostFailureAction, updateHelpPostSuccessAction, updateHelpPostFailureAction, removeHelpPostSuccessAction, removeHelpPostFailureAction, loadHelpPostSuccessAction, loadHelpPostFailureAction, LOAD_HELPPOST_REQUEST } from '../reducers/posts';

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

function loadHelpPostAPI() {
   
};

function* loadHelpPost() {
    try{
        yield call(loadHelpPostAPI);
        yield put(loadHelpPostSuccessAction());
    } catch(e) {
        console.log(e);
        yield put(loadHelpPostFailureAction(e));
    }
};

function* watchLoadHelpPost() {
    yield takeLatest(LOAD_HELPPOST_REQUEST, loadHelpPost);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadHelpPost),
    ]);
};