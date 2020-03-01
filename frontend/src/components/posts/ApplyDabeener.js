import React from 'react';
import {Avatar, Rate} from 'antd';
import {ApplyDabeenerDiv, UserInfo, ChoiceButton} from './ApplyDabeener.style';

const ApplyDabeener = () => {
    return (
        <ApplyDabeenerDiv>
            <Avatar/> {/*이 antd도 조만간 안녕일듯  */}
            <UserInfo>
                <div className="user">
                    <div className="userInfo">
                        <div>닉네임</div>
                        <div style={{fontSize: 14}}>@아이디</div>
                    </div>
                    <div className="userIntro">
                        아이엠 그라운드 자기소개하기! 안녕 나는 연전광이라고해! 우리 앞으로 잘 지내자!
                    </div>
                </div>
                <div className="userDetailInfo">
                    <div>
                        <div style={{fontSize:15}}>10</div>
                        <div style={{fontSize:11}}>총 도움수</div>
                    </div>
                    <div>
                        <div className="rateFlex">
                            <Rate allowHalf disabled defaultValue={3.5} style={{fontSize: 15}}/>
                            <div>3.5</div>
                        </div>
                        <div style={{fontSize:11}}>평점</div>
                    </div>
                    <ChoiceButton>선택</ChoiceButton>
                </div>
            </UserInfo>
        </ApplyDabeenerDiv>
    );
};

export default ApplyDabeener;