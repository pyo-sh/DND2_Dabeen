import React, { useCallback, useState, memo } from "react";
import styled from "styled-components";

const ServiceItem = memo(({ service }) => {
  const [isClick, setIsClick] = useState(false);
  const questionOnClick = useCallback(() => {
    setIsClick(prev => !prev);
  }, []);
  return (
    <ServiceItemBox isClick={isClick}>
      <div className="question">
        <a onClick={questionOnClick}>
          <b>Q.</b> {service.title}
        </a>
      </div>
      {isClick && (
        <div className="answer">
          <b>A.</b>  {service.rply_const ? service.rply_const : "아직 답변이 달리지 않았습니다."}
        </div>
      )}
    </ServiceItemBox>
  );
});

const ServiceItemBox = styled.div`
  & .question, .answer {
    border: 1px solid black;
    border-bottom : none;
    width: 100%;
  }
  & .answer {
    display : ${props=> props.isClick ? "block" : "none"}
  }
  & .question {
    padding : 5px;
  }
  & a {
    color: black;
  }
  & b {
      color: #FF4300;
      font-size: 20px;
    }
  & a:hover {
    color: #FF4300;
  }
  & .answer {
    color: black;
    background : rgb(240,240,240);
    padding-left : 20px;
  }
`;

export default ServiceItem;
