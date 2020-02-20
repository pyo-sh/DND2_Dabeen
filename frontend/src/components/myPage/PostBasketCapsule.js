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
                신청마감 : {post.help_aply_cls_dttm}
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
  justify-content: center;
  align-items: center;
`;
const PostBasketCapsuleUpperDiv = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 260px;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  & .BasketCapsuleCapture {
    flex: 1;
    max-width: 200px;
    min-width: 150px;
    height: 150px;
    margin: 0 10px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    & :hover {
      border: 1px solid #ff4300;
    }
  }
`;
const PostBasketCheckIcon = styled(Icon)`
  font-size: 20px;
  color: ${props => (props.setcolor ? "#FF3400" : "none")};
  cursor: pointer;
`;
const PostBasketContent = styled.div`
  margin-left: 10px;
  & .PostBasketContentTitle {
    width: 205px;
    height: 30px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .PostBasketContentInfo {
    display: flex;
    padding-bottom: 10px;
    & .PostBasketContentInfoMoney {
      width: 45px;
      margin-right: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .PostBasketContentInfoTimeWrapper {
      border-left: 1px solid #d9d9d9;
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
