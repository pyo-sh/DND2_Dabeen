import React, { useState, useCallback } from 'react';
import { useSeletor } from 'react-redux';
import styled from 'styled-components';
import { Drawer, Button, Avatar, Rate, Row, Col } from 'antd';

const CheckDabeener = ({click, onModal, needPersonnel, applyCheck}) => {
    // const {helpPosts} = useSeletor(state => state.posts);
    const [visible, setVisible] = useState(click);
    //필요 인원 수 만큼 버튼 클릭 할 수 있게 만들어야함 

    const onClose = useCallback(() => {
        onModal(visible);
        setVisible(!visible)
    },[visible]);

    return (
        <Dabeener
            title="신청 다비너"
            width={500}
            onClose={onClose}
            visible={visible}
            headerStyle={{border: "none"}}
            bodyStyle={{ paddingBottom: 80 }}
        >
        <DrawerForm>
            <div className="drawerTop">
                <div className="drawerTopFlex">
                    <div className="drawerTopMargin">신청인원</div>
                    <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>N</span>명</div>
                </div>
                <div className="drawerTopMargin">|</div>
                <div className="drawerTopFlex">
                    <div className="drawerTopMargin">확정인원</div>
                    <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>1</span>/{needPersonnel}</div>
                </div>
                {
                    applyCheck&&<div>좀있다가 할 것</div>
                }
            </div>
            <div className="drawerMiddle">
                {/* 얘도 map으로 줘야함.... 
                    아이디, 닉네임, 총 도움수, 평점, 자기소개 받아와서 출력
                */}
                    <ApplyDabeener>
                        <Avatar size={80} icon="user"/>
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
                    </ApplyDabeener>
                    <ApplyDabeener>
                        <Avatar size={80} icon="user"/>
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
                                <ChoiceButton choice>취소</ChoiceButton>
                            </div>
                        </UserInfo>
                    </ApplyDabeener>
            </div>
        </DrawerForm>
        </Dabeener>
    );
};

const Dabeener = styled(Drawer)`
    & .ant-drawer-title {
        color: #424242;
        font-size: 40px;
        margin-top: 1vh;
    }
    & .ant-drawer-close {
        font-size: 30px;
    }
`;

const DrawerForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 450px; 

    & > .drawerTop {
        display: flex;
        width: 450px;
        font-size: 20px;

        & > .drawerTopFlex {
            display: flex;
            flex-wrap: wrap;
        }

        & .drawerTopMargin {
            margin-left: 5px;
        }
    }

    & > .drawerMiddle {
        margin-bottom: 5px;
    }
`;

const ApplyDabeener = styled.div`
    border: 1px solid #BFC7CE;
    border-radius: 10px;
    width: 450px;
    height: 130px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2vh;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;

    & .user{
        display: flex;
        flex-direction: column;
    }

    & .userInfo {
        display: flex;
        align-items: flex-end;
        width: 280px;

        & div{
            margin-right: 5px;
            font-size: 20px;
        }
    }

    & .userIntro {
        font-size: 13px;
        width: 280px;
    }

    & .userDetailInfo {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 300px;

        & .rateFlex {
            display: flex;
            align-items: center;

            & > div{
                margin-left: 4px;
                margin-top: 4px;
                font-size: 15px;
            }
        }
    }

`;

//선택됐으면 버튼색 회색으로 
const ChoiceButton = styled(Button)`
    width: 80px;
    background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    font-size: 18px;
    box-shadow: 2px 3px 5px #BFC7CE;

    :hover {
        opacity: 0.9;
        background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    }

    :focus{
        background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    }
`;

export default CheckDabeener;