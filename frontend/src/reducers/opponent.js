import produce from 'immer';
import { createAction } from './actionFunction';
// 나 자신이 아닌 다른사람의 정보를 저장하는 State
export const initialState = {
    // 다른사람의 정보
    user: {},
    // UserData를 받았는지
    addedUserData: false,
    isAddingUserData: false,
    addUserDataErrorReason: '',
    // UserData를 업데이트 했는지
    updatedUserData: false,
    isUpdatingUserData: false,
    updateUserDataErrorReason: '',
    // UserData를 삭제
    deletedUserData: false,
    isDeletingUserData: false,
    deleteUserDataErrorReason: '',
};
// UserData에 대한 types
export const ADD_USERDATA_REQUEST = 'ADD_USERDATA_REQUEST';
export const ADD_USERDATA_SUCCESS = 'ADD_USERDATA_SUCCESS';
export const ADD_USERDATA_FAILURE = 'ADD_USERDATA_FAILURE';

export const UPDATE_USERDATA_REQUEST = 'UPDATE_USERDATA_REQUEST';
export const UPDATE_USERDATA_SUCCESS = 'UPDATE_USERDATA_SUCCESS';
export const UPDATE_USERDATA_FAILURE = 'UPDATE_USERDATA_FAILURE';

export const DELETE_USERDATA_REQUEST = 'DELETE_USERDATA_REQUEST';
export const DELETE_USERDATA_SUCCESS = 'DELETE_USERDATA_SUCCESS';
export const DELETE_USERDATA_FAILURE = 'DELETE_USERDATA_FAILURE';

// UserData에 대한 Actions
export const AddUserDataRequest = createAction(ADD_USERDATA_REQUEST);
export const AddUserDataSuccess = createAction(ADD_USERDATA_SUCCESS);
export const AddUserDataFailure = createAction(ADD_USERDATA_FAILURE);

export const UpdateUserDataRequest = createAction(UPDATE_USERDATA_REQUEST);
export const UpdateUserDataSuccess = createAction(UPDATE_USERDATA_SUCCESS);
export const UpdateUserDataFailure = createAction(UPDATE_USERDATA_FAILURE);

export const DeleteUserDataRequest = createAction(DELETE_USERDATA_REQUEST);
export const DeleteUserDataSuccess = createAction(DELETE_USERDATA_SUCCESS);
export const DeleteUserDataFailure = createAction(DELETE_USERDATA_FAILURE);

const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type){
            case ADD_USERDATA_REQUEST: { 
                draft.addedUserData = false;
                draft.isAddingUserData = true;
                break;
            }
            case ADD_USERDATA_SUCCESS: { 
                draft.addedUserData = true;
                draft.isAddingUserData = false;
                break;
            }
            case ADD_USERDATA_FAILURE: {
                draft.isAddingUserData = false;
                draft.addUserDataErrorReason = action.data.error;
                break;
            }
            case UPDATE_USERDATA_REQUEST: {
                draft.updatedUserData = false;
                draft.isUpdatingUserData = true;
                break;
            }
            case UPDATE_USERDATA_SUCCESS: {
                draft.updatedUserData = true;
                draft.isUpdatingUserData = false;
                break;
            }
            case UPDATE_USERDATA_FAILURE: {
                draft.isUpdatingUserData = false;
                draft.updateUserDataErrorReason = action.data.error;
                break;
            }
            case DELETE_USERDATA_REQUEST: {
                draft.deletedUserData = false;
                draft.isDeletingUserData = true;
                break;
            }
            case DELETE_USERDATA_SUCCESS: {
                draft.deletedUserData = false;
                draft.isDeletingUserData = false;
                break;
            }
            case DELETE_USERDATA_FAILURE: {
                draft.isDeletingUserData = false;
                draft.deleteUserDataErrorReason = action.data.error;
                break;
            }
            default: {
                break;
            }
        }
    })
}

export default reducer;