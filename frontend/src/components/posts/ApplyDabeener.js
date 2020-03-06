import React, { memo, useCallback, useMemo } from 'react';
import {Rate} from 'antd';
import {ApplyDabeenerDiv, UserInfo, ChoiceButton, CancelButton} from './ApplyDabeener.style';
import { calculateRate } from '../../utils/calculateRate';
import {getCookie} from '../../utils/cookieFunction';
import Link from 'next/link';
import {useDispatch} from 'react-redux';
import { cancelApplyRequestAction, approveDabeenerRequestAction, approveCancelRequestAction } from '../../reducers/posts';

const ApplyDabeener = memo(({dabeener, isMe, helpNum, myNum, needPersonnel, approveDabeenersNum}) => {
    const dispatch = useDispatch();

    const isMyProfile = useMemo(() => myNum === dabeener.user.userNum, [myNum, dabeener.user.userNum]);
    
    const choiceDabeener = useCallback(() => { // 글올린 사람이 선택하는 버튼 클릭
        if(approveDabeenersNum + 1 > needPersonnel) {
            alert('필요 인원 보다 더 많이 승인할 수는 없습니다.');
            return;
        }
        dispatch(approveDabeenerRequestAction({helpNum, userNum: dabeener.user.userNum, cookie: getCookie()}));
    }, [helpNum, dabeener && dabeener.user.userNum, approveDabeenersNum, needPersonnel]);

    const cancelApprove = useCallback(() => { // 글 올린 사람이 승인한 사람 취소하는 버튼
        dispatch(approveCancelRequestAction({helpNum, userNum: dabeener.user.userNum, cookie: getCookie()}));
    }, [helpNum, dabeener && dabeener.user.userNum]);

    const cancelDabeener = useCallback(() => { // 자기가 신청한 것 취소하는 버튼 클릭
        dispatch(cancelApplyRequestAction({helpNum, userNum : myNum, cookie:getCookie()}));
    }, [helpNum, myNum]);



    return (
        <ApplyDabeenerDiv>
            <Link href="/userpage/[usernum]/[pagename]" as={`/userpage/${dabeener.user.userNum}/userinfo`}>
                <img className="userProfile" src={ dabeener.user.pic_path || '/images/defaultProfile.png'}/>
            </Link>
            <UserInfo>
                <div className="user">
                    <div className="userInfo">
                        <div className="UserNickname">{dabeener.user.nickname}</div>
                        <div className="UserId">@{dabeener.user.userId}</div>
                    </div>
                    <div className="userIntro">
                        {dabeener.user.introduce}
                    </div>
                </div>
                <div className="userDetailInfo">
                    <div>
                        <div className="rateFlex">
                            <Rate allowHalf disabled defaultValue={calculateRate(dabeener.user.avgRate)} style={{fontSize: 15}}/>
                            <div>{dabeener.user.avgRate}</div>
                        </div>
                    </div>
                    {isMe && dabeener.isApprove ==='y' ? <ChoiceButton choice onClick={cancelApprove}>선택취소</ChoiceButton> : isMe ?  <ChoiceButton onClick={choiceDabeener}>선택</ChoiceButton> : null}
                    {isMyProfile && <CancelButton onClick={cancelDabeener}>지원취소</CancelButton>}
                </div>
            </UserInfo>
        </ApplyDabeenerDiv>
    );
});

export default ApplyDabeener;