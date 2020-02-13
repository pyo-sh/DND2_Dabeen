import React, { useState, useCallback } from 'react';
import { useSeletor } from 'react-redux';
import PostDetail from './PostDetail';
import styled from 'styled-components';
import { Drawer, Button, Avatar, Rate } from 'antd';

const MyPostClick = () => {
    const [myPost, setMyPost] = useState(true);
    const [visible, setVisible] = useState(true);
    // const {helpPosts} = useSeletor(state => state.posts);

    //필요 인원 수 만큼 버튼 클릭 할 수 있게 만들어야함 => helpPosts.needPersonnel 가져옴

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <Drawer1
            title="신청 다비너"
            width={"30vw"}
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
                    <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>1</span>/2</div>
                </div>
            </div>
            <div className="drawerMiddle">
                <ApplyDabeener>
                    <Avatar size={90} icon="user"/>
                    <div className="content">
                        <div className="userInfo">
                            <div>닉네임</div>
                            <div style={{fontSize: 14}}>@아이디</div>
                        </div>
                        <div className="userIntro">
                            아이엠 그라운드 자기소개하기! 안녕 나는 연전광이라고해! 우리 앞으로 잘 지내자!
                        </div>
                        <div className="userDetailInfo">
                            <div>
                                <div style={{fontSize:20}}>10</div>
                                <div style={{fontSize:14}}>총 도움수</div>
                            </div>
                            <div>
                                <div className="rateFlex">
                                    <Rate allowHalf disabled defaultValue={3.5} style={{fontSize: 20}}/>
                                    <div>3.5</div>
                                </div>
                                <div style={{fontSize:14}}>평점</div>
                            </div>
                            <ChoiceButton>선택</ChoiceButton>
                        </div>
                    </div>
                </ApplyDabeener>
                <ApplyDabeener>
                    <Avatar size={90} icon="user"/>
                    <div className="content">
                        <div className="userInfo">
                            <div>닉네임</div>
                            <div style={{fontSize: 14}}>@아이디</div>
                        </div>
                        <div className="userIntro">
                            아이엠 그라운드 자기소개하기! 안녕 나는 연전광이라고해! 우리 앞으로 잘 지내자!
                        </div>
                        <div className="userDetailInfo">
                            <div>
                                <div style={{fontSize:20}}>10</div>
                                <div style={{fontSize:14}}>총 도움수</div>
                            </div>
                            <div>
                                <div className="rateFlex">
                                    <Rate allowHalf disabled defaultValue={3.5} style={{fontSize: 20}}/>
                                    <div>3.5</div>
                                </div>
                                <div style={{fontSize:14}}>평점</div>
                            </div>
                            <ChoiceButton choice>취소</ChoiceButton>
                        </div>
                    </div>
                </ApplyDabeener>
            </div>
        </DrawerForm>
        </Drawer1>
    );
};

const Drawer1 = styled(Drawer)`
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
    width: 28vw; 

    & > .drawerTop {
        display: flex;
        width: 28vw;
        font-size: 20px;

        & > .drawerTopFlex {
            display: flex;
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
    width: 28vw;
    height: 15vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2vh;

    & .content{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 20vw;
        height: 12vh;
        margin-left: 5px;
    }

    & .userInfo {
        display: flex;
        align-items: flex-end;
        width: 10vw;

        & div{
            margin-right: 5px;
            font-size: 20px;
        }
    }

    & .userIntro {
        font-size: 13px;
        width: 19vw;
    }

    & .userDetailInfo {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 19vw;

        & .rateFlex {
            display: flex;
            align-items: center;

            & > div{
                margin-left: 4px;
                margin-top: 4px;
                font-size: 20px;
            }
        }
    }
`;

//선택됐으면 버튼색 회색으로 
const ChoiceButton = styled(Button)`
    width: 4vw;
    background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    font-size: 20px;
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

export default MyPostClick;