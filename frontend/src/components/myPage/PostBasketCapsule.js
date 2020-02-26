import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { PostBasketCapsuleUpperDiv, PostBasketCapsuleWrapper, PostBasketCheckIcon, PostBasketContent } from './PostBasketCapsule.style';

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
      setSelectHelps(prev => [...prev, post.help_num])
    } else {
      setAllPrice(prev => prev - post.price);
      setSelectHelps(prev => prev.filter(p => p!== post.help_num));
    }
  }, [iconState]);
  
  return (
    <PostBasketCapsuleWrapper>
      <PostBasketCheckIcon
        type="check-circle"
        setcolor={iconState.toString()}
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
});

export default PostBasketCapsule;
