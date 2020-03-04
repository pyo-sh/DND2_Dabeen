import { all, call } from 'redux-saga/effects';
import user from './user';
import opponent from './opponent';
import posts from './posts';
import questions from './questions';
import basket from './basket';
import axios from 'axios';
import { getCookie } from '../utils/cookieFunction';

// 인증이 필요한 거는 쿠키를 받아서 redux로 넘겨주자! 
// 서버랑 클라이언트에서 실행됐을 때 둘다 가능 그리고 
// Authorization을 추가해주자.
// const isBrowser = typeof window !== "undefined";
// if(isBrowser && document.cookie){
//     axios.defaults.headers.Authorization = `Bearer ${getCookie()}`;
// }
axios.defaults.baseURL = "https://15.164.2.26:3307/api";

export default function* rootSaga() {
    yield all([
        call(user),
        call(opponent),
        call(posts),
        call(questions),
        call(basket),
    ])
}