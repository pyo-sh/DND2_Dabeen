import { all, fork, takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccessAction, logoutFailureAction, logoutSuccessAction, LOG_OUT_REQUEST, LOG_IN_REQUEST, loginFailureAction, SIGN_UP_REQUEST, signUpFailureAction, signUpSuccessAction, EDIT_USERINFO_REQUEST, editUserInfoFailureAction, editUserInfoSuccessAction } from '../reducers/user';

function logoutAPI() { // 로그 아웃
    
};

function* logout() {
    try {
        yield call(logoutAPI);
        yield put(logoutSuccessAction());
    }
    catch(e) {
        console.error(e);
        yield put(logoutFailureAction(e));
    }
};

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
};

// 로그인

function loginAPI() { 
    
};

function* login(action) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put(loginSuccessAction(result.data));
    }catch(e){
        console.error(e);
        yield put(loginFailureAction(e));
    }
};

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
};

// 회원가입 
function signUpAPI() {

}

function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
        yield put(signUpSuccessAction());
    }catch(e){
        console.error(e);
        yield put(signUpFailureAction(e));
    }
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// 유저 정보 수정
function editUserInfoAPI(){

}

function* editUserInfo(action) {
    try {
        const result = editUserInfoAPI(action.data);
        yield put(editUserInfoSuccessAction(result.data));
    }catch(e){
        console.error(e);
        yield put(editUserInfoFailureAction(e));
    }
}
function* watchEditUserInfo() {
    yield takeLatest(EDIT_USERINFO_REQUEST, editUserInfo);
}
export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchEditUserInfo),
    ]);
};