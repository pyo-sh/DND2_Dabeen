import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { PostBasketCapsuleUpperDiv, PostBasketCapsuleWrapper, BasketCapsuleCircle, PostBasketCheckIcon, PostBasketContent, PostBasketContentBox } from './PostBasketCapsule.style';

const PostBasketCapsule = memo(({ post, setAllPrice, setSelectHelps }) => {
  const [iconState, setIconState] = useState(false);
  const first = useRef(true);
  const onClickIcon = useCallback(
    e => {
      setIconState(prev => !prev);
    },
    []
  );
  useEffect(() => {
    if(first.current) {
      first.current = false;
      return;
    }
    if(iconState) {
      setAllPrice(prev => prev + post.price);
      setSelectHelps(prev => [...prev, post.helpNum])
    } else {
      setAllPrice(prev => prev - post.price);
      setSelectHelps(prev => prev.filter(p => p !== post.helpNum));
    }
  }, [iconState]);
  
  return (
    <PostBasketCapsuleWrapper>
      <PostBasketCheckIcon
        type="check-circle"
        setcolor={iconState.toString()}
        onClick={onClickIcon}
      />
      <PostBasketCapsuleUpperDiv propImage={'/images/main2.jpg'}>
        <BasketCapsuleCircle><div className="Circle"></div></BasketCapsuleCircle>
        <img className="BasketCapsuleCapture" src={'/images/main2.jpg'}/>
        <PostBasketContent>
          <div className="PostBasketTitle">{post.helpTitle}</div>
          <PostBasketContentBox>
            <div className="PostBasketPeople">
              신청인원 :
              <div className="PostBasketPeopleApplied">{post.approveNum}</div>
              /
              <div className="PostBasketPeopleApply">{post.applyNum}</div>
            </div>
          </PostBasketContentBox>
          <PostBasketContentBox>
            <div className="PostBasketMoney">
              가격 :
              <div className="PostBasketMoneyValue">{post.price}</div>
              원
            </div>
            <div className="PostBasketPayCheck">결제가능</div>
          </PostBasketContentBox>
          <div className="PostBasketTimeWrapper">
            <div className="PostBasketFinishTime">
              신청마감 : {post.helpDeadLine && post.helpDeadLine.slice(0, 10)}
            </div>
            <div className="PostBasketDoingTime">
              수행일 : {post.helpExecDate && post.helpExecDate.slice(0, 10)}
            </div>
          </div>
        </PostBasketContent>
      </PostBasketCapsuleUpperDiv>
    </PostBasketCapsuleWrapper>
  );
});

export default PostBasketCapsule;
