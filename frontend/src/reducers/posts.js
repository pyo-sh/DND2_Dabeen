import produce from "immer";
import { createAction } from "../utils/actionFunction";

export const initialState = {
  livePosts : [],
  helpPosts : [], //  작성한 도움
  helpImages: [], //  도움 사진 첨부
  totalPages: 1,
  helpsPerPage: 0,
  totalHelps: 0,
  // 유저의 도움 중 받을 도움 / 줄 도움
  userActivePosts: [],
  userActivePostsPage: {
    totalDatas: 0,
    totalPages: 0,
    helpsPerPage: 15
  },
  isLoadingActivePost: false,
  activePostLoaded: false,
  loadActivePostErrorReason: '',
  // 유저의 도움 중 받은 도움 줄 도움
  userInactivePosts: [],
  userInactivePostsPage: {
    totalDatas: 0,
    totalPages: 0,
    helpsPerPage: 15
  },
  isLoadingInactivePost: false,
  inactivePostLoaded: false,
  loadInactivePostErrorReason: '',

  isLoadingHelpPost: false,
  loadHelpPostErrorReason: "false",
  helpPostLoaded: false,
  // maxId: 1,
  addHelpPostErrorReason: "", //도움 게시글 업로드 실패 사유
  isAddingHelpPost: false, //도움 게시글 업로드 중
  helpPostAdded: false, //도움 게시글 업로드 성공
  updateHelpPostErrorReason: "", //도움 게시글 수정 실패 사유
  isUpdatingHelpPost: false, //도움 게시글 수정 중
  helpPostUpdated: false, //도움 게시글 수정 성공
  removeHelpPostErrorReason: "", //도움 게시글 삭제 실패 사유
  isRemovingHelpPost: false, //도움 게시글 삭제 중
  helpPostRemoved: false, //도움 게시글 삭제 성공
};
// 실시간 도움 요청
export const LOAD_LIVEPOST_REQUEST = "LOAD_LIVEPOST_REQUEST";
export const LOAD_LIVEPOST_SUCCESS = "LOAD_LIVEPOST_SUCCESS";
export const LOAD_LIVEPOST_FAILURE = "LOAD_LIVEPOST_FAILURE";

export const LOAD_HELPPOST_REQUEST = "LOAD_HELPPOST_REQUEST";
export const LOAD_HELPPOST_SUCCESS = "LOAD_HELPPOST_SUCCESS";
export const LOAD_HELPPOST_FAILURE = "LOAD_HELPPOST_FAILURE";

//도움 게시글 작성
export const ADD_HELPPOST_REQUEST = "ADD_HELPPOST_REQUEST";
export const ADD_HELPPOST_SUCCESS = "ADD_HELPPOST_SUCCESS";
export const ADD_HELPPOST_FAILURE = "ADD_HELPPOST_FAILURE";

//도움 이미지 등록
export const ADD_IMAGE_REQUEST = "ADD_IMAGE_REQUEST";
export const ADD_IMAGE_SUCCESS = "ADD_IMAGE_SUCCESS";
export const ADD_IMAGE_FAILURE = "ADD_IMAGE_FAILURE";

//도움 게시글 수정
export const UPDATE_HELPPOST_REQUEST = "UPDATE_HELPPOST_REQUEST";
export const UPDATE_HELPPOST_SUCCESS = "UPDATE_HELPPOST_SUCCESS";
export const UPDATE_HELPPOST_FAILURE = "UPDATE_HELPPOST_FAILURE";

//도움 게시글 삭제
export const REMOVE_HELPPOST_REQUEST = "REMOVE_HELPPOST_REQUEST";
export const REMOVE_HELPPOST_SUCCESS = "REMOVE_HELPPOST_SUCCESS";
export const REMOVE_HELPPOST_FAILURE = "REMOVE_HELPPOST_FAILURE";

// 받을도움 / 줄도움 을 요청
export const LOAD_ACTIVE_USERPOST_REQUEST = "LOAD_ACTIVE_USERPOST_REQUEST";
export const LOAD_ACTIVE_USERPOST_SUCCESS = "LOAD_ACTIVE_USERPOST_SUCCESS";
export const LOAD_ACTIVE_USERPOST_FAILURE = "LOAD_ACTIVE_USERPOST_FAILURE";
// 받은도움 / 준도움 을 요청
export const LOAD_INACTIVE_USERPOST_REQUEST = "LOAD_INACTIVE_USERPOST_REQUEST";
export const LOAD_INACTIVE_USERPOST_SUCCESS = "LOAD_INACTIVE_USERPOST_SUCCESS";
export const LOAD_INACTIVE_USERPOST_FAILURE = "LOAD_INACTIVE_USERPOST_FAILURE";

// Actions
export const loadLivePostRequestAction = createAction(LOAD_LIVEPOST_REQUEST);
export const loadLivePostSuccessAction = createAction(LOAD_LIVEPOST_SUCCESS);
export const loadLivePostFailureAction = createAction(LOAD_LIVEPOST_FAILURE);

export const loadHelpPostRequestAction = createAction(LOAD_HELPPOST_REQUEST);
export const loadHelpPostSuccessAction = createAction(LOAD_HELPPOST_SUCCESS);
export const loadHelpPostFailureAction = createAction(LOAD_HELPPOST_FAILURE);

export const addHelpPostRequestAction = createAction(ADD_HELPPOST_REQUEST);
export const addHelpPostSuccessAction = createAction(ADD_HELPPOST_SUCCESS);
export const addHelpPostFailureAction = createAction(ADD_HELPPOST_FAILURE);

export const addImageRequestAction = createAction(ADD_IMAGE_REQUEST);
export const addImageSuccessAction = createAction(ADD_IMAGE_SUCCESS);
export const addImageFailureAction = createAction(ADD_IMAGE_FAILURE);

export const updateHelpPostRequestAction = createAction(UPDATE_HELPPOST_REQUEST);
export const updateHelpPostSuccessAction = createAction(UPDATE_HELPPOST_SUCCESS);
export const updateHelpPostFailureAction = createAction(UPDATE_HELPPOST_FAILURE);

export const removeHelpPostRequestAction = createAction(REMOVE_HELPPOST_REQUEST);
export const removeHelpPostSuccessAction = createAction(REMOVE_HELPPOST_SUCCESS);
export const removeHelpPostFailureAction = createAction(REMOVE_HELPPOST_FAILURE);

// 받을도움 / 줄도움 을 요청하는 action
export const loadActiveUserPostRequestAction = createAction(LOAD_ACTIVE_USERPOST_REQUEST);
export const loadActiveUserPostSuccessAction = createAction(LOAD_ACTIVE_USERPOST_SUCCESS);
export const loadActiveUserPostFailureAction = createAction(LOAD_ACTIVE_USERPOST_FAILURE);
// 받은도움 / 준도움 을 요청하는 action
export const loadInactiveUserPostRequestAction = createAction(LOAD_INACTIVE_USERPOST_REQUEST);
export const loadInactiveUserPostSuccessAction = createAction(LOAD_INACTIVE_USERPOST_SUCCESS);
export const loadInactiveUserPostFailureAction = createAction(LOAD_INACTIVE_USERPOST_FAILURE);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_HELPPOST_REQUEST: {
        draft.isLoadingHelpPost = true;
        draft.loadHelpPostErrorReason = "";
        draft.helpPostLoaded = false;
        break;
      }
      case LOAD_HELPPOST_SUCCESS: {
        draft.isLoadingHelpPost = false; // 뭐 여러개의 포스트를 불러와서 넣을거임
        draft.helpPosts = dummyHelpPost2.helpPosts; // 일단 더미를 준다!
        draft.helpPosts = action.data.map(post => ({
          helpNum: post.help_num, // 도움번호
          helpTitle: post.title,  // 도움이름
          helpPostDate: post.help_pstn_dttm, // 도움게시일시
          categoryNum: post.cat_num, // 카테고리번호
          price: post.price, // 금액
          content: post.cont, // 내용
          userNum: post.user_num,// 수요자번호
          userName: post.user_name, // 사용자명
          address: post.address, // 주소
          phoneNumber: post.phone_num, // 휴대폰번호
          userId: post.user_id, // 아이디
          email: post.email, // 이메일
          nickname: post.nickname, // 닉네임
          picPath: post.pic_path, // 사진경로명
          helpDeadLine: post.help_aply_cls_dttm, // 도움신청마감일시
          isHelpApprove: post.help_aprv_whet, // 도움승인여부
          postNum: post.pref_suppl_num, // 선호공급자수
          helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
          location: post.exec_loc, // 이행장소
          helpPicList: '' // 도움사진목록,
        }));
        draft.totalHelps = action.data.total_helps;
        draft.totalPages = action.data.total_pages;
        draft.helpsPerPage = action.data.helps_per_page;
        draft.helpPostLoaded = true; // 추가 다 됨.
        break;
      }
      case LOAD_HELPPOST_FAILURE: {
        draft.isLoadingHelpPost = false;
        draft.loadHelpPostErrorReason = action.data.error;
        break;
      }
      case ADD_HELPPOST_REQUEST: {
        draft.isAddingHelpPost = true;
        draft.addHelpPostErrorReason = "";
        draft.helpPostAdded = false;
        break;
      }
      case ADD_HELPPOST_SUCCESS: {
        draft.isAddingHelpPost = false;
        draft.helpPosts.push({
          helpNum: action.data.help_num, // 도움번호
          helpPostDate: action.data.help_pstn_dttm, // 도움게시일시
          helpTitle: action.data.title,  //도움제목
          helpContent: action.data.cont, // 내용
          categoryNum: action.data.cat_num, // 카테고리번호
          price: action.data.price, // 금액
          helpDeadLine: action.data.help_aply_cls_dttm, // 도움신청마감일시
          isHelpApprove: action.data.help_aprv_whet, // 도움승인여부
          helpEndTime: action.data.help_end_dttm,
          postNum: action.data.pref_suppl_num, // 선호공급자수
          helpExecDate: action.data.pref_help_exec_dttm, // 선호도움이행일시
          location: action.data.exec_loc, // 이행장소
          payment: action.data.pymt_whet
        });
        // draft.maxId += 1;
        draft.helpPostAdded = true;
        break;
      }
      case ADD_HELPPOST_FAILURE: {
        draft.isAddingHelpPost = false;
        draft.addHelpPostErrorReason = action.data.error;
        break;
      }
      case ADD_IMAGE_REQUEST: {
        break;
      }
      case ADD_IMAGE_SUCCESS: {
        action.data.map(p => {
          draft.helpImages.push(p);
        });
        break;
      }
      case ADD_IMAGE_FAILURE: {
        break;
      }
      case UPDATE_HELPPOST_REQUEST: {
        draft.isUpdatingHelpPost = true;
        draft.updateHelpPostErrorReason = "";
        draft.helpPostUpdated = false;
        break;
      }
      case UPDATE_HELPPOST_SUCCESS: {
        draft.isUpdatingHelpPost = false;
        const index = draft.helpPosts.findIndex(v => v.helpNum === action.data.help_num);
        draft.helpPosts[index] = action.data;
        draft.helpPostUpdated = true;
        break;
      }
      case UPDATE_HELPPOST_FAILURE: {
        draft.isUpdatingHelpPost = false;
        draft.updateHelpPostErrorReason = action.data.error;
        break;
      }
      case REMOVE_HELPPOST_REQUEST: {
        draft.isRemovingHelpPost = true;
        draft.removeHelpPostErrorReason = "";
        draft.helpPostRemoved = false;
        break;
      }
      case REMOVE_HELPPOST_SUCCESS: {
        draft.isRemovingHelpPost = false;
        const index = draft.helpPosts.findIndex(v => v.id === action.data);
        draft.helpPosts.splice(index, 1);
        draft.helpPostRemoved = true;
        break;
      }
      case REMOVE_HELPPOST_FAILURE: {
        draft.isRemovingHelpPost = false;
        draft.removeHelpPostErrorReason = action.data.error;
        break;
      }
      case LOAD_LIVEPOST_REQUEST: {
        break;
      }
      case LOAD_LIVEPOST_SUCCESS: {
        draft.livePosts = action.data.map(post => (
          {
            helpNum: post.help_num,
            helpPostDate: post.help_pstn_dttm,
            helpEndTime : post.help_end_dttm,
            helpTitle: post.title,
            helpContent: post.cont,
            price: post.price,
            isHelpApprove: post.help_aprv_whet, // 도움승인여부
            postNum: post.pref_suppl_num, // 선호공급자수
            helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
            helpDeadLine: post.help_aply_cls_dttm, // 도움신청마감일시
            location: post.exec_loc, // 이행장소
            helpPicList: post.help_pics,// 도움사진목록,

            userNum : post.cnsr_user.user_num,
            userId: post.cnsr_user.user_id,
            nickname: post.cnsr_user.nickname,
            userName : post.cnsr_user.user_name,
            userPic : post.cnsr_user.pic_path,
            avgRate : post.cnsr_user.avg_rate,
            userPic: post.cnsr_user.pic,
          }
        ))
        break;
      }
      case LOAD_LIVEPOST_FAILURE: {

        break;
      }      
      // 받을 도움 / 줄 도움 을 요청하는 reducer
      case LOAD_ACTIVE_USERPOST_REQUEST: {
        draft.isLoadingActivePost = true;
        draft.activePostLoaded = false;
        draft.loadActivePostErrorReason = '';
        break;
      }
      case LOAD_ACTIVE_USERPOST_SUCCESS: {
        draft.isLoadingActivePost = false;
        draft.activePostLoaded = true;
          // 데이터 처리
        draft.userActivePostsPage = { // 페이지 정보
          totalDatas: action.data.page.total_datas,
          totalPages: action.data.page.total_pages,
          helpsPerPage: action.data.page.pages_per_datas,
        };
        draft.userActivePosts = action.data.list.map(post => ({ // 도움정보
          helpNum: post.help_num, // 도움번호
          helpPostDate: post.help_pstn_dttm, // 도움게시일시
          helpEndTime: post.help_end_dttm,  // 도움마감일시
          categoryNum: post.cat_num, // 카테고리번호
          userNum: post.cnsr_num, // 수요자번호
          helpTitle: post.title,  // 타이틀
          location: post.exec_loc, // 이행장소
          price: post.price, // 금액
          postNum: post.pref_suppl_num, // 선호공급자수
          helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
          helpDeadLine: post.help_aply_cls_dttm, // 도움신청마감일시
          content: post.cont, // 내용
          isHelpApprove: post.help_aprv_whet, // 도움승인여부
          sggLocation: post.exec_sgg_name, // 이행장소
          isPaymentApprove: post.pymt_whet, // 결제여부
        }));
        break;
      }
      case LOAD_ACTIVE_USERPOST_FAILURE: {
        draft.isLoadingActivePost = false;
        draft.loadActivePostErrorReason = action.data.error;
        draft.userInactivePostsPage = { // 페이지 정보
          totalDatas: 0,
          totalPages: 0,
          helpsPerPage: 15,
        };
        draft.userActivePosts = [];
        break;
      }
      // 받은도움 / 준도움 을 요청하는 reducer
      case LOAD_INACTIVE_USERPOST_REQUEST: {
        draft.isLoadingInactivePost = true;
        draft.inactivePostLoaded = false;
        draft.loadInactivePostErrorReason = '';
        break;
      }
      case LOAD_INACTIVE_USERPOST_SUCCESS: {
        draft.isLoadingInactivePost = false;
        draft.inactivePostLoaded = true;
        // 데이터 처리
        draft.userInactivePostsPage = { // 페이지 정보
          totalDatas: action.data.page.total_datas,
          totalPages: action.data.page.total_pages,
          helpsPerPage: action.data.page.pages_per_datas,
        };
        draft.userInactivePosts = action.data.list.map(post => ({ // 도움정보
          helpNum: post.help_num, // 도움번호
          helpPostDate: post.help_pstn_dttm, // 도움게시일시
          helpEndTime: post.help_end_dttm,  // 도움마감일시
          categoryNum: post.cat_num, // 카테고리번호
          userNum: post.cnsr_num, // 수요자번호
          helpTitle: post.title,  // 타이틀
          location: post.exec_loc, // 이행장소
          price: post.price, // 금액
          postNum: post.pref_suppl_num, // 선호공급자수
          helpExecDate: post.pref_help_exec_dttm, // 선호도움이행일시
          helpDeadLine: post.help_aply_cls_dttm, // 도움신청마감일시
          content: post.cont, // 내용
          isHelpApprove: post.help_aprv_whet, // 도움승인여부
          sggLocation: post.exec_sgg_name, // 이행장소
          isPaymentApprove: post.pymt_whet, // 결제여부
        }));
        break;
      }
      case LOAD_INACTIVE_USERPOST_FAILURE: {
        draft.isLoadingInactivePost = false;
        draft.loadInactivePostErrorReason = action.data.error;
        draft.userInactivePostsPage = { // 페이지 정보
          totalDatas: 0,
          totalPages: 0,
          helpsPerPage: 15,
        };
        draft.userInactivePosts = [];
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
