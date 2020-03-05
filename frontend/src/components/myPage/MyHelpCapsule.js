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
          {helpType === "take" && isMe
          ? helpData.isPaymentApprove === "p"
            ? <div className="done">결제완료</div>
            : <div className="doing">결제필요</div>
          : helpData.isHelpApprove === "y"
            ? <div className="done">도움완료</div>
            : <div className="doing">진행 중</div>
          } 
        </div>
        {helpData.helpPic.length ? 
        <img className="MyhelpCapsuleImage" src={helpData.helpPic[0].path}/>
        :
        <img className="MyhelpCapsuleImage" src={'/images/noImage.jpg'}/>
        }
        {/* <img className="MyhelpCapsuleImage" src={'/images/main2.jpg'}/> */}
        <MyHelpCapsuleTitle>
          <div className="MyhelpCapsuleTitleMain">{helpData.helpTitle}</div>
          <div>
              <div className="MyhelpCapsuleTime">수행일 : {helpData.helpExecDate && (helpData.helpExecDate.slice(0, 10))}</div>
              <div className="MyHelpCapsuleTimeWrapper">
                <div className="MyhelpCapsuleTime">신청 마감일 : {helpData.helpDeadLine && helpData.helpDeadLine.slice(0, 10)}</div>
                {helpType === "take"
                ? null
                : <div className="MyhelpCapsulePrice">
                    <div className="MyhelpCapsulePriceValue">
                      {helpData.price}
                    </div>
                    원
                  </div>
                }
              </div>
          </div>
        </MyHelpCapsuleTitle>
        {helpType === "take"
        ? <MyHelpCapsuleInfo>
            <div className="MyhelpCapsuleSub">
                신청인원 : 
                <div className="MyhelpCapsulePeople">{helpData.approveNum}</div>
                /
                <div className="MyhelpCapsulePeople">{helpData.postNum}</div>
              </div>
            <div className="MyhelpCapsuleSub"></div>
            <div className="MyhelpCapsulePrice">
              <div className="MyhelpCapsulePriceValue">
                {helpData.price}
              </div>
              원
            </div>
          </MyHelpCapsuleInfo>
        : null
        }
      </MyHelpCapsuleUpperDiv>
      {myHelpVisible ? (
        <PostDetail setVisible={setVisible} data={helpData} />
      ) : null}
    </>
  );
};

export default MyHelpCapsule;
