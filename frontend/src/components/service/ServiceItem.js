import React, { useCallback, useState, memo } from "react";
import {ServiceItemBox} from './ServiceItem.style';

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
        <div className="questionTitle"><div><b>Q.</b>{service.questionTitle}</div><div>{service.questionDate.split('T')[0]}</div></div>
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
        <div className="replyTitle"><div><b>A.</b>{faq.faqContent}</div></div>
      </div>
    )}
  </ServiceItemBox>
    }
    </>
  );
});

export default ServiceItem;
