import React, { useCallback, useState } from "react";
import styled from "styled-components";

const ServiceItemBox = styled.div`
  & .question, .answer {
    border-bottom: 1px solid black;
    width: 100%;
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

const ServiceItem = ({ service }) => {
  const [isClick, setIsClick] = useState(false);
  const questionOnClick = useCallback(() => {
    setIsClick(prev => !prev);
  }, []);
  return (
    <ServiceItemBox>
      <div className="question">
        <a onClick={questionOnClick}>
          <b>Q.</b> {service.Q}
        </a>
      </div>
      {isClick && (
        <div className="answer">
          <b>A.</b>  {service.A ? service.A : "아직 답변이 달리지 않았습니다."}
        </div>
      )}
    </ServiceItemBox>
  );
};

export default ServiceItem;
