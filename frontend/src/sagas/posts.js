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
    REMOVE_HELPPOST_REQUEST,
    LOAD_APPLYDABEENER_REQUEST,
    loadApplyDabeenerSuccessAction,
    loadApplyDabeenerFailureAction,
    CANCEL_APPLY_REQUEST,
    cancelApplySuccessAction,
    cancelApplyFailureAction,
    addApplySuccessAction,
    addApplyFailureAction,
    ADD_APPLY_REQUEST,
    APPROVE_DABEENER_REQUEST,
    approveDabeenerSuccessAction,
    approveDabeenerFailureAction,
    HELP_CLOSE_REQUEST,
    helpCloseSuccessAction,
    helpCloseFailureAction,
    EVALUATE_DABEENER_REQUEST,
    evaluateDabeenerSuccessAction,
    evaluateDabeenerFailureAction
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
        console.error(e);
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
            cat_num: data.categoryNum,
            title: data.helpTitle,
            exec_loc: data.execLoc,
            price: data.price,
            pref_suppl_num: data.postNum,
            pref_help_exec_dttm: data.helpExecDate,
            help_aply_cls_dttm: data.helpDeadLine,
            cont: data.helpContent,
            help_pics: data.helpPic
        }
    }
    const {cookie} = data;
    return axios.put('/help', reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* updateHelpPost(action) {
    try {
        yield call(updateHelpPostAPI, action.data);
        yield put(updateHelpPostSuccessAction(action.data));
    } catch (e) {
        console.error(e);
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
        console.error(e);
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
        yield put(loadHelpPostSuccessAction(result.data.data));
    } catch (e) {
        console.error(e);
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
        console.error(e);
        yield put(loadLivePostFailureAction(e));
    }
};
function* watchLoadLivePost() {
    yield takeLatest(LOAD_LIVEPOST_REQUEST, loadLivePost);
};

// 신청 다비너 불러오기
function loadApplyDabeenerAPI({helpNum}) {
    return axios.get(`/help-suppl-comp/${helpNum}/supplers`);
};

function* loadApplyDabeener(action) {
    try {
        const result = yield call(loadApplyDabeenerAPI, action.data);
        yield put(loadApplyDabeenerSuccessAction(result.data.data));
    } catch (e) {
        console.error(e);
        yield put(loadApplyDabeenerFailureAction(e));
    }
};
function* watchLoadApplyDabeener() {
    yield takeLatest(LOAD_APPLYDABEENER_REQUEST, loadApplyDabeener);
};


function addApplyAPI({helpNum, userNum, cookie}) {
    const reqData = {
        data : {
            help_num : helpNum,
            suppl_num : userNum,
        }
    }
    return axios.post(`/help-suppl-comp/apply`, reqData ,{headers : {Authorization: `Bearer ${cookie}`}});
};

function* addApply(action) {
    try {
        const result = yield call(addApplyAPI, action.data);
        yield put(addApplySuccessAction(result.data.data));
    } catch (e) {
        console.error(e);
        yield put(addApplyFailureAction(e));
    }
};
function* watchAddApply() {
    yield takeLatest(ADD_APPLY_REQUEST, addApply);
};

function cancelApplyAPI({helpNum, userNum, cookie}) {
    return axios.delete(`/help-suppl-comp/?help_num=${helpNum}&suppl_num=${userNum}`,{headers : {Authorization: `Bearer ${cookie}`}});
};

function* cancelApply(action) {
    try {
        yield call(cancelApplyAPI, action.data);
        yield put(cancelApplySuccessAction(action.data));
    } catch (e) {
        console.error(e);
        yield put(cancelApplyFailureAction(e));
    }
};
function* watchCancelApply() {
    yield takeLatest(CANCEL_APPLY_REQUEST, cancelApply);
};


function approveDabeenerAPI({helpNum, userNum, cookie}) {
    const reqData = {
        data : {
            help_num : helpNum,
            suppl_num : userNum
        }
    }
    return axios.put(`/help-suppl-comp/approved`, reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* approveDabeener(action) {
    try {
        yield call(approveDabeenerAPI, action.data);
        yield put(approveDabeenerSuccessAction(action.data));
    } catch (e) {
        console.error(e);
        yield put(approveDabeenerFailureAction(e));
    }
};
function* watchApproveDabeener() {
    yield takeLatest(APPROVE_DABEENER_REQUEST, approveDabeener);
};

// 이미지 추가
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
        console.error(e);
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
    return null;
};
function* loadActiveUserPost(action) {
    try {
        const result = yield call(loadActiveUserPostAPI, action.data);
        yield put(loadActiveUserPostSuccessAction(result.data.data));
    } catch (e) {
        console.error(e);
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
    return null;
};

function* loadInactiveUserPost(action) {
    try {
        const result = yield call(loadInactiveUserPostAPI, action.data);
        yield put(loadInactiveUserPostSuccessAction(result.data.data));
    } catch (e) {
        console.error(e);
        yield put(loadInactiveUserPostFailureAction(e));
    }
};
function* watchLoadInactiveUserPost() {
    yield takeLatest(LOAD_INACTIVE_USERPOST_REQUEST, loadInactiveUserPost);
};

function helpCloseAPI({helpNum, cookie}) {
    const reqData = {
        data : {
            help_num : helpNum,
        }
    }
    return axios.put(`/help/finish-help`, reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* helpClose(action) {
    try {
        const result = yield call(helpCloseAPI, action.data);
        yield put(helpCloseSuccessAction({result : result.data.data, pathname: action.data.pathname}));
    } catch (e) {
        console.error(e);
        yield put(helpCloseFailureAction(e));
    }
};
function* watchHelpClose() {
    yield takeLatest(HELP_CLOSE_REQUEST, helpClose);
};

// 평가
function evaluateDabeenerAPI({helpNum, userNum, rate, comment, cookie}) {
    const reqData = {
        data : {
            help_num : helpNum,
            suppl_num : userNum,
            rate,
            ast_cont : comment
        }
    }
    return axios.put(`/help-suppl-comp/assessment`, reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* evaluateDabeener(action) {
    try {
        const result = yield call(evaluateDabeenerAPI, action.data);
        yield put(evaluateDabeenerSuccessAction(result.data.data));
    } catch (e) {
        console.error(e);
        yield put(evaluateDabeenerFailureAction(e));
    }
};
function* watchEvaluate() {
    yield takeLatest(EVALUATE_DABEENER_REQUEST, evaluateDabeener);
};

export default function* postsSaga() {
    yield all([
        fork(watchLoadHelpPost),
        fork(watchLoadLivePost),
        fork(watchLoadApplyDabeener),
        fork(watchLoadActiveUserPost),
        fork(watchLoadInactiveUserPost),
        fork(watchAddHelpPost),
        fork(watchUpdateHelpPost),
        fork(watchRemoveHelpPost),
        fork(watchAddApply),
        fork(watchCancelApply),
        fork(watchApproveDabeener),
        fork(watchHelpClose),
        fork(watchEvaluate),
        fork(watchAddImage),
    ]);
};