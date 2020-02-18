//도움말
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ServiceItem from './ServiceItem';
import ServiceQuestion from './ServiceQuestion';
import Charge from "../money/Charge";
import Refund from "../money/Refund";
import Axios from "axios";

const dummyMyQuestion = [
  {
    fqa_num : 1,
    quest_pstn_dttm : "2020-01-01",
    title : "환불 관련 문의",
    rply_const : "ㅋㅋㅋㅋㅋㅋ",
    fqa_rigistrant_num : "1"
  },
  {
    fqa_num : 5,
    quest_pstn_dttm : "2020-01-01",
    title :  "환불을 받으려면 어떻게 해야하나요",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "2"
  },
  {
    fqa_num : 4,
    quest_pstn_dttm : "2020-01-01",
    title :  "사기를 당했습니다.",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "2"
  },
  {
    fqa_num : 3,
    quest_pstn_dttm : "2020-01-01",
    title :   "누군가 나의 이름으로 계정을 사용하고 있어요.",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "3"
  },
  {
    fqa_num : 2,
    quest_pstn_dttm : "2020-01-01",
    title :  "회원탈퇴에 대해 알고 싶어요.",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "2"
  }
]
const dummyQuestion = [
  {
    fqa_num : 1,
    quest_pstn_dttm : "2020-01-01",
    title : "환불 관련 문의",
    rply_const : "ㅋㅋㅋㅋㅋㅋ",
    fqa_rigistrant_num : "1"
  },
  {
    fqa_num : 5,
    quest_pstn_dttm : "2020-01-01",
    title :  "환불을 받으려면 어떻게 해야하나요",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "2"
  },
  {
    fqa_num : 4,
    quest_pstn_dttm : "2020-01-01",
    title :  "사기를 당했습니다.",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "2"
  },
  {
    fqa_num : 3,
    quest_pstn_dttm : "2020-01-01",
    title :   "누군가 나의 이름으로 계정을 사용하고 있어요.",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "3"
  },
  {
    fqa_num : 2,
    quest_pstn_dttm : "2020-01-01",
    title :  "회원탈퇴에 대해 알고 싶어요.",
    rply_const : "이렇게 저렇게 해보세요!",
    fqa_rigistrant_num : "2"
  }
];
const ServiceCenter = () => {
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
        <h2>내 문의</h2>
        <div className="serviceQuestion">
          <ul>
          {dummyMyQuestion.map(v => (
            <ServiceItem key={v.fqa_num} service={v}/>
          ))}
          </ul>
        </div>
        <div className="btnBox">
          <button onClick={showModal}>문의하기</button>
        </div>
        {/* <ServiceQuestion visible={visible} setVisible={setVisible}/> */}
        <Refund visible={visible} setVisible={setVisible} />
        <h2>자주 묻는 질문</h2>
        <div className="frequentQuestion">
          <ul>
            {dummyQuestion.map(v => (
              <ServiceItem key={v.fqa_num} service={v}/>
            ))}
          </ul>
        </div>
    </ServiceWrapper>
  );
};

const ServiceWrapper = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: column;
  justify-content : flex-start;
  align-items: flex-start; */
  & .serviceQuestion {
    & ul {
      margin : 0;
      padding : 0;
      display : flex;
      flex-direction : column;
      & > div:last-child {
        border-bottom : 1px solid black;
      }
    }
  }
  & .btnBox {
    display : flex;
  }
  & div button {
      border: none;
      background: #FF4300;
      color: white;
      margin-left: auto;
      margin-top : 10px;
      width : 70px;
      height: 30px;
      cursor : pointer;
      & :hover {
        color : black;
      }
    }
  & .frequentQuestion {
    & ul {
      margin : 0;
      padding : 0;
      display : flex;
      flex-direction : column;
      & > div:last-child {
        border-bottom : 1px solid black;
      }
    }
    margin-bottom : 10px;
  }
  @media screen and (max-width: 768px) { /* 768보다 작을 때는 화면 크게 만들거임!!*/
    & .serviceBox {
      width : 100%;
      max-width : 612px;
    }
  }
`;

export default ServiceCenter;
