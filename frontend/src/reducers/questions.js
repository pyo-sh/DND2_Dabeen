import produce from "immer";
import { createAction } from "./actionFunction";

// 질문들 필요한거 같은 것. 답변이랑 같이 오는지 필요함

export const initialState = {
    myQuestions : [],
    faqs : [],
    
    isLoadingQuestions : false,
    isLoadedQuestions : false,
    loadQuestionError : '',
    
    isAddingQuestion : false,
    isAddedQuestion : false,
    addQuestionError : '',

    isDeletingQuestion : false,
    isDeletedQuestion : false,
    deleteQuestionError : '',

    isLoadingFaqs : false,
    isLoadedFaqs : false,
    loadFaqsError : '',
};

export const LOAD_QUESTIONS_REQUEST = "LOAD_QUESTIONS_REQUEST";
export const LOAD_QUESTIONS_SUCCESS = "LOAD_QUESTIONS_SUCCESS";
export const LOAD_QUESTIONS_FAILURE = "LOAD_QUESTIONS_FAILURE";

export const ADD_QUESTION_REQUEST = "ADD_QUESTION_REQUEST";
export const ADD_QUESTION_SUCCESS = "ADD_QUESTION_SUCCESS";
export const ADD_QUESTION_FAILURE = "ADD_QUESTION_FAILURE";

export const DELETE_QUESTION_REQUEST = "DELETE_QUESTION_REQUEST";
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS";
export const DELETE_QUESTION_FAILURE = "DELETE_QUESTION_FAILURE";

export const LOAD_FAQS_REQUEST = "LOAD_FAQS_REQUEST";
export const LOAD_FAQS_SUCCESS = "LOAD_FAQS_SUCCESS";
export const LOAD_FAQS_FAILURE = "LOAD_FAQS_FAILURE";


export const loadQuestionsRequestAction = createAction(LOAD_QUESTIONS_REQUEST);
export const loadQuestionsSuccessAction = createAction(LOAD_QUESTIONS_SUCCESS);
export const loadQuestionsFailureAction = createAction(LOAD_QUESTIONS_FAILURE);

export const addQuestionRequestAction = createAction(ADD_QUESTION_REQUEST);
export const addQuestionSuccessAction = createAction(ADD_QUESTION_SUCCESS);
export const addQuestionFailureAction = createAction(ADD_QUESTION_FAILURE);

export const deleteQuestionRequestAction = createAction(DELETE_QUESTION_REQUEST);
export const deleteQuestionSuccessAction = createAction(DELETE_QUESTION_SUCCESS);
export const deleteQuestionFailureAction = createAction(DELETE_QUESTION_FAILURE);

export const loadFaqsRequestAction = createAction(LOAD_FAQS_REQUEST);
export const loadFaqsSuccessAction = createAction(LOAD_FAQS_SUCCESS);
export const loadFaqsFailureAction = createAction(LOAD_FAQS_FAILURE);


const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_QUESTIONS_REQUEST: {
        draft.loadQuestionError = '';
        draft.isLoadingQuestions = true;
        draft.isLoadedQuestions = false;
        break;
      }
      case LOAD_QUESTIONS_SUCCESS: {
        draft.isLoadingQuestions = false;
        draft.isLoadedQuestions = true;

        draft.myQuestions = action.data.map(question => (
            {
                questionNum : question.post_num, // 게시글번호
                questionTitle : question.title, // 제목
                questionContent: question.cont,
                questionDate : qusestion.pstn_dttm, // 질문게시일시
                questionUserNum: question.pstner_num, // 질문자번호
                replyPost : question.rply_post ? {
                    replyNum : question.rply_post.post_num,
                    replyTitle : question.rply_post.title,
                    replyContent: question.rply_post.content,
                    replyDate : qusestion.rply_post.pstn_dttm,
                    replyUserNum: question.rply_post.pstner_num,
                } : null,
            }
        ))
        break;
      }
      case LOAD_QUESTIONS_FAILURE: {
        draft.loadQuestionError = action.data;
        draft.isLoadingQuestions = false;
        break;
      }

      case ADD_QUESTION_REQUEST: {
        draft.isAddedQuestion = false;
        draft.isAddingQuestion = true;
        draft.addQuestionError = '';
        break;
      }
      case ADD_QUESTION_SUCCESS: {
        draft.isAddedQuestion = true;
        draft.isAddingQuestion = false;
        break;
      }
      case ADD_QUESTION_FAILURE: {
        draft.isAddingQuestion = false;
        draft.addQuestionError = action.data;
        break;
      }

      case DELETE_QUESTION_REQUEST: {
        draft.isDeletedQuestion = false;
        draft.isDeletingQuestion = true;
        draft.deleteQuestionError = '';
        break;
      }
      case DELETE_QUESTION_SUCCESS: {
        draft.isDeletedQuestion = true;
        draft.isDeletingQuestion = false;
        break;
      }
      case DELETE_QUESTION_FAILURE: {
        draft.isDeletingQuestion = false;
        draft.deleteQuestionError = action.data;
        break;
      }

      case LOAD_FAQS_REQUEST: {
        draft.isLoadingFaqs = true;
        draft.isLoadedFaqs = false;
        draft.loadFaqsError = '';
        break;
      }
      case LOAD_FAQS_SUCCESS: {
        draft.isLoadedFaqs = true;
        draft.isLoadingFaqs = false;

        draft.faqs = action.data.map(faq => (
          {
              fqaNum: faq.fqa_num,
              fqaTitle: faq.title,
              fqaContent: fqa.rply_cont,
          }
      ))
        break;
      }
      case LOAD_FAQS_FAILURE: {
        draft.isLoadingFaqs = false;
        draft.loadFaqsError = action.data;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
