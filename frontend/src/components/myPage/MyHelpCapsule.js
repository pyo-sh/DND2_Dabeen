import React, { useState, useCallback } from "react";
import PostDetail from '../posts/PostDetail';
import { MyHelpCapsuleUpperDiv, MyHelpCapsuleTitle, MyHelpCapsuleInfo } from './MyHelpCapsule.style';

const MyHelpCapsule = ({ helpType, helpData, isMe }) => {
  const [myHelpVisible, setMyHelpVisible] = useState(false); // 카테고리 클릭에 대한 상세 정보
  const imagesURL = helpData.helpPic.map(pic => pic.path);
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
        <div className="DoWrapper">
          <div className={helpData.isHelpApprove === "y" ? "done" : "doing"}>
            {helpType === "take" && isMe
            ? helpData.isPaymentApprove === "y" ? "결제완료" : "결제필요"
            : helpData.isHelpApprove === "y" ? "도움완료" : "진행 중"
            }
          </div>
        </div>
        <img className="MyhelpCapsuleImage" src={imagesURL.length === 1 ? imagesURL[0] : '/images/main2.jpg'}/>
        <MyHelpCapsuleTitle>
          <div className="MyhelpCapsuleTitleMain">{helpData.helpTitle}</div>
          <div className="MyhelpCapsuleTitleSub">
            <div className="MyhelpCapsuleTitlePeople">신청인원 : </div>
          </div>
        </MyHelpCapsuleTitle>
        <MyHelpCapsuleInfo>
          <div className="MyhelpCapsuleTime">마감일 : {helpData.helpDeadLine && helpData.helpDeadLine.slice(0, 10)}</div>
          <section className="MyhelpCapsuleInfoPrice">
            <div className="MyhelpCapsuleInfoPriceValue">
              {helpData.price}
            </div>
            원
          </section>
        </MyHelpCapsuleInfo>
      </MyHelpCapsuleUpperDiv>
      {myHelpVisible ? (
        <PostDetail setVisible={setVisible} data={helpData} />
      ) : null}
    </>
  );
};

export default MyHelpCapsule;
