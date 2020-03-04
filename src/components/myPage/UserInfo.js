import React, { useState, useCallback } from 'react';
import { Icon } from 'antd';
import ModifyUser from './ModifyUser';
import Refund from '../money/Refund';
import { UserInfoWrapper } from './UserInfo.style';
import { useSelector } from 'react-redux';
// useRouter를 사용해서 id를 가지고 와서 그 정보를 보여준다!!

const UserInfo = ({ userInfo, isMe }) => {
    const [isChanging, setIsChanging] = useState(false);
    const [modalRefund, setModalRefund] = useState(false);
    const { me : { ownMilege }} = useSelector(state => state.user);

    // useSelector로 정보를 가져온다. 나일 때랑 다른 사람일 때?..
    const onClickEdit = useCallback((e) => {
        setIsChanging(prev => !prev);
    }, []);
    const onClickRefund = useCallback(e => {
        if(ownMilege === 0) {
            alert('마일리지가 없으면 환급 받을 수 없습니다.');
            return;
        }
        setModalRefund(prev => !prev);
      }, [ownMilege]);
    return (
        isChanging
        ?   <ModifyUser userInfo={userInfo} onClickCancel={onClickEdit}/>
        :<UserInfoWrapper>
            <div className="userinfoTitle">
                회원정보
                {isMe && <button
                    className="userinfoEditBtn"
                    onClick={onClickEdit}
                    >
                    edit
                </button> }
            </div>
            <div className="userinfoWrapper">
                <div className="userinfoContent">
                    <div className="userinfoContentName">
                        <Icon className="icon" type="user"/> 닉네임
                    </div>
                    <div className="userinfoContentValue">{userInfo.nickName}</div>
                </div>
                <div className="userinfoContent">
                    <div className="userinfoContentName">
                        <Icon className="icon" type="form"/> 소개
                    </div>
                    <div className="userinfoContentValue">{userInfo.introduce}</div>
                </div>
                <div className="userinfoContent">
                    <div className="userinfoContentName">
                        <Icon className="icon" type="idcard"/> 아이디
                    </div>
                    <div className="userinfoContentValue">{userInfo.userId}</div>
                </div>
                <div className="userinfoContent">
                    <div className="userinfoContentName">
                        <Icon className="icon" type="mail"/> 이메일
                    </div>
                    <div className="userinfoContentValue">{userInfo.email}</div>
                </div>
                {isMe && <div className="userinfoContent">
                    <div className="userinfoContentName">
                        <Icon className="icon" type="mobile"/> 전화번호
                    </div>
                    <div className="userinfoContentValue">{userInfo.phoneNumber}</div>
                </div> }
                <div className="userinfoContent">
                    <div className="userinfoContentName">
                        <Icon className="icon" type="environment" /> 주소
                    </div>
                    <div className="userinfoContentValue">{userInfo.address}</div>
                </div>
                {isMe
                ?   <div className="userinfoContent">
                        <div className="userinfoContentName">
                            <Icon className="icon" type="dollar" /> 마일리지
                        </div>
                        <div className="userinfoContentValueWrapper">
                            <div className="userinfoContentValue">{userInfo.ownMilege}</div>
                            <button
                                className="userRefundBtn"
                                onClick={onClickRefund}
                                
                                >
                                환급
                            </button>
                        </div>
                        <Refund visible={modalRefund} setVisible={onClickRefund} ownMilege={ownMilege}/>
                    </div>
                :   null
                }
            </div>
        </UserInfoWrapper>
    );
};

export default UserInfo;