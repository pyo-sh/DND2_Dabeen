import React, { useCallback, useState, memo } from "react";
import styled from "styled-components";

const ServiceItem = memo(({ service, faq}) => {
  const [isClick, setIsClick] = useState(false);
  const questionOnClick = useCallback(() => {
    setIsClick(prev => !prev);
  }, []);
  return (
    <>
    {service ? 
      <ServiceItemBox isClick={isClick}>
      <div className="serviceItemQuestion" onClick={questionOnClick}>
        <div className="questionTitle"><div><b>Q.</b>{service.questionTitle}</div><div>{service.questionDate}</div></div>
        {isClick && <div>{service.questionContent}</div>}
      </div>
      {isClick && (
        <div className="serviceItemAnswer">
            {service.replyPost ? <><div className="replyTitle"><div><b>A.</b>{service.replyPost.replyTitle}</div><div>{service.replyPost.replyDate}</div></div>
              <div>{service.replyPost.replyContent}</div>
            </> :"아직 답변이 달리지 않았습니다."}
        </div>
      )}
    </ServiceItemBox> :
    <ServiceItemBox isClick={isClick}>
    <div className="serviceItemQuestion" onClick={questionOnClick}>
      <div className="questionTitle"><div><b>Q.</b>{faq.faqTitle}</div></div>
    </div>
    {isClick && (
      <div className="serviceItemAnswer">
          {faq.faqContent}
      </div>
    )}
  </ServiceItemBox>
    }
    </>
  );
});

const ServiceItemBox = styled.div`
  & .question, .answer {
    border-bottom: 1px solid #bfc7ce;
    width: 100%;
  }
  & .serviceItemQuestion, .serviceItemAnswer{
    width: 100%;
    padding : 10px;
    border-bottom: 1px solid #bfc7ce;
    &:hover {
      color: #FF4300;
    }
  }
  & .serviceItemAnswer{
    color: black;
    background : rgb(240,240,240);
    padding-left : 27.5px;
    display : ${props=> props.isClick ? "block" : "none"}
  }
  & .questionTitle, .replyTitle {
    display : flex;
    width : 100%;
    justify-content : space-between;
  }
  & b {
    margin-right: 10px;
      color: #FF4300;
      font-size: 20px;
    }
`;

export default ServiceItem;
