//도움말
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ServiceItem from './ServiceItem';
import ServiceQuestion from './ServiceQuestion';
import Charge from "../money/Charge";
import Refund from "../money/Refund";

const dummyMyQuestion = [
  {
    Q: "이 회사 정말 비정상적이네요 ^^",
    A: ""
  },
  {
    Q: "결제가 잘 안 되요!!",
    A: "이렇게 저렇게 해보세요!"
  },
  {
    Q: "사기 당한거 보상해주세요!!",
    A: "알겠습니다!"
  },
]
const dummyQuestion = [
  {
    Q: "계정의 비밀번호가 기억나질 않아요",
    A: "이렇게 저렇게 해보세요!"
  },
  {
    Q: "환불을 받으려면 어떻게 해야하나요",
    A: "이렇게 저렇게 해보세요!"
  },
  {
    Q: "사기를 당했습니다.",
    A: "이렇게 저렇게 해보세요!"
  },
  {
    Q: "누군가 나의 이름으로 계정을 사용하고 있어요.",
    A: "이렇게 저렇게 해보세요!"
  },
  {
    Q: "회원탈퇴에 대해 알고 싶어요.",
    A: "이렇게 저렇게 해보세요!"
  }
];
const ServiceCenter = () => {
  const [visible, setVisible] = useState(false);
  const showModal = useCallback(() => {
    setVisible(true);
  }, []);
  return (
    <ServiceWrapper>
      <div className="serviceTitle">
        <h1>고객센터</h1>
      </div>
      <div className="serviceBox">
        <h2>내 문의</h2>
        <div className="serviceQuestion">
          <ul>
          {dummyMyQuestion.map((v,i) => (
            <ServiceItem key={i} service={v}/>
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
            {dummyQuestion.map((v,i) => (
              <ServiceItem key={i} service={v}/>
            ))}
          </ul>
        </div>
      </div>
    </ServiceWrapper>
  );
};

const ServiceWrapper = styled.div`
  width: 100%;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    padding: 10px;
  }
  & .serviceTitle {
    width : 60%;
    display : flex;
    justify-content : flex-start;
    padding-bottom : 0px;
  }
  & .serviceBox {
    border: 1px solid grey;
    width: 60%;
  }
  & .serviceQuestion {
    border: 1px solid grey;
    border-bottom : 0px;
    & ul {
      margin : 0;
      padding : 0;
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
    border: 1px solid grey;
    border-bottom : 0px;
    & ul {
      margin : 0;
      padding : 0;
    }
  }
  @media screen and (max-width: 768px) { /* 768보다 작을 때는 화면 크게 만들거임!!*/
    & .serviceTitle, .serviceBox {
      width : 100%;
      max-width : 612px;
    }
  }
`;

export default ServiceCenter;
