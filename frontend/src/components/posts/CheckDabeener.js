import React, { useState, useCallback } from 'react';
import { useSeletor } from 'react-redux';
import styled, {keyframes} from 'styled-components';
import { Button, Avatar, Rate, Icon } from 'antd';

const CheckDabeener = ({click, onModal, needPersonnel, applyCheck}) => {
    // const {helpPosts} = useSeletor(state => state.posts);
    const [visible, setVisible] = useState(click);
    const [count, setCount] = useState(0);

    const onClose = useCallback(() => {
        onModal(!visible);
    },[visible]);
    
    //필요 인원 수 만큼 버튼 클릭 할 수 있게 만들어야함 
    // const choiceDabeener = useCallback(() => {
    //     if(count <= needPersonnel){
            
    //     }
    // }, []);

    return (
        <Modal>
            <DrawerForm>
                <div className="drawerTitle">
                    <div>신청 다비너</div><Icon type="close" className="icon" onClick={onClose}/>
                </div>
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
                        applyCheck&&<button className="pay">결제!</button>
                     }
                 </div>
                 <div className="drawerMiddle">
                    {/* 얘도 map으로 줘야함.... 
                        아이디, 닉네임, 총 도움수, 평점, 자기소개 받아와서 출력
                    */}
                    <ApplyDabeener>
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
                                <ChoiceButton onClick={choiceDabeener}>선택</ChoiceButton>
                            </div>
                        </UserInfo>
                    </ApplyDabeener>
                    <ApplyDabeener>
                        <Avatar icon="user"/>
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
        </Modal>
    );
};

const fade = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const Modal = styled.div`
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const DrawerForm = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 20px;
    color: #424242;
    background: white;
    padding: 1rem;
    width: 40%;
    max-width: 500px;
    min-width: 300px;
    display: flex; 
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    ::-webkit-scrollbar{display:none;}  
    animation: ${fade} 0.2s linear;
    transition: visible 0.2s linear;
    
    & > .drawerTitle{
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 450px;
        min-width: 300px;
        font-size: 40px;

        & > .icon{
            font-size: 35px;
        }
    }
    & > .drawerTop {
        display: flex;
        width: 100%;
        max-width: 450px;
        min-width: 300px;
        font-size: 20px;
        margin-bottom: 5px;

        & > .drawerTopFlex {
            display: flex;
            flex-wrap: wrap;
        }

        & > .drawerTopMargin {
            margin-left: 5px;
        }

        & .pay{
            border: 1px solid #FF4300;
            border-radius: 5px;
            background: #FF4300;
            color: #FFFFFF;
            width: 80px;
            height: 30px;
            margin-left: 10px;
            line-height: 1;

            :focus{
                outline: none;
            }
        }
    }

    & > .drawerMiddle {
        margin-bottom: 5px;
        width: 100%;
        max-width: 450px;
        min-width: 300px;
    }
`;

const ApplyDabeener = styled.div`
    border: 1px solid #BFC7CE;
    border-radius: 10px;
    width: 100%;
    max-width: 450px;
    min-width: 300px;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2vh;

    & .ant-avatar {
        width: 100%;
        max-width: 80px;
        height: 80px;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    max-width: 300px;
    min-width: 150px;

    & .user{
        display: flex;
        flex-direction: column;
    }

    & .userInfo {
        display: flex;
        align-items: flex-end;
        width: 100%;
        max-width: 280px;
        min-width: 150px;

        & div{
            margin-right: 5px;
            font-size: 20px;
        }
    }

    & .userIntro {
        font-size: 13px;
        width: 100%;
        max-width: 280px;
        min-width: 130px;
    }

    & .userDetailInfo {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /* align-items: flex-end; */
        width: 100%;
        

        & .rateFlex {
            display: flex;
            align-items: center;

            & > div{    
                margin-left: 4px;
                margin-top: 4px;
                font-size: 15px;
            }
        }

        & .ant-rate-star{
            color: #FF4300;
        }
    }

`;

//선택됐으면 버튼색 회색으로 
const ChoiceButton = styled.button`
    width: 80px;
    height: 30px;
    border-radius: 5px;
    background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    font-size: 18px;
    box-shadow: 2px 3px 5px #BFC7CE;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    }

    :focus{
        outline: none;
    }
`;
export default CheckDabeener;