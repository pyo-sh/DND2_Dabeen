import React from 'react';
import styled from 'styled-components';
import {Icon, Avatar, Button} from 'antd';

const Chatting = () => {
    return (
        <Modal>
            <ChattingForm>
                <ChattingTop>
                    <div className="deleteIcon">
                        <Icon type="close" />
                    </div>
                    <div className="profile">
                        <Avatar size={68} icon="user" style={{marginLeft: 15, marginTop: 5, marginRight: 10}}/>
                        <div style={{marginRight: 10, fontSize: 25}}>닉네임</div>
                        <div style={{color:"#7A7A7A", fontSize: 15}}>@아이디</div>
                    </div>
                    </ChattingTop>
                <ChattingMain>
                    <ArrowBox other>
                        <div className = "arrowBoxText">
                        표석훈인가요?
                        </div>    
                        <span>시간시간</span>
                    </ArrowBox>
                    <ArrowBox>
                        <span>시간시간</span>
                        <div className="arrowBoxText">
                            넵 맞아요^^ 쿠쿠 너무 싫어
                        </div>        
                    </ArrowBox>
                    <ArrowBox>    
                        <span>시간시간</span>
                        <div className="arrowBoxText">
                            좀 되라
                        </div>        
                    </ArrowBox>
                </ChattingMain>
                <ChattingInput>
                    <textarea placeholder="여기에 입력하세요." required></textarea>
                    <Button>입력</Button>
                </ChattingInput>
            </ChattingForm>
        </Modal>
    );
};

const Modal = styled.div`
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 30px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChattingForm = styled.div`
    position: relative;
    font-size: 20px;
    background: #F0F0F0;
    padding: 1rem;
    width: 24vw;
    height: 65vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/
`;

const ChattingTop = styled.div`
    position: absolute;
    top: 0;
    background: #E9E9E9;
    width: 24vw;
    height: 10vh;
    box-shadow: 2px 3px 5px #BFC7CE;
    color: #424242;

    & > .deleteIcon {
        text-align: right;
        height: 1vh;
        margin-top: 10px;
        margin-right: 10px;
        font-size: 25px;
        color: #BFC7CE;
    }

    & > .profile {
        display: flex;
        align-items: flex-end;
        height: 6.5vh;
    }
`;

const ChattingMain = styled.div`
    width: 24vw;
    height: 45vh;    
    display:flex;
    flex-direction: column;
    overflow: auto;
`;

const ArrowBox = styled.div`
    margin-top: 2vh;
    margin-left: 1vw;
    margin-right: 1vw; 
    text-align: ${props => (props.other ? 'left' : 'right')};
    font-size: 10px;

    & .arrowBoxText {
        display: inline-block;   
        vertical-align: bottom;
        border: 1px solid ${props => (props.other ? '#BFC7CE' : '#FF9644')};
        border-radius: 4px;
        background: ${props => (props.other ? 'white' : '#FF9644')};  
        color: ${props => (props.other ? '#7A7A7A' : '#FFFFFF')};
        font-size: 20px;
        padding: 1px 5px;
    }

    & span{
        margin-left: ${props => (props.other ? '3px' : 0)};
        margin-right: ${props => (props.other ? 0 : '3px')};
    }
`;

const ChattingInput = styled.div`
    position: absolute;
    bottom: 0;
    background: white;
    width: 24vw;
    height: 12vh;
    display: flex;
    align-items: flex-start;

    & > textarea {
        border: none;
        width: 18vw;
        height: 9vh;
        margin-top: 1vh;
        margin-left: 1vw;
        margin-right: 1vw;
        resize: none;
        color: #7a7a7a;
        ::placeholder{
            color: #BFC7CE;
        }

        :focus{
            outline: none;
        }
    }

    & Button {
        background: #FF9644;
        border: #FF9644;
        color: white;
        width: 3.5vw;
        margin-top: 1vh;
        font-size: 18px;

        :hover{
            opacity: 0.9;
            background: #FF9644;
            border: #FF9644;
            color: white;
        }

        :focus{
            background: #FF9644;
            border: #FF9644;
            color: white;
        }
    }
`;

export default Chatting;