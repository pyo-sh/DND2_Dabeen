import React, { memo, useCallback, useState } from 'react';
import {Rate} from 'antd';
import {ApplyDabeenerDiv, UserInfo, ChoiceButton} from './EvaluateDabeener.style';
import {getCookie} from '../../utils/cookieFunction';
import Link from 'next/link';
import {useDispatch} from 'react-redux';
import { evaluateDabeenerRequestAction } from '../../reducers/posts';
import inputChangeHook from '../../hooks/inputChangeHook';

const EvaluateDabeener = memo(({dabeener, helpNum}) => {
    const dispatch = useDispatch();

    const [ rate, setRate ] = useState(0);
    const [ comment, onChangeComment ] = inputChangeHook('');

    const onChangeRate = useCallback((value) => {
        setRate(value);
    }, []);

    // 평가하면 
    const evaluate = useCallback(() => { // 글올린 사람이 선택하는 버튼 클릭
        dispatch(evaluateDabeenerRequestAction({helpNum, userNum: dabeener.user.userNum, rate, comment, cookie: getCookie()}));
    }, [helpNum, dabeener && dabeener.user.userNum, rate, comment]);

    // const cancelDabeener = useCallback(() => { // 자기가 신청한 것 취소하는 버튼 클릭
    //     dispatch(cancelApplyRequestAction({helpNum, userNum : myNum, cookie:getCookie()}));
    // }, [helpNum, myNum]);

    //다비너의 정보 조금 보여주고 rate 해서 결과를 보낼거임.
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
                    <div>
                        <div className="rateFlex"> 
                            <Rate allowHalf value={rate} onChange = {onChangeRate} style={{fontSize: 15}}/>
                        </div>
                        <input placeholder= "평가 내용을 100자이내로 적어주세요." maxLength={100} value ={comment} onChange={onChangeComment}/>
                    </div>
                    {dabeener.rate ? <ChoiceButton choice>평가완료</ChoiceButton> :  <ChoiceButton onClick={evaluate}>평가하기</ChoiceButton>}
                </div>
            </UserInfo>
        </ApplyDabeenerDiv>
    );
});

export default EvaluateDabeener;