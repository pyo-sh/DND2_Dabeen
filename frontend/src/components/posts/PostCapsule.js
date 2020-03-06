import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import PostDetail from "./PostDetail";
import { PostCapsuleUpperDiv, LocationIcon, CapsuleTitleWrapper } from './PostCapsule.style';

const PostCapsule = ({ data, categoryNum}) => {
  const [postDetailVisible, setPostDetailVisible] = useState(false); // 카테고리 클릭에 대한 상세 정보
  // const helpDeadline = data.helpDeadline.split('T');
  // const helpExecDate = data.helpExecDate.split('T');
  // 상세 정보를 보이게하는 Controls
  const setVisible = useCallback(e => {
    setPostDetailVisible(prev => !prev);
  }, []);

  return (
    <>
      <PostCapsuleUpperDiv
        onClick={useCallback(e => {
          setPostDetailVisible(true);
        }, [])}
      >
        <div className="CapsuleMain">
          <div className="CapsuleMainLocation">
            <div className="CapsuleMainLocationTriangle"></div>
            <div className="CapsuleMainLocationInfo">
              <LocationIcon type="environment" />
              {data.execLoc}
            </div>
          </div>
          {data.helpPic.length ? 
          <img className="CapsuleMainImage" src={data.helpPic[0].path} alt="게시글 이미지"/>
          :
          <img className="CapsuleMainImage" src={'/images/noImage.jpg'} alt="이미지 없음"/>
          }
          <div className="CapsuleMainProfile">
            <Divider orientation="left">
              <img className="CapsuleMainPicture" src={data.picPath || `/images/defaultProfile.png`} alt="유저 프로필"/>
            </Divider>
            <div className="CapsuleMainUserInfo">
              <div className="CapsuleMainNickname">{data.nickname}</div>
              <div className="CapsuleMainId">@{data.userId}</div>
            </div>
          </div>
        </div>
        <CapsuleTitleWrapper>
          <div className="CapsuleTitle">
            <div className="CapsuleTitleMain">{data.helpTitle}</div>
            {data.isHelpApprove === "y"? (
              <div setcolor="true" className="CapsuleTitleCheck">
                마감
              </div>
            ) : (
              <div setcolor="false" className="CapsuleTitleCheck">
                신청 중
              </div>
            )}
          </div>
          <div className="CapsuleDoingTime">수행일 : {data.helpExecDate.split('T')[0]}</div>
          <div className="CapsuleContentValueWrapper">
            <div className="CapsuleFinishTime">
              신청 마감일 : {data.helpDeadLine.split('T')[0]}
            </div>
            <div className="CapsuleContentMoney">
                <div className="CapsuleContentMoneyValue">{data.price}</div>원
            </div>
          </div>
        </CapsuleTitleWrapper>
      </PostCapsuleUpperDiv>
      {postDetailVisible ? (
        <PostDetail setVisible={setVisible} data={data} categoryNum={categoryNum}/>
      ) : null}
    </>
  );
};

export default PostCapsule;
