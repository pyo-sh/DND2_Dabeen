import produce from 'immer';
import { createAction } from './actionFunction';

const dummyHelpPost = {
    transactionTime: '',                // 통신시간
    resultCode: '',                     // 응답코드
    description: '',                    // 비고
    data: [
        {
            help_title: "이런, 튼튼한 오함마",
            help_num: '1',              // 도움번호
            help_post_dttm: '',         // 도움게시일시
            cat_num: '1',               // 카테고리번호
            price: '2000',              // 금액
            cont: '오함마 내놔',         // 내용
            cnsr_num: '12',               // 수요자번호
            user_name: '표석훈',         // 사용자명
            address: '',                // 주소
            phone_num: '01011010100',              // 휴대폰번호
            id: 'ironman',                     // 아이디
            email: '',                  // 이메일
            nickname: '순살치킨',        // 닉네임
            pic_path: '',               // 사진경로명
            help_aply_cls_dttm: '2002/02/02',     // 도움신청마감일시
            help_aprv_whet: 'false',         // 도움승인여부
            post_num: '3',               // 선호공급자수
            post_type: '',              // 선호도움이행일시
            exec_loc: '',                  // 이행장소
            help_pic_list: '',          // 도움사진목록
        }
    ]
};

export const initialState = {
    helpPosts: [{
        help_num: 1,          
        help_title: '망치 빌려주세요.',   //게시글 제목
        category: '심부름',            //카테고리
        help_aply_cls_dttm: {               //신청 마감 일시
            date: '2020-03-07',
            time: '06:19'
        },
        post_type: {             //수행 일시
            date: '2020-03-08',
            time: '06:19'
        },
        post_num: 3,           //필요 인원
        price: 3000,                //금액
        exec_loc: '부산 남구 용소로 45',  //이행 위치
        sigungu: '의창구',        //이행 시군구
        cont: '열정페이로 일하실분 우대합니다!',    //요구사항
        help_pic_list:[]   //사진 첨부, 여러개 올릴 수 있음
    }],
    maxId: 1,
    addHelpPostErrorReason: '', //도움 게시글 업로드 실패 사유
    isAddingHelpPost: false,    //도움 게시글 업로드 중
    helpPostAdded: false,       //도움 게시글 업로드 성공
    updateHelpPostErrorReason: '',  //도움 게시글 수정 실패 사유
    isUpdatingHelpPost: false,      //도움 게시글 수정 중
    helpPostUpdated: false,         //도움 게시글 수정 성공
    removeHelpPostErrorReason: '',  //도움 게시글 삭제 실패 사유
    isRemovingHelpPost: false,      //도움 게시글 삭제 중
    helpPostRemoved: false          //도움 게시글 삭제 성공
};

export const ADD_HELPPOST_REQUEST = 'ADD_HELPPOST_REQUEST';
export const ADD_HELPPOST_SUCCESS = 'ADD_HELPPOST_SUCCESS';
export const ADD_HELPPOST_FAILURE = 'ADD_HELPPOST_FAILURE';

export const UPDATE_HELPPOST_REQUEST = 'UPDATE_HELPPOST_REQUEST';
export const UPDATE_HELPPOST_SUCCESS = 'UPDATE_HELPPOST_SUCCESS';
export const UPDATE_HELPPOST_FAILURE = 'UPDATE_HELPPOST_FAILURE';

export const REMOVE_HELPPOST_REQUEST = 'REMOVE_HELPPOST_REQUEST';
export const REMOVE_HELPPOST_SUCCESS = 'REMOVE_HELPPOST_SUCCESS';
export const REMOVE_HELPPOST_FAILURE = 'REMOVE_HELPPOST_FAILURE';

export const AddHelpPostRequestAction = createAction(ADD_HELPPOST_REQUEST);
export const AddHelpPostSuccessAction = createAction(ADD_HELPPOST_SUCCESS);
export const AddHelpPostFailureAction = createAction(ADD_HELPPOST_FAILURE);

export const UpdateHelpPostRequestAction = createAction(UPDATE_HELPPOST_REQUEST);
export const UpdateHelpPostSuccessAction = createAction(UPDATE_HELPPOST_SUCCESS);
export const UpdateHelpPostFailureAction = createAction(UPDATE_HELPPOST_FAILURE);

export const RemoveHelpPostRequestAction = createAction(REMOVE_HELPPOST_REQUEST);
export const RemoveHelpPostSuccessAction = createAction(REMOVE_HELPPOST_SUCCESS);
export const RemoveHelpPostFailureAction = createAction(REMOVE_HELPPOST_FAILURE);

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type){
            case ADD_HELPPOST_REQUEST:{
                draft.isAddingHelpPost = true;
                draft.addHelpPostErrorReason = '';
                draft.helpPostAdded = false;
                break;
            }
            case ADD_HELPPOST_SUCCESS:{
                draft.isAddingHelpPost = false;
                draft.helpPosts[maxId+1] = {...action.data, id: maxId+1};
                draft.maxId += 1;
                draft.helpPostAdded = true;
                break;
            }
            case ADD_HELPPOST_FAILURE:{
                draft.isAddingHelpPost = false;
                draft.addHelpPostErrorReason = action.data.error;
                break;
            }
            case UPDATE_HELPPOST_REQUEST:{
                draft.isUpdatingHelpPost = true;
                draft.updateHelpPostErrorReason = '';
                draft.helpPostUpdated = false;
                break;
            }
            case UPDATE_HELPPOST_SUCCESS:{
                draft.isUpdatingHelpPost = false;
                draft.helpPosts[action.object.id] = action.data.object
                draft.helpPostUpdated = true;
                break;
            }
            case UPDATE_HELPPOST_FAILURE:{
                draft.isUpdatingHelpPost = false;
                draft.updateHelpPostErrorReason = action.data.error;
                break;
            }
            case REMOVE_HELPPOST_REQUEST:{
                draft.isRemovingHelpPost = true;
                draft.removeHelpPostErrorReason = '';
                draft.helpPostRemoved = false;
                break;
            }
            case REMOVE_HELPPOST_SUCCESS:{
                draft.isRemovingHelpPost = false;
                const index = draft.helpPosts.findIndex(v=> v.id === action.data);
                draft.helpPosts.splice(index,1);
                draft.helpPostRemoved = true;
                break;
            }
            case REMOVE_HELPPOST_FAILURE:{
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