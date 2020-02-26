import React, { useState, useCallback } from "react";
import PostDetail from '../posts/PostDetail';
import { MyHelpCapsuleUpperDiv } from './MyHelpCapsule.style';

const MyHelpCapsule = ({ helpData }) => {
  const [myHelpVisible, setMyHelpVisible] = useState(false); // 카테고리 클릭에 대한 상세 정보
  // 상세 정보를 보이게하는 Controls
  const setVisible = useCallback(e => {
    setMyHelpVisible(prev => !prev);
  }, []);
  return (
    <>
      <MyHelpCapsuleUpperDiv
        done={helpData.done}
        onClick={setVisible}
        >
        <div className="MyhelpCapsuleTitle">
          <div className="MyhelpCapsuleTitleMain">{helpData.helpTitle}</div>
          <div className="MyhelpCapsuleContent">{helpData.content}</div>
        </div>
        <div className="MyhelpCapsuleInfo">
          <section className="MyhelpCapsuleInfoPrice">
            <div className="MyhelpCapsuleInfoPriceValue">
              {helpData.price}
            </div>
            원
          </section>
          <div>{helpData.help_pstn_dttm}</div>
          <div className={helpData.isHelpApprove ? "done" : "doing"}>
            {helpData.isHelpApprove ? "결제완료" : "결제필요"}
          </div>
        </div>
      </MyHelpCapsuleUpperDiv>
      {myHelpVisible ? (
        <PostDetail setVisible={setVisible} data={helpData} />
      ) : null}
    </>
  );
};

export default MyHelpCapsule;
