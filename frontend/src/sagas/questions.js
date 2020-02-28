import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_QUESTIONS_REQUEST, loadQuestionsSuccessAction, loadQuestionsFailureAction, ADD_QUESTION_REQUEST, addQuestionSuccessAction, addQuestionFailureAction, DELETE_QUESTION_REQUEST, deleteQuestionSuccessAction, deleteQuestionFailureAction, LOAD_FAQS_REQUEST, loadFaqsSuccessAction, loadFaqsFailureAction } from '../reducers/questions';

function loadQuestionsAPI({userNum, cookie}){
    return axios.get(`/user/${userNum}/quests`,{
        Authorization: `Bearer ${cookie}`
        });
}

function* loadQuestions(action) {
    try {
        const result = yield call(loadQuestionsAPI, action.data);
        yield put(loadQuestionsSuccessAction(result.data.data));
    } catch(e) {
        console.error(e);
        yield put(loadQuestionsFailureAction(e));
    }
};
function* watchLoadQuestions() {
    yield takeLatest(LOAD_QUESTIONS_REQUEST, loadQuestions);
}

// 질문 추가하기
function addQuestionAPI({userNum, question, cookie}){
    const reqData ={
        data : {
            title : question.title,
            content : question.content,
        }
    };
    return axios.post(`/user/${userNum}/main-page`, reqData ,{
        Authorization: `Bearer ${cookie}`
        });
};

function* addQuestion(action) {
    try {
        const result = yield call(addQuestionAPI, action.data);
        yield put(addQuestionSuccessAction(result.data.data));
    } catch(e) {
        console.error(e);
        yield put(addQuestionFailureAction(e));
    }
};
function* watchAddQuestion() {
    yield takeLatest(ADD_QUESTION_REQUEST, addQuestion);
}

// 질문 삭제하기
function deleteQuestiondAPI({userNum, cookie}){
    return axios.delete(`/user/${userNum}/main-page`,{
        Authorization: `Bearer ${cookie}`
        });
};

function* deleteQuestion(action) {
    try {
        const result = yield call(deleteQuestiondAPI, action.data);
        yield put(deleteQuestionSuccessAction(result.data.data));
    } catch(e) {
        console.error(e);
        yield put(deleteQuestionFailureAction(e));
    }
};
function* watchDeleteQuestion() {
    yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestion);
}

function loadFaqsAPI(){
    return axios.get('/fqa');
}

function* loadFaqs() {
    try {
        const result = yield call(loadFaqsAPI);
        yield put(loadFaqsSuccessAction(result.data.data));
    } catch(e) {
        console.error(e);
        yield put(loadFaqsFailureAction(e));
    }
};
function* watchLoadFaqs() {
    yield takeLatest(LOAD_FAQS_REQUEST, loadFaqs);
}
export default function* questionsSaga() {
    yield all([
        fork(watchLoadQuestions),
        fork(watchAddQuestion),
        fork(watchDeleteQuestion),
        fork(watchLoadFaqs),
    ]);
};