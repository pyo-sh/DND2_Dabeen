import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Icon } from "antd";

const PostBasketCapsule = ({ post }) => {
  const [iconState, setIconState] = useState(false);
  const onClickIcon = useCallback(
    e => {
      setIconState(!iconState);
    },
    [iconState]
  );
  return (
    <PostBasketCapsuleWrapper>
      <PostBasketCheckIcon
        type="check-circle"
        setcolor={iconState}
        onClick={onClickIcon}
      />
      <PostBasketCapsuleUpperDiv>
        <div className="BasketCapsuleCapture"></div>
        <PostBasketContent>
          <div className="PostBasketContentTitle">{post.title}</div>
          <div className="PostBasketContentInfo">
            <div className="PostBasketContentInfoMoney">{post.price}</div>
            <div className="PostBasketContentInfoTimeWrapper">
              <div className="PostBasketContentInfoFinishTime">
                신청 마감 : {post.help_aply_cls_dttm}
              </div>
              <div className="PostBasketContentInfoDoingTime">
                수행일 : {post.pref_help_exec_dttm}
              </div>
            </div>
          </div>
          <div className="PostBasketContentPeople">
            <div className="PostBasketContentPeopleApplied">
              신청인원 : 3/{post.pref_suppl_num}
            </div>
            <div className="PostBasketContentPeopleBtn">재 선택</div>
          </div>
          <div className="PostBasketContentPayCheck">결제가능</div>
        </PostBasketContent>
      </PostBasketCapsuleUpperDiv>
    </PostBasketCapsuleWrapper>
  );
};

const PostBasketCapsuleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const PostBasketCapsuleUpperDiv = styled.div`
  width: 500px;
  padding: 40px 0;
  border-top: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  & .BasketCapsuleCapture {
    width: 225px;
    height: 150px;
    margin-right: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    & :hover {
      border: 1px solid #ff4300;
    }
  }
`;
const PostBasketCheckIcon = styled(Icon)`
  font-size: 20px;
  margin-left: -30px;
  margin-right: 10px;
  color: ${props => (props.setcolor ? "#FF3400" : "none")};
  cursor: pointer;
`;
const PostBasketContent = styled.div`
  margin-left: 10px;
  & .PostBasketContentTitle {
    font-size: 20px;
    font-weight: bold;
  }
  & .PostBasketContentInfo {
    display: flex;
    padding-bottom: 10px;
    & .PostBasketContentInfoMoney {
      padding-right: 10px;
      border-right: 1px solid #d9d9d9;
    }
    & .PostBasketContentInfoTimeWrapper {
      padding-left: 10px;
      & .PostBasketContentInfoFinishTime {
      }
      & .PostBasketContentInfoDoingTime {
      }
    }
  }
  & .PostBasketContentPeople {
    padding-top: 10px;
    border-top: 1px solid #d0d0d0;
    display: flex;
    align-items: flex-end;
    & .PostBasketContentPeopleApplied {
      margin-right: 10px;
    }
    & .PostBasketContentPeopleBtn {
      width: 50px;
      margin-left: 10px;
      text-align: center;
      color: white;
      background: #ff4300;
      border-radius: 10px;
    }
  }
  & .PostBasketContentPayCheck {
  }
`;

export default PostBasketCapsule;
