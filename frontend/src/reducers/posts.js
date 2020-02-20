import produce from "immer";
import { createAction } from "./actionFunction";

const dummyHelpPost = {
  transactionTime: "", // 통신시간
  resultCode: "", // 응답코드
  description: "", // 비고
  data: [
    {
      help_title: "이런, 튼튼한 오함마",
      help_num: "1", // 도움번호
      help_post_dttm: "", // 도움게시일시
      cat_num: "1", // 카테고리번호
      price: "2000", // 금액
      cont: "오함마 내놔", // 내용
      cnsr_num: "12", // 수요자번호
      user_name: "표석훈", // 사용자명
      address: "", // 주소
      phone_num: "01011010100", // 휴대폰번호
      id: "ironman", // 아이디
      email: "", // 이메일
      nickname: "순살치킨", // 닉네임
      pic_path: "", // 사진경로명
      help_aply_cls_dttm: "2002/02/02", // 도움신청마감일시
      help_aprv_whet: "false", // 도움승인여부
      post_num: "3", // 선호공급자수
      post_type: "", // 선호도움이행일시
      exec_loc: "", // 이행장소
      help_pic_list: "" // 도움사진목록
    }
  ]
};

const dummyHelpPost2 = {
  helpPosts: [
    {
      helpNum: 1, // 도움번호
      helpTitle: "이런, 튼튼한 오함마",
      helpPostDate: "2020-02-02 10:30", // 도움게시일시
      cat_num: 1, // 카테고리번호
      price: 2000, // 금액
      content: "오함마 내놔", // 내용
      userNum: 12, // 수요자번호
      userName: "표석훈", // 사용자명
      address: "부산광역시 대연동", // 주소
      phoneNum: "01011010100", // 휴대폰번호
      id: "ironman", // 아이디
      email: "ans@naver.com", // 이메일
      nickname: "순살치킨", // 닉네임
      picPath: "", // 사진경로명
      helpDeadLine: "2002/02/02", // 도움신청마감일시
      isHelpApprove: false, // 도움승인여부
      postNum: 3, // 선호공급자수
      helpExecDate: "", // 선호도움이행일시
      execLoc: "", // 이행장소
      helpPicList: "" // 도움사진목록,
    },
    {
      helpNum: 2, // 도움번호
      helpTitle: "오바바마마",
      helpPostDate: "2020-02-02 10:30", // 도움게시일시
      cat_num: 2, // 카테고리번호
      price: 2000, // 금액
      content: "ㅇㅅㅇㅅㅇ", // 내용
      userNum: 13, // 수요자번호
      userName: "문건우", // 사용자명
      address: "경남 창원시 도계동", // 주소
      phoneNum: "0101101010", // 휴대폰번호
      id: "superman", // 아이디
      email: "ans123@naver.com", // 이메일
      nickname: "간장치킨", // 닉네임
      picPath: "", // 사진경로명
      helpDeadLine: "2002/02/02", // 도움신청마감일시
      isHelpApprove: false, // 도움승인여부
      postNum: 4, // 선호공급자수
      helpExecDate: "", // 선호도움이행일시
      execLoc: "", // 이행장소
      helpPicList: "" // 도움사진목록,
    },
    {
      helpNum: 3, // 도움번호
      helpTitle: "아ㅏㅏㅏㅏ 귀찮다ㅏㅏㅏㅏ",
      helpPostDate: "2020-02-02 10:30", // 도움게시일시
      cat_num: 3, // 카테고리번호
      price: 3000, // 금액
      content: "자전거 빌려주세요", // 내용
      userNum: 15, // 수요자번호
      userName: "최정은", // 사용자명
      address: "경남 창원시 팔용동", // 주소
      phoneNum: "01011010100", // 휴대폰번호
      id: "black widow", // 아이디
      email: "chi@naver.com", // 이메일
      nickname: "양념치킨", // 닉네임
      picPath: "", // 사진경로명
      helpDeadLine: "2002/02/02", // 도움신청마감일시
      isHelpApprove: false, // 도움승인여부
      postNum: 5, // 선호공급자수
      helpExecDate: "", // 선호도움이행일시
      execLoc: "", // 이행장소
      helpPicList: "" // 도움사진목록,
    }
  ]
};

export const initialState = {
  helpPosts: [
    {
      id: 1,
      postName: "망치 빌려주세요.", //게시글 제목
      category: "심부름", //카테고리
      postDeadline: {
        //신청 마감 일시
        date: "2020-03-07",
        time: "06:19"
      },
      executionDate: {
        //수행 일시
        date: "2020-03-08",
        time: "06:19"
      },
      needPersonnel: 3, //필요 인원
      money: 3000, //금액
      location: "창원시 의창구", //이행 위치
      sigungu: "의창구", //이행 시군구
      requirements: "열정페이로 일하실분 우대합니다!", //요구사항
      imagesPaths: [] //사진 첨부, 여러개 올릴 수 있음
    }
  ],
  isLoadingHelpPost: false,
  loadHelpPostErrorReason: "false",
  helpPostLoaded: false,
  maxId: 1,
  addHelpPostErrorReason: "", //도움 게시글 업로드 실패 사유
  isAddingHelpPost: false, //도움 게시글 업로드 중
  helpPostAdded: false, //도움 게시글 업로드 성공
  updateHelpPostErrorReason: "", //도움 게시글 수정 실패 사유
  isUpdatingHelpPost: false, //도움 게시글 수정 중
  helpPostUpdated: false, //도움 게시글 수정 성공
  removeHelpPostErrorReason: "", //도움 게시글 삭제 실패 사유
  isRemovingHelpPost: false, //도움 게시글 삭제 중
  helpPostRemoved: false //도움 게시글 삭제 성공
};

export const LOAD_HELPPOST_REQUEST = "LOAD_HELPPOST_REQUEST";
export const LOAD_HELPPOST_SUCCESS = "LOAD_HELPPOST_SUCCESS";
export const LOAD_HELPPOST_FAILURE = "LOAD_HELPPOST_FAILURE";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";

export const ADD_HELPPOST_REQUEST = "ADD_HELPPOST_REQUEST";
export const ADD_HELPPOST_SUCCESS = "ADD_HELPPOST_SUCCESS";
export const ADD_HELPPOST_FAILURE = "ADD_HELPPOST_FAILURE";

export const UPDATE_HELPPOST_REQUEST = "UPDATE_HELPPOST_REQUEST";
export const UPDATE_HELPPOST_SUCCESS = "UPDATE_HELPPOST_SUCCESS";
export const UPDATE_HELPPOST_FAILURE = "UPDATE_HELPPOST_FAILURE";

export const REMOVE_HELPPOST_REQUEST = "REMOVE_HELPPOST_REQUEST";
export const REMOVE_HELPPOST_SUCCESS = "REMOVE_HELPPOST_SUCCESS";
export const REMOVE_HELPPOST_FAILURE = "REMOVE_HELPPOST_FAILURE";

export const loadHelpPostRequestAction = createAction(LOAD_HELPPOST_REQUEST);
export const loadHelpPostSuccessAction = createAction(LOAD_HELPPOST_SUCCESS);
export const loadHelpPostFailureAction = createAction(LOAD_HELPPOST_FAILURE);

export const uploadImageRequestAction = createAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccessAction = createAction(UPLOAD_IMAGE_SUCCESS);
export const uploadImageFailureAction = createAction(UPLOAD_IMAGE_FAILURE);

export const addHelpPostRequestAction = createAction(ADD_HELPPOST_REQUEST);
export const addHelpPostSuccessAction = createAction(ADD_HELPPOST_SUCCESS);
export const addHelpPostFailureAction = createAction(ADD_HELPPOST_FAILURE);

export const updateHelpPostRequestAction = createAction(
  UPDATE_HELPPOST_REQUEST
);
export const updateHelpPostSuccessAction = createAction(
  UPDATE_HELPPOST_SUCCESS
);
export const updateHelpPostFailureAction = createAction(
  UPDATE_HELPPOST_FAILURE
);

export const removeHelpPostRequestAction = createAction(
  REMOVE_HELPPOST_REQUEST
);
export const removeHelpPostSuccessAction = createAction(
  REMOVE_HELPPOST_SUCCESS
);
export const removeHelpPostFailureAction = createAction(
  REMOVE_HELPPOST_FAILURE
);

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
        draft.helpPosts[maxId + 1] = { ...action.data, id: maxId + 1 };
        draft.maxId += 1;
        draft.helpPostAdded = true;
        break;
      }
      case ADD_HELPPOST_FAILURE: {
        draft.isAddingHelpPost = false;
        draft.addHelpPostErrorReason = action.data.error;
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
        draft.helpPosts[action.object.id] = action.data.object;
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
      default:
        break;
    }
  });
};

export default reducer;
