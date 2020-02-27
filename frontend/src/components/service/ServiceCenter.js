//도움말
import React, { useState, useCallback, useEffect } from "react";
import {ServiceWrapper} from './ServiceCenter.style';
import ServiceItem from "./ServiceItem";
import ServiceQuestion from "./ServiceQuestion";
import Router from 'next/router';
import { useSelector } from 'react-redux';
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
const ServiceCenter = ({isMe}) => {
  useEffect(() => {
    if(!isMe){
      alert('자신만 볼 수 있는 페이지입니다.');
      Router.push('/');
    } 
  }, [isMe]);
  const [visible, setVisible] = useState(false);
  const { faqs } = useSelector(state => state.questions);
  console.log(faqs);
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
            {faqs.map(v => (
              <ServiceItem key={v.faqNum} faq={v} />
            ))}
          </ul>
        </div>
      </div>
    </ServiceWrapper>
  );
};

export default ServiceCenter;
