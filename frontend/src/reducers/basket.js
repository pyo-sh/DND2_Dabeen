import produce from "immer";
import { createAction } from "../utils/actionFunction";

const dummyresult = {
    pymt_num: "2002250020",
    pymt_dttm: "2020-02-25T20:13:10.9273129",
    pymt_mthd_type: "c",
    pymt_price: "40000",
    refd_whet: "n",
    refd_dttm: null,
}

export const initialState = {
    userBasketPosts: [],
    // 장바구니 관련 도움들 불러오기

    isLoadingBasketPost: false,
    basketPostLoaded: false,
    loadBasketPostErrorReason: '',

    payResult: dummyresult,
    isPayingPost: false,
    postPaid: false,
    payPostErrorReason: '', 
}

// 장바구니를 요청
export const LOAD_USERBASKETPOST_REQUEST = "LOAD_USERBASKETPOST_REQUEST";
export const LOAD_USERBASKETPOST_SUCCESS = "LOAD_USERBASKETPOST_SUCCESS";
export const LOAD_USERBASKETPOST_FAILURE = "LOAD_USERBASKETPOST_FAILURE";
// 결제를 요청
export const PAY_POST_REQUEST = "PAY_POST_REQUEST";
export const PAY_POST_SUCCESS = "PAY_POST_SUCCESS";
export const PAY_POST_FAILURE = "PAY_POST_FAILURE";

// actions
// 장바구니 내용을 요청하는 action
export const loadUserBasketPostRequestAction = createAction(LOAD_USERBASKETPOST_REQUEST);
export const loadUserBasketPostSuccessAction = createAction(LOAD_USERBASKETPOST_SUCCESS);
export const loadUserBasketPostFailureAction = createAction(LOAD_USERBASKETPOST_FAILURE);
// 결제를 요청하는 action
export const PayPostRequestAction = createAction(PAY_POST_REQUEST);
export const PayPostSuccessAction = createAction(PAY_POST_SUCCESS);
export const PayPostFailuerAction = createAction(PAY_POST_FAILURE);

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
      switch (action.type) {
        case LOAD_USERBASKETPOST_REQUEST:{
            draft.isLoadingBasketPost= true;
            draft.basketPostLoaded= false;
            draft.loadBasketPostErrorReason= '';
            break;
        }
        case LOAD_USERBASKETPOST_SUCCESS:{
            draft.isLoadingBasketPost= false;
            draft.basketPostLoaded= true;
            draft.userBasketPosts = action.data.map(post => ({ // 도움정보
                applyNum: post.appli_num,
                approveNum: post.aprv_num,
                
                helpNum: post.help.help_num, // 도움번호
                helpPostDate: post.help.help_pstn_dttm, // 도움게시일시
                helpEndTime: post.help.help_end_dttm,  // 도움마감일시
                // categoryNum: post.help.cat_num, // 카테고리번호
                
                userNum : post.help.cnsr_user.user_num,
                userName : post.help.cnsr_user.user_name,
                userBirth: post.help.cnsr_user.birth_date,
                userAddress: post.help.cnsr_user.address,
                userPhone: post.help.cnsr_user.phone_num,
                userId: post.help.cnsr_user.user_id,
                userEmail: post.help.cnsr_user.email,
                nickname: post.help.cnsr_user.nickname,
                userContent: post.help.cnsr_user.itdc_cont,
                userSupply: post.help.cnsr_user.suppl_whet,
                userPic : post.help.cnsr_user.pic_path,
                userRear: post.help.cnsr_user.rrn_rear,
                avgRate : post.help.cnsr_user.avg_rate,
                userMileage: post.help.cnsr_user.own_mileage,
      
                helpTitle: post.help.title,  // 타이틀
                location: post.help.exec_loc, // 이행장소
                price: post.help.price, // 금액
                postNum: post.help.pref_suppl_num, // 선호공급자수
                helpExecDate: post.help.pref_help_exec_dttm, // 선호도움이행일시
                helpDeadLine: post.help.help_aply_cls_dttm, // 도움신청마감일시
                content: post.help.cont, // 내용
                isHelpApprove: post.help.help_aprv_whet, // 도움승인여부
                isPaymentApprove: post.help.pymt_whet, // 결제여부
                helpPic : post.help.help_pics, // 사진
              }));
            break;
        } 
        case LOAD_USERBASKETPOST_FAILURE:{
            draft.isLoadingBasketPost= false;
            draft.loadBasketPostErrorReason= action.data.error;
            break;
        }
        case PAY_POST_REQUEST:{
            draft.isPayingPost = true;
            draft.postPaid = false;
            draft.payPostErrorReason = ''; 
            break;
        }
        case PAY_POST_SUCCESS:{
            draft.isPayingPost = false;
            draft.postPaid = true;
            draft.payResult = action.data;
            break;
        }
        case PAY_POST_FAILURE:{
            draft.isPayingPost = false;
            draft.payPostErrorReason = action.data.error; 
            break;
        }
        default:    break;
        }
    });
};

export default reducer;