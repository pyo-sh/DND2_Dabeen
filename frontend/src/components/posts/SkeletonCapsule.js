import React from "react";
import { Divider } from "antd";
import { PostCapsuleUpperDiv, CapsuleTitleWrapper } from './SkeletonCapsue.style';

const SkeletonCapsule = () => {
  return (
    <>
      <PostCapsuleUpperDiv
      >
        <div className="CapsuleMain">
          <div className="CapsuleMainLocation">
            <div className="CapsuleMainLocationTriangle"></div>
            <div className="CapsuleMainLocationInfo">
            </div>
          </div>
          <div className="CapsuleMainImage"/>
          <div className="CapsuleMainProfile">
            <Divider orientation="left">
              <div className="CapsuleMainPicture"/>
            </Divider>
            <div className="CapsuleMainUserInfo">
              <div className="CapsuleMainNickname"></div>
              <div className="CapsuleMainId"></div>
            </div>
          </div>
        </div>
        <CapsuleTitleWrapper>
          <div className="CapsuleTitle">
            <div className="CapsuleTitleMain"></div>
              <div setcolor="true" className="CapsuleTitleCheck">
              </div>
          </div>
          <div className="CapsuleFinishTime"/>
          <div className="CapsuleDoingTime"/>
        </CapsuleTitleWrapper>
      </PostCapsuleUpperDiv>
    </>
  );
};

export default SkeletonCapsule;
