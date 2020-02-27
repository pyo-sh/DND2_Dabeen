import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {
    addHelpPostSuccessAction,
    addHelpPostFailureAction,
    updateHelpPostSuccessAction,
    updateHelpPostFailureAction,
    removeHelpPostSuccessAction,
    removeHelpPostFailureAction,
    loadHelpPostSuccessAction,
    loadHelpPostFailureAction,
    LOAD_HELPPOST_REQUEST,
    LOAD_LIVEPOST_REQUEST,
    loadLivePostSuccessAction,
    loadLivePostFailureAction,
    LOAD_ACTIVE_USERPOST_REQUEST,
    loadActiveUserPostSuccessAction,
    loadActiveUserPostFailureAction,
    LOAD_INACTIVE_USERPOST_REQUEST,
    loadInactiveUserPostSuccessAction,
    loadInactiveUserPostFailureAction,
    UPLOAD_IMAGE_REQUEST,
    uploadImageFailureAction,
    ADD_HELPPOST_REQUEST
} from '../reducers/posts';
import axios from 'axios';

function addHelpPostAPI(data) { //게시글 업로드
    const reqData = {
        data: {
            help_pstn_dttm: data.todayDate,
            cat_num: data.category,
            cnsr_num: data.userNum,
            title: data.postName,
            exec_loc: data.execLoc,
            price: data.price,
            pref_suppl_num: data.postNum,
            pref_help_exec_dttm: data.helpExec,
            help_aply_cls_dttm: data.helpDeadline,
            cont: data.content,
            exec_sgg_name: data.sigungu,
            help_aprv_whet: 'n'
        }
    }
    return axios.post('/help', reqData)
};

function* addHelpPost(action) {
    try {
        const result = yield call(addHelpPostAPI, action.data);
        yield put(addHelpPostSuccessAction(result.data.data));
    }
    catch (e) {
        console.log(e);
        yield put(addHelpPostFailureAction(e));
    }
};

function* watchAddHelpPost() {
    yield takeLatest(ADD_HELPPOST_REQUEST, addHelpPost);
};

function updateHelpPostAPI(data) {
    const reqData = {
        data: {
            // help_num
            // help_pstn_dttm
            cat_num: data.category,
            title: data.postName,
            exec_loc: data.location,
            price: data.money,
            pref_suppl_num: data.needPersonnel,
            pref_help_exec_dttm: data.executionDate,
            help_aply_cls_dttm: data.postDeadline,
            cont: data.content,
            // help_aprv_whet: data.,
            //exec_sgg_name: data.sigungu,
        }
    }
    return axios.put('/help', reqData)
};

function* updateHelpPost(action) {
    try {
        const result = yield call(updateHelpPostAPI, action.data);
        yield put(updateHelpPostSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(updateHelpPostFailureAction(e));
    }
}

function* watchUpdateHelpPost() {
    yield takeLatest(UPDATE_HELPPOST_REQUEST, updateHelpPost);
};

function removeHelpPostAPI(helpNum) {
    return axios.delete(`/help/${helpNum}`)
};

function* removeHelpPost(action) {
    try {
        const result = yield call(removeHelpPostAPI, action.data);
        yield put(removeHelpPostSuccessAction(result.data));
    } catch (e) {
        console.log(e);
        yield put(removeHelpPostFailureAction(e));
    }
};

function* watchRemoveHelpPost() {
    yield takeLatest(REMOVE_HELPPOST_REQUEST, removeHelpPost);
};

function loadHelpPostAPI(data) {
    return axios.post(`/help/${data.categoryNum}?page=${data.page}&search=${data.search}`);
};

function* loadHelpPost(action) {
    try {
        const result = yield call(loadHelpPostAPI, action.data);
        yield put(loadHelpPostSuccessAction(result.data.data));
    } catch (e) {
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
    try {
        const result = yield call(loadLivePostAPI, action.data);
        // console.log(result.data.data);
        yield put(loadLivePostSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(loadLivePostFailureAction(e));
    }
};
function* watchLoadLivePost() {
    yield takeLatest(LOAD_LIVEPOST_REQUEST, loadLivePost);
};

function uploadImageAPI(images) {
    return axios.post('/help_pic', images);
};

function* uploadImage(action) {
    try {
        const result = yield call(uploadImageAPI, action.data);
        yield put(uploadImageSuccessAction(result.data));
    } catch (e) {
        console.log(e);
        yield put(uploadImageFailureAction(e));
    }
};

function* watchUploadImage() {
    yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
};

// 받을도움 / 줄도움
function loadActiveUserPostAPI(data) {
    if(data.helpType === "take"){
        return axios.get(`/help/${data.userNum}/to-receive-helps?page=${data.page}`);
    }
    else if(data.helpType === "give"){
        return axios.get(`/help-suppl-comp/${data.userNum}/applied-helps?page=${data.page}`);
    }
    else    return null;
};
function* loadActiveUserPost(action) {
    try {
        const result = yield call(loadActiveUserPostAPI, action.data);
        yield put(loadActiveUserPostSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(loadActiveUserPostFailureAction(e));
    }
};
function* watchLoadActiveUserPost() {
    yield takeLatest(LOAD_ACTIVE_USERPOST_REQUEST, loadActiveUserPost);
};
// 받은도움 / 준도움
function loadInactiveUserPostAPI(data) {
    if(data.helpType === "take"){
        return axios.get(`/help/${data.userNum}/received-helps?page=${data.page}`);
    }
    else if(data.helpType === "give"){
        return axios.get(`/help-suppl-comp/${data.userNum}/supplied-helps?page=${data.page}`);
    }
    else    return null;
};
function* loadInactiveUserPost(action) {
    try {
        const result = yield call(loadInactiveUserPostAPI, action.data);
        yield put(loadInactiveUserPostSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(loadInactiveUserPostFailureAction(e));
    }
};
function* watchLoadInactiveUserPost() {
    yield takeLatest(LOAD_INACTIVE_USERPOST_REQUEST, loadInactiveUserPost);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadHelpPost),
        fork(watchLoadLivePost),
        fork(watchLoadActiveUserPost),
        fork(watchLoadInactiveUserPost),
        fork(watchAddHelpPost),
    ]);
};