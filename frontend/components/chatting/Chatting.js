import React from 'react';
import styled from 'styled-components';
import {Icon, Avatar} from 'antd';

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
`;

const ArrowBox = styled.div`
    display: inline-block;
    border: 1px solid;
    border-radius: 4px;
    background: ${props => (props.other ? 'white' : '#FF9644')};
    
    margin-top: 2vh;
    margin-left: 1vw;
`;

const ChattingInput = styled.div`
    position: absolute;
    bottom: 0;
    background: white;
    width: 24vw;
    height: 10vh;
`;

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
                    <ArrowBox other>표석훈인가요?</ArrowBox>
                    <ArrowBox>넵 맞아요^^ 쿠쿠 너무 싫어</ArrowBox>
                </ChattingMain>
                <ChattingInput>

                </ChattingInput>
            </ChattingForm>
        </Modal>
    );
};

export default Chatting;