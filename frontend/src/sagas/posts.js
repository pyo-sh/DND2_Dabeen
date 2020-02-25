import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { addHelpPostSuccessAction, addHelpPostFailureAction, updateHelpPostSuccessAction, updateHelpPostFailureAction, removeHelpPostSuccessAction, removeHelpPostFailureAction, loadHelpPostSuccessAction, loadHelpPostFailureAction, LOAD_HELPPOST_REQUEST, LOAD_LIVEPOST_REQUEST, loadLivePostSuccessAction, loadLivePostFailureAction, LOAD_USERPOST_REQUEST, loadUserPostSuccessAction, loadUserPostFailureAction, UPLOAD_IMAGE_REQUEST, uploadImageFailureAction } from '../reducers/posts';
import axios from 'axios';

function addHelpPostAPI(data) { //게시글 업로드
    const reqData = {
        data: {
            // help_pstn_dttm
            cat_num: data.category,
            title: data.postName,
            exec_loc: data.location,
            price: data.money,
            pref_suppl_num: data.needPersonnel,
            pref_help_exec_dttm: data.executionDate,
            help_aply_cls_dttm: data.postDeadline,
            cont: data.content,
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
            // help_aprv_whey: data
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
    try{
        const result = yield call(uploadImageAPI, action.data);
        yield put(uploadImageSuccessAction(result.data));
    } catch(e) {
        console.log(e);
        yield put(uploadImageFailureAction(e));
    }
};

function* watchUploadImage() {
    yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
};

function loadUserPostAPI(data) {
    return axios.post(`/user/${data.userNum}/written-helps?page=${data.page}`);
};

function* loadUserPost(action) {
    try {
        const result = yield call(loadUserPostAPI, action.data);
        yield put(loadUserPostSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(loadUserPostFailureAction(e));
    }
};

function* watchLoadUserPost() {
    yield takeLatest(LOAD_USERPOST_REQUEST, loadUserPost);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadHelpPost),
        fork(watchLoadLivePost),
        fork(watchLoadUserPost),
    ]);
};