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
    ADD_IMAGE_REQUEST,
    ADD_HELPPOST_REQUEST,
    addImageSuccessAction,
    addImageFailureAction,
    UPDATE_HELPPOST_REQUEST,
    REMOVE_HELPPOST_REQUEST
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
            help_pics: data.helpPics,
            help_aprv_whet: 'n',
        }
    }
    const {cookie} = data;
    return axios.post('/help', reqData, {headers : {Authorization: `Bearer ${cookie}`}});
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
            help_num: data.helpNum,
            cnsr_num: data.userNum,
            // help_pstn_dttm: data.helpPostDate,
            cat_num: data.categoryNum,
            title: data.helpTitle,
            exec_loc: data.execLoc,
            price: data.price,
            pref_suppl_num: data.postNum,
            pref_help_exec_dttm: data.helpExecDate,
            help_aply_cls_dttm: data.helpDeadLine,
            cont: data.helpContent,
            // help_aprv_whet: data.isHelpApprove,
            // pymt_whet: data.isPaymentApprove,
            help_pics: data.helpPic
        }
    }
    const {cookie} = data;
    return axios.put('/help', reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* updateHelpPost(action) {
    console.log(action.data)
    try {
        yield call(updateHelpPostAPI, action.data);
        yield put(updateHelpPostSuccessAction(action.data));
    } catch (e) {
        console.log(e);
        yield put(updateHelpPostFailureAction(e));
    }
}

function* watchUpdateHelpPost() {
    yield takeLatest(UPDATE_HELPPOST_REQUEST, updateHelpPost);
};

function removeHelpPostAPI({help_num, cookie}) {
    return axios.delete(`/help/${help_num}`, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* removeHelpPost(action) {
    try {
        yield call(removeHelpPostAPI, action.data);
        yield put(removeHelpPostSuccessAction(action.data));
    } catch (e) {
        console.log(e);
        yield put(removeHelpPostFailureAction(e));
    }
};

function* watchRemoveHelpPost() {
    yield takeLatest(REMOVE_HELPPOST_REQUEST, removeHelpPost);
};

function loadHelpPostAPI(data) {
    const title = data.helpKeyword ? data.helpKeyword : data.search ? data.search : "";
    return axios.get(`/help/search-helps/${data.categoryNum}?page=${data.page-1}${data.helpExecDate ? `&pref_help_exec_dttm=${data.helpExecDate}` : ""}${data.helpApplyDate ? `&help_aply_cls_dttm=${data.helpApplyDate}` : ""}
    ${data.minPrice ? `&price_begin=${data.minPrice}` : ""}${data.maxPrice ? `&price_end=${data.maxPrice}` : ""}${title ? `&title=${encodeURIComponent(title)}` : ""}${data.helpLocation ? `&exec_loc=${encodeURIComponent(data.helpLocation)}` : ""}`);
};

function* loadHelpPost(action) {
    try {
        const result = yield call(loadHelpPostAPI, action.data);
        console.log(result.data);
        yield put(loadHelpPostSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(loadHelpPostFailureAction(e));
    }
};

function* watchLoadHelpPost() {
    yield takeLatest(LOAD_HELPPOST_REQUEST, loadHelpPost);
};

function loadLivePostAPI({location, categoryNum}) {
    return location ?  axios.get(`/help/search-main-exec-loc-helps?cat_num=${categoryNum}&exec_loc=${encodeURIComponent(location)}`)
    : axios.get(`/help/search-main-helps?cat_num=${categoryNum}`);
};

function* loadLivePost(action) {
    try {
        const result = yield call(loadLivePostAPI, action.data);
        yield put(loadLivePostSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(loadLivePostFailureAction(e));
    }
};
function* watchLoadLivePost() {
    yield takeLatest(LOAD_LIVEPOST_REQUEST, loadLivePost);
};

function addImageAPI({path, cookie}) {
    const reqData = {
        data:{
            path
        }
    };
    return axios.post('/help-pic', reqData,{headers : {Authorization: `Bearer ${cookie}`}});
};

function* addImage(action) {
    try {
        const result = yield call(addImageAPI, action.data);
        yield put(addImageSuccessAction(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(addImageFailureAction(e));
    }
};

function* watchAddImage() {
    yield takeLatest(ADD_IMAGE_REQUEST, addImage);
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
        console.dir(result)
        yield put(loadInactiveUserPostSuccessAction(result.data.data));
    } catch (e) {
        console.dir(e);
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
        fork(watchRemoveHelpPost),
        fork(watchLoadInactiveUserPost),
        fork(watchAddHelpPost),
        fork(watchAddImage),
        fork(watchUpdateHelpPost),
        fork(watchRemoveHelpPost),
    ]);
};