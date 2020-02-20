import { all, fork, takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccessAction, logoutFailureAction, logoutSuccessAction, LOG_OUT_REQUEST, LOG_IN_REQUEST, loginFailureAction, SIGN_UP_REQUEST, signUpFailureAction, signUpSuccessAction, EDIT_USERINFO_REQUEST, editUserInfoFailureAction, editUserInfoSuccessAction, FIND_ID_REQUEST, findUserIdSuccessAction, findUserIdFailureAction, FIND_PASSWORD_REQUEST, findUserPasswordSuccessAction, findUserPasswordFailureAction } from '../reducers/user';

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

function loginAPI(data) { 
    // return axios.post('/api/user/login', {id: data.id, pwd: data.password});
};

function* login(action) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put(loginSuccessAction({token : result.data.token, loginMaintain : action.data.loginMaintain}));
    }catch(e){
        console.error(e);
        yield put(loginFailureAction(e));
    }
};

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
};

// 회원가입 
// id,
// password,
// nickname,
// name,
// birthYear,
// birthMonth,
// birthDay,
// email,
// telephone,
// mainAddress,
// subAddress,
function signUpAPI(data) {
    const reqData = {
        data : {
            user_id : data.id,
            pwd : data.password,
            user_name : data.name,
            nickname : data.nickname,
            email : data.email,
            birth_date : data.birthYear + data.birthMonth + data.birthDay,
            address : data.mainAddress,
            blon_sgg_name : data.subAddress,
            phone_num : data.telephone,
            itdc_cont : `반갑습니다. ${data.nickname}입니다`,
            suppl_whet : "n"
        }
    }
    console.log(reqData);
    return axios.post('/user', reqData);
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

// // 아이디 찾기
// function findUserIdAPI(data){
//     return axios.post('/api/user/findid', {name: data.name, email : data.emil})
// }

// function* findUserId(action) {
//     try {
//         const result = findUserIdAPI(action.data);
//         yield put(findUserIdSuccessAction(result.data)); // 메일 날아가는건가?
//     }catch(e){
//         console.error(e);
//         yield put(findUserIdFailureAction(e));
//     }
// }
// function* watchFindId() {
//     yield takeLatest(FIND_ID_REQUEST, findUserId);
// }

// // 비밀번호 찾기

// function findUserPasswordAPI(data){
//     return axios.post('/api/user/findPwd', {id: data.id, email : data.email})
// }

// function* findUserPassword(action) {
//     try {
//         const result = findUserPasswordAPI(action.data);
//         yield put(findUserPasswordSuccessAction(result.data)); // 이메일이 날아가는거일듯
//     }catch(e){
//         console.error(e);
//         yield put(findUserPasswordFailureAction(e));
//     }
// }
// function* watchFindPassword() {
//     yield takeLatest(FIND_PASSWORD_REQUEST, findUserPassword);
// }
export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchEditUserInfo),
        // fork(watchFindId),
        // fork(watchFindPassword)
    ]);
};