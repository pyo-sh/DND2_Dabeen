import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import {
  PostBasketCapsuleUpperDiv,
  PostBasketCapsuleWrapper,
  BasketCapsuleCircle,
  PostBasketCheckIcon,
  PostBasketContent,
  PostBasketContentBox
} from './PostBasketCapsule.style';
import PostDetail from '../posts/PostDetail';

const PostBasketCapsule = memo(({ post, setAllPrice, setSelectHelps }) => {
  const [iconState, setIconState] = useState(false);
  const first = useRef(true);
  const imagesURL = post.helpPic.map(pic => pic.path);
  
  const [visibleDetail, setVisibleDetail] = useState(false);
  const setVisible = useCallback(e => {
    setVisibleDetail(prev => !prev);
  }, []);
  
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
    const thisPrice = post.price * post.approveNum;
    if(iconState) {
      setAllPrice(prev => prev + thisPrice);
      setSelectHelps(prev => [...prev, post.helpNum])
    } else {
      setAllPrice(prev => prev - thisPrice);
      setSelectHelps(prev => prev.filter(p => p !== post.helpNum));
    }
  }, [iconState]);

  const canPay = post.approveNum !== 0;
  return (
    <PostBasketCapsuleWrapper>
      {canPay
      ? <PostBasketCheckIcon
          type="check-circle"
          setcolor={iconState.toString()}
          onClick={onClickIcon}
        />
      : <PostBasketCheckIcon
          type="stop"
          setcolor={iconState.toString()}
          onClick={()=>{alert("결제는 승인 인원이 최소 1명 이상이여야 합니다!")}}
        />
      }
      <PostBasketCapsuleUpperDiv onClick={setVisible}>
        <BasketCapsuleCircle><div className="Circle"></div></BasketCapsuleCircle>
        <img className="BasketCapsuleCapture" src={imagesURL.length === 1 ? imagesURL[0] : '/images/noImage.jpg'}/>
        <PostBasketContent>
          <div className="PostBasketTitle">{post.helpTitle}</div>
          <PostBasketContentBox>
            <div className="PostBasketPeople">
              신청인원 :
              <div className="PostBasketPeopleApplied">{post.approveNum}</div>
              /
              <div className="PostBasketPeopleApply">{post.postNum}</div>
            </div>
          </PostBasketContentBox>
          <PostBasketContentBox>
            <div className="PostBasketMoney">
              가격 :
              <div className="PostBasketMoneyValue">{post.price}</div>
              원
            </div>
            <div className={canPay ? "PostBasketPayCheck" : "PostBasketPayUncheck"}>{canPay ? "결제 가능" : "결제 불가"}</div>
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
      {visibleDetail
      ? <PostDetail setVisible={setVisible} data={post} />
      : null
      }
    </PostBasketCapsuleWrapper>
  );
});

export default PostBasketCapsule;
