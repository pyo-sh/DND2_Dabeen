import produce from "immer";
import jwt_decode from 'jwt-decode';
import { createAction } from './actionFunction';
const dummyState = {
  userInfo: {
    userNum: 123, // 유저번호
    userId: "ansrjsdn", 
    userName: "문건우",
    email: "ansejrrhkd@naver.com",
    birthDate: "1995-06-01",
    nickName: "moon",
    address: "부산광역시 남구",
    phoneNumber: "010xxxxxxxx",
    blonSggName : "부산광역시 남구", // 소속시군구명
    isDabeener: false, // 다비너 여부

    // 공급자일 경우 필수
    picPath: null, // 프로필사진 주소
    rrnRear: null, // 주민 번호 뒷자리
    avgRate: null, // 평점 평균
    ownMilege: null // 소유 마일리지

  },// 유저정보를 저장해야함.
  isLoggingOut: false, // 로그아웃 시도중
  logoutError: "", // 로그아웃 실패 사유
  isLoggingIn: false, // 로그인 시도중
  isLoginSuccess: false, // 로그인 성공 여부
  loginError: "", // 로그인 실패 사유
  isSigningup: false, //회원가입 시도중
  signUpSuccess : false, // 회원가입 성공 여부
  signUpError: "", // 회원 가입 실패
  isUpdatingInfo: false, // 정보 업데이트중
  updateError: "",
}
export const initialState = {
  userInfo: {
    userNum: null, // 유저번호
    userId: null, 
    userName: null,
    email: null,
    introduce : "",
    birthDate: null,
    nickName: null,
    address: null,
    phoneNumber: null,
    blonSggName : null, // 소속시군구명
    userRole: "", // 다비너 여부

    // 공급자일 경우 필수
    picPath: null, // 프로필사진 주소
    rrnRear: null, // 주민 번호 뒷자리
    avgRate: null, // 평점 평균
    ownMilege: null // 소유 마일리지

  },// 유저정보를 저장해야함.
  isLoggingOut: false, // 로그아웃 시도중
  logoutError: "", // 로그아웃 실패 사유
  isLoggingIn: false, // 로그인 시도중
  isLoginSuccess: false, // 로그인 성공 여부
  loginError: "", // 로그인 실패 사유
  isSigningup: false, //회원가입 시도중
  signUpSuccess : false, // 회원가입 성공 여부
  signUpError: "", // 회원 가입 실패
  isUpdatingInfo: false, // 정보 업데이트중
  updateError: "",
  loadUserError : ""
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; // 액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"; // 서버쪽에 갔다 와야 하는 비동기 액션
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

// export const FIND_ID_REQUEST = "FIND_ID_REQUEST";
// export const FIND_ID_SUCCESS = "FIND_ID_SUCCESS";
// export const FIND_ID_FAILURE = "FIND_ID_FAILURE";

// export const FIND_PASSWORD_REQUEST = "FIND_PASSWORD_REQUEST";
// export const FIND_PASSWORD_SUCCESS = "FIND_PASSWORD_SUCCESS";
// export const FIND_PASSWORD_FAILURE = "FIND_PASSWORD_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const EDIT_USERINFO_REQUEST = "EDIT_USERINFO_REQUEST";
export const EDIT_USERINFO_SUCCESS = "EDIT_USERINFO_SUCCESS";
export const EDIT_USERINFO_FAILURE = "EDIT_USERINFO_FAILURE";

// 회원가입 : data를 가지고 서버에 회원가입 요청을 날린다 -> 성공한다 : 회원가입 끝 OR 실패한다 : 에러 이유
export const signUpRequestAction = createAction(SIGN_UP_REQUEST);
export const signUpSuccessAction = createAction(SIGN_UP_SUCCESS);
export const signUpFailureAction = createAction(SIGN_UP_FAILURE);

// id, password를 가지고 로그인 요청을 서버로 보낸다. -> 성공한다 : 유저 정보 저장  or 실패한다 : 에러 이유
export const loginRequestAction = createAction(LOG_IN_REQUEST);
export const loginSuccessAction = createAction(LOG_IN_SUCCESS);
export const loginFailureAction = createAction(LOG_IN_FAILURE);

// 회원 정보를 바탕으로 서버에 로그아웃 요청을 보낸다 -> 성공한다 : 유저 정보 null로 or 실패한다 : 에러 이유
export const logoutRequestAction = createAction(LOG_OUT_REQUEST);
// export const logoutSuccessAction = createAction(LOG_OUT_SUCCESS);
// export const logoutFailureAction = createAction(LOG_OUT_FAILURE);

export const loadUserRequestAction = createAction(LOAD_USER_REQUEST);
export const loadUserSuccessAction = createAction(LOAD_USER_SUCCESS);
export const loadUserFailureAction = createAction(LOAD_USER_FAILURE);

// export const findUserIdRequestAction = createAction(FIND_ID_REQUEST);
// export const findUserIdSuccessAction = createAction(FIND_ID_SUCCESS);
// export const findUserIdFailureAction = createAction(FIND_ID_FAILURE);

// export const findUserPasswordRequestAction = createAction(FIND_PASSWORD_REQUEST);
// export const findUserPasswordSuccessAction = createAction(FIND_PASSWORD_SUCCESS);
// export const findUserPasswordFailureAction = createAction(FIND_PASSWORD_FAILURE);
// 자신 정보 수정을 보낸다 -> 성공한다 : 유저정보 불러와서 다시 저장 or 실패한다 : 에러
export const editUserInfoRequestAction = ({
  profile,
  nickname,
  introduce,
  password,
  email,
  phoneNumber,
  address
}) => ({
  type: EDIT_USERINFO_REQUEST,
  data: {
    profile,
    nickname,
    introduce,
    password,
    email,
    phoneNumber,
    address
  }
});

export const editUserInfoSuccessAction = data => ({
  type: EDIT_USERINFO_SUCCESS,
  data
});

export const editUserInfoFailureAction = () => ({
  type: EDIT_USERINFO_FAILURE
});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        break;
      }
      case LOG_IN_SUCCESS: { // 로그인 토큰이 내려온다 -> 토큰 local 또는 session에 저장하고 토큰 해석해서 id 저장.
        draft.isLoggingIn = false;   
        // action.data.loginMaintain ? localStorage.setItem("token", action.data.token) : sessionStorage.setItem("token", action.data.token)
        // const tokenResult = jwt_decode(action.data.token);
        draft.userInfo.userNum = action.data.userNum;
        draft.userInfo.userId = action.data.userId;
        draft.userInfo.userRole = action.data.userRole;
        // 토큰 해석해서 userId, userNum 저장하는 방식!!
        // 토큰에 여러개 정보 다 들어 있을지 아니면 한번더 불러야 하는지
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.isLoginSuccess = false;
        draft.loginError = action.data;
        break;
      }
      case LOG_OUT_REQUEST: {
         // draft.userInfo = null;
        // 로그아웃 성공 했을 때 토큰 삭제
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        draft.userInfo = {};
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSigningup = true;
        draft.signUpError = "";
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningup = false;
        draft.signUpSuccess = true;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningup = false;
        draft.signUpError = action.data;
        break;
      }
      case EDIT_USERINFO_REQUEST: {
        draft.isUpdatingInfo = true;
        break;
      }
      case EDIT_USERINFO_SUCCESS: {
        draft.isUpdatingInfo = false;
        draft.userInfo = action.data;
        break;
      }
      case EDIT_USERINFO_FAILURE: {
        draft.isUpdatingInfo = false;
        draft.updateError = action.data.error;
        break;
      }
      case LOAD_USER_REQUEST : {
        break;
      }
      case LOAD_USER_SUCCESS : {
        draft.userInfo.userNum = action.data.user_num;
        draft.userInfo.userName = action.data.user_name;
        draft.userInfo.userId = action.data.user_id;
        draft.userInfo.nickName = action.data.nickname;
        draft.userInfo.email = action.data.email;
        draft.userInfo.birthDate = action.data.birth_date;
        draft.userInfo.introduce = action.data.itdc_cont;
        draft.userInfo.address = action.data.address;
        draft.userInfo.phoneNumber = action.data.phone_num;

        draft.userInfo.blonSggName = action.data.blon_sgg_name;
        draft.userInfo.userRole = action.data.suppl_whet;
        draft.userInfo.picPath = action.data.pic_path;
        draft.userInfo.avgRate = action.data.avg_rate;
        draft.userInfo.rrnRear = action.data.rrn_rear;
        draft.userInfo.ownMilege = action.data.own_mileage;
        break;
      }
      case LOAD_USER_FAILURE : {
        draft.loadUserError = action.data;
        break;
      }
  //     case FIND_ID_REQUEST : {
  //       break;        
  //     }
  //     case FIND_ID_SUCCESS: {
  //       break;
  //     }
  //     case FIND_ID_FAILURE : {
  //       break;
  //     }
  //     case FIND_PASSWORD_REQUEST : {
  //       break;
  //     }
  //     case FIND_PASSWORD_SUCCESS: {
  //       break;
  //     }
  //     case FIND_PASSWORD_FAILURE : {
  // break;        
  //     }
      default:
        break;
    }
  });
};

export default reducer;
