import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { AddHelpPostSuccessAction, AddHelpPostFailureAction, UpdateHelpPostFailureAction, ADD_HELPPOST_REQUEST, UPDATE_HELPPOST_REQUEST, REMOVE_HELPPOST_REQUEST, RemoveHelpPostSuccessAction, REMOVE_HELPPOST_FAILURE, RemoveHelpPostFailureAction } from '../reducers/posts';

function addHelpPostAPI() { //게시글 업로드

};

function* addHelpPost(data) {
    try{
        yield call(addPostAPI);
        yield put(AddHelpPostSuccessAction(data));
    }
    catch(e) {
        console.log(e);
        yield put(AddHelpPostFailureAction(e));
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
        yield call(UpdateHelpPostSuccessAction());
    } catch(e) {
        console.log(e);
        yield call(UpdateHelpPostFailureAction(e));
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
        yield call(RemoveHelpPostSuccessAction());
    } catch(e) {
        console.log(e);
        yield call(RemoveHelpPostFailureAction(e));
    }
};

function* watchRemoveHelpPost() {
    yield takeLatest(REMOVE_HELPPOST_REQUEST, removeHelpPost);
};

export default function* postsSaga() {
    yield all([
        // fork()
    ]);
};