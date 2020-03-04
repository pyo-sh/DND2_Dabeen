import { all, fork, takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccessAction, loginFailureAction, SIGN_UP_REQUEST, signUpFailureAction, signUpSuccessAction, EDIT_USERINFO_REQUEST, editUserInfoFailureAction, editUserInfoSuccessAction, FIND_ID_REQUEST, findUserIdSuccessAction, findUserIdFailureAction, FIND_PASSWORD_REQUEST, findUserPasswordSuccessAction, findUserPasswordFailureAction, LOAD_USER_REQUEST, loadUserSuccessAction, loadUserFailureAction, LOG_IN_REQUEST, loadUserRequestAction, LOG_IN_SUCCESS, APPLY_DABEENER_REQUEST, applyDabeenerSuccessAction, applyDabeenerFailureAction, REFUND_MILEAGE_REQUEST, refundMileageSuccessAction, refundMileageFailureAction } from '../reducers/user';
import jwt_decode from 'jwt-decode';
import { setCookie } from '../utils/cookieFunction';

function loadUserAPI(userNum) { // 유저 정보를 가져온다!
    return axios.get(`/user/${userNum}`);
};

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data.userNum);
        yield put(loadUserSuccessAction({info : result.data.data, isMe: action.data.isMe}));
    }
    catch(e) {
        console.error(e);
        yield put(loadUserFailureAction(e));
    }
};

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
};

// 로그인

function loginAPI(data) { 
    const reqData = {
        data : {
            // user_id: data.id,
            id: data.id,
            pwd: data.password
        }
    }
    return axios.post('/user/login', reqData);
};

function* login(action) {
    try {
        let result = '';
        let token = null;
        let tokenResult = '';
        if (action.data.cookie) {
            token = action.data.cookie;
        }
        else {
            result = yield call(loginAPI, action.data);
            token = result.data.data.token;
            // document.cookie = `token=${token}`;
            setCookie(token, action.data.loginMaintain);
        }
        tokenResult = jwt_decode(token);
        const userNum = tokenResult.userNum;
        const userId = tokenResult.id;
        const userRole = tokenResult.role;
        const nickname = tokenResult.nickname;
        yield put(loginSuccessAction({userNum, userId, userRole, nickname}));
        yield put(loadUserRequestAction({userNum, isMe: true }));
    }catch(e){
        console.log(e.response);
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
            birth_date : data.birthYear + "-" + data.birthMonth + "-" + data.birthDay,
            address : data.address,
            phone_num : data.telephone,
            itdc_cont : `반갑습니다. ${data.nickname}입니다`,
            suppl_whet : "n"
        }
    }
    return axios.post('/user', reqData);
}
function* signUp(action) {
    try {
        yield call(signUpAPI, action.data);
        yield put(signUpSuccessAction());
    }catch(e){
        console.dir(e);
        yield put(signUpFailureAction(e.response.data.description));
        // 적용 되면 e.response.data.description으로 될듯
    }
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// 유저 정보 수정
function editUserInfoAPI(data){
    const reqData={};
    if(data.password){
        reqData.data = {
            user_num: data.userNum,
            pwd: data.password,
            nickname: data.nickname,
            email: data.email,
            phone_num: data.phoneNum,
            address: data.address,
            pic_path: data.picPath,
            itdc_cont: data.introduce
        }
    } else{
        reqData.data = {
            user_num: data.userNum,
            nickname: data.nickname,
            email: data.email,
            phone_num: data.phoneNum,
            address: data.address,
            pic_path: data.picPath,
            itdc_cont: data.introduce
        }
    }
    
    const {cookie} = data;
    return axios.put('/user', reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* editUserInfo(action) {
    try {
        yield call(editUserInfoAPI, action.data);
        yield put(editUserInfoSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(editUserInfoFailureAction(e));
    }
}
function* watchEditUserInfo() {
    yield takeLatest(EDIT_USERINFO_REQUEST, editUserInfo);
}

function applyDabeenerAPI({userNum, juminImage, profileImage, cookie}){
    const reqData = {
        data : {
            user_num : userNum,
            pic_path : profileImage,
            rrn_path : juminImage
        }
    };
    return axios.post('/user/supplier', reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* applyDabeener(action) {
    try {
        const result = yield call(applyDabeenerAPI, action.data);
        yield put(applyDabeenerSuccessAction(result.data.data));
    }catch(e){
        console.error(e);
        yield put(applyDabeenerFailureAction(e));
    }
}
function* watchApplyDabeener() {
    yield takeLatest(APPLY_DABEENER_REQUEST, applyDabeener);
}

function refundMileageAPI({userNum, refundPrice, selectBank, cookie}){
    const reqData = {
        data : {
            user_num : userNum,
            use_price : refundPrice,
            use_type : 'w',
            wdrl_bank : selectBank
        }
    };
    return axios.post('/mileage-use-hist', reqData, {headers : {Authorization: `Bearer ${cookie}`}});
};

function* refundMileage(action) {
    try {
        yield call(refundMileageAPI, action.data);
        yield put(refundMileageSuccessAction(action.data.refundPrice));
    }catch(e){
        console.error(e);
        yield put(refundMileageFailureAction(e));
    }
}
function* watchRefundMileage() {
    yield takeLatest(REFUND_MILEAGE_REQUEST, refundMileage);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLoadUser),
        fork(watchSignUp),
        fork(watchEditUserInfo),
        fork(watchApplyDabeener),
        fork(watchRefundMileage),
    ]);
};