//도움말
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ServiceItem from "./ServiceItem";
import ServiceQuestion from "./ServiceQuestion";
import Router from 'next/router';
const dummyMyQuestion = [
  {
    quetionNum: 1,
    questionTitle: '질문 제목',
    questionContent: '아무것도 모르겠어요.',
    questionDate: '2020-02-02',
    questionUserNum: 20,
    replyPost: {
      replyNum: 1,
      replyTitle: '질문 제목',
      replyContent: '아무것도 모르겠어요.',
      replyDate: '2020-02-02',
      replyUserNum: 20,
    }
  },
  {
    quetionNum: 1,
    questionTitle: '질문 제목',
    questionContent: '아무것도 모르겠어요.',
    questionDate: '2020-02-02',
    questionUserNum: 20,
    replyPost: {
      replyNum: 1,
      replyTitle: '질문 제목',
      replyContent: '아무것도 모르겠어요.',
      replyDate: '2020-02-02',
      replyUserNum: 20,
    }
  },
  {
    quetionNum: 1,
    questionTitle: '질문 제목',
    questionContent: '아무것도 모르겠어요.',
    questionDate: '2020-02-02',
    questionUserNum: 20,
    replyPost: {
      replyNum: 1,
      replyTitle: '질문 제목',
      replyContent: '아무것도 모르겠어요.',
      replyDate: '2020-02-02',
      replyUserNum: 20,
    }
  },
  {
    quetionNum: 1,
    questionTitle: '질문 제목',
    questionContent: '아무것도 모르겠어요.',
    questionDate: '2020-02-02',
    questionUserNum: 20,
    replyPost: {
      replyNum: 1,
      replyTitle: '질문 제목',
      replyContent: '아무것도 모르겠어요.',
      replyDate: '2020-02-02',
      replyUserNum: 20,
    }
  },
  {
    quetionNum: 1,
    questionTitle: '질문 제목',
    questionContent: '아무것도 모르겠어요.',
    questionDate: '2020-02-02',
    questionUserNum: 20,
    replyPost: {
      replyNum: 1,
      replyTitle: '질문 제목',
      replyContent: '아무것도 모르겠어요.',
      replyDate: '2020-02-02',
      replyUserNum: 20,
    }
  }
];
const dummyFaqs = [
  {
    faqNum: 1,
    faqTitle: "faq 제목",
    faqContent: "faq 내용",
  },
  {
    faqNum: 2,
    faqTitle: "faq 제목",
    faqContent: "faq 내용",
  },
  {
    faqNum: 3,
    faqTitle: "faq 제목",
    faqContent: "faq 내용",
  },
  {
    faqNum: 4,
    faqTitle: "faq 제목",
    faqContent: "faq 내용",
  },
  {
    faqNum: 5,
    faqTitle: "faq 제목",
    faqContent: "faq 내용",
  }
];
const ServiceCenter = ({isMe}) => {
  useEffect(() => {
    if(!isMe){
      alert('자신만 볼 수 있는 페이지입니다.');
      Router.push('/');
    } 
  }, [isMe]);
  const [visible, setVisible] = useState(false);
  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  // 내가 물은 질문 과 자주 묻는 질문 2개 !!
  // const search = async () => {
  //   const result = axios.get('http://localhost:3065/');
  //   //result로 state 갱신해서 보여주게 한다!!
  // };
  // useEffect(() => {
  //   search();

  // }, []);
  return (
    <ServiceWrapper>
      <div className="ServiceTitle">고객센터</div>
      <div className="ServiceContent">
        <div className="ServiceTitleMain">
          내 문의
          <button onClick={showModal}>문의하기</button>
        </div>
        <div className="ServiceQuestion">
          <ul>
            {dummyMyQuestion.map(v => (
              <ServiceItem key={v.questionNum} service={v} />
            ))}
          </ul>
        </div>
        {/* <ServiceQuestion visible={visible} setVisible={setVisible}/> */}
        <ServiceQuestion visible={visible} setVisible={setVisible} />
        <div className="ServiceTitleMain">자주 묻는 질문</div>
        <div className="ServiceQuestion">
          <ul>
            {dummyFaqs.map(v => (
              <ServiceItem key={v.faqNum} faq={v} />
            ))}
          </ul>
        </div>
      </div>
    </ServiceWrapper>
  );
};

const ServiceWrapper = styled.div`
  width: 100%;
  & .ServiceTitle {
    display: flex;
    align-items: flex-end;
    padding-bottom: 25px;
    border-bottom: 1px solid #bfc7ce;
    font-size: 40px;
    font-weight: bold;
  }
  & .ServiceContent {
    padding: 0 20px;
  }
  & .ServiceTitleMain {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 30px 0 15px -10px;
    font-size: 30px;
    font-weight: bold;
    & button {
      width: 70px;
      height: 30px;
      margin-left: auto;
      margin-top: 10px;
      color: white;
      background: #ff4300;
      border: none;
      border-radius: 2px;
      font-size: 14px;
      cursor: pointer;
      & :hover {
        color: #424242;
      }
    }
  }
  & .ServiceQuestion {
    border: 1px solid #bfc7ce;
    border-bottom: none;
    border-radius: 2px;
    & ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  }
  @media screen and (max-width: 768px) {
    /* 768보다 작을 때는 화면 크게 만들거임!!*/
    & .serviceBox {
      width: 100%;
      max-width: 612px;
    }
  }
`;

export default ServiceCenter;
