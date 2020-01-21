// 내 문의
import React from 'react';
import styled from 'styled-components';

const QuestionBox = styled.div`
    width : 80%;
    & .answer {
        border-top : 2px solid black;
    }
    & .answer, & .question {
        width : 100%;
        border-bottom : 2px solid black;
        padding : 15px;

    };
    & .question {
        display : flex;
        flex-direction : column;
    }
    & .question > div {
        display : flex;
        align-items : flex-start;
        margin: 5px 0;
    }
    & .question > div > div {
        width : 10%;
        margin-right : 10px;
    }
    & .question textarea {
        width : 50%;
        height : 20vh;
    }
    & .question > button {
        margin-left: auto;
        background : brown;
        border : 1px solid brown;
        color : white;
        border-radius : 3px;
        box-shadow : 1px 1px black;;
    }
`;
const Question = () => {
    return (
        <QuestionBox>
            <h1>내 문의</h1>
            <div className="answer">
                1. 이 회사 정말 비정상적이네요. ^^<br/>
                 A. 저도 그렇게 생각합니다.
            </div>
            <div className="question">
                <div><div>제목</div> <input></input></div>
                <div><div>문의사항</div> <textarea></textarea></div>
                <button>문의하기</button>
            </div>
        </QuestionBox>
    );
};

export default Question;