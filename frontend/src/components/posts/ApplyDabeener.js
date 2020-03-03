import React, { memo, useCallback, useMemo } from 'react';
import {Rate} from 'antd';
import {ApplyDabeenerDiv, UserInfo, ChoiceButton, CancelButton} from './ApplyDabeener.style';
import { calculateRate } from '../../utils/calculateRate';
import {getCookie} from '../../utils/cookieFunction';
import Link from 'next/link';
import {useDispatch} from 'react-redux';
import { cancelApplyRequestAction } from '../../reducers/posts';

const ApplyDabeener = memo(({dabeener, isMe, helpNum, myNum, setApproveDabeenersNum}) => {
    const dispatch = useDispatch();

    const isMyProfile = useMemo(() => myNum === dabeener.user.userNum, [myNum, dabeener.user.userNum]);
    
    const choiceDabeener = useCallback(() => { // 글올린 사람이 선택하는 버튼 클릭

    }, []);

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
                        <div>{dabeener.user.nickname}</div>
                        <div style={{fontSize: 14}}>@{dabeener.user.userId}</div>
                    </div>
                    <div className="userIntro">
                        {dabeener.user.introduce}
                    </div>
                </div>
                <div className="userDetailInfo">
                    {/* <div>
                        <div style={{fontSize:15}}>10</div>
                        <div style={{fontSize:11}}>총 도움수</div>
                    </div> */}
                    <div>
                        <div className="rateFlex">
                            <Rate allowHalf disabled defaultValue={calculateRate(dabeener.user.avgRate)} style={{fontSize: 15}}/>
                            <div>{dabeener.user.avgRate}</div>
                        </div>
                    </div>
                    {isMe && <ChoiceButton onClick={choiceDabeener}>선택</ChoiceButton>}
                    {isMyProfile && <CancelButton onClick={cancelDabeener}>취소</CancelButton>}
                </div>
            </UserInfo>
        </ApplyDabeenerDiv>
    );
});

export default ApplyDabeener;