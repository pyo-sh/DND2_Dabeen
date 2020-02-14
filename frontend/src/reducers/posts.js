import produce from 'immer';
import { createAction } from './actionFunction';

export const initialState = {
    helpPosts: [{
        id: 1,
        postName: '망치 빌려주세요.',   //게시글 제목
        category: '심부름',            //카테고리
        postDeadline: {               //신청 마감 일시
            date: '2020-03-07',
            time: '06:19'
        },
        executionDate: {             //수행 일시
            date: '2020-03-08',
            time: '06:19'
        },
        needPersonnel: 3,           //필요 인원
        money: 3000,                //금액
        location: '창원시 의창구',  //위치
        requirements: '열정페이로 일하실분 우대합니다!',    //요구사항
        images:[]   //사진 첨부, 여러개 올릴 수 있음
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
export const ADD_HELPPOST_REQUEST = 'ADD_HELPPOST_SUCCESS';
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
        }
    })
}