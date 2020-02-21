import React, { useCallback, useState, memo } from "react";
import styled from "styled-components";

const ServiceItem = memo(({ service }) => {
  const [isClick, setIsClick] = useState(false);
  const questionOnClick = useCallback(() => {
    setIsClick(prev => !prev);
  }, []);
  return (
    <ServiceItemBox isClick={isClick}>
      <div className="ServiceItemQuestion" onClick={questionOnClick}>
        <b>Q.</b>{service.title}
      </div>
      {isClick && (
        <div className="ServiceItemAnswer">
          <b>A.</b>  {service.rply_const ? service.rply_const : "아직 답변이 달리지 않았습니다."}
        </div>
      )}
    </ServiceItemBox>
  );
});

const ServiceItemBox = styled.div`
  & .question, .answer {
    border-bottom: 1px solid #bfc7ce;
    width: 100%;
  }
  & .ServiceItemQuestion, .ServiceItemAnswer{
    width: 100%;
    padding : 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bfc7ce;
    &:hover {
      color: #FF4300;
    }
  }
  & .ServiceItemAnswer{
    color: black;
    background : rgb(240,240,240);
    padding-left : 27.5px;
    display : ${props=> props.isClick ? "block" : "none"}
  }
  & b {
    margin-right: 10px;
      color: #FF4300;
      font-size: 20px;
    }
`;

export default ServiceItem;
