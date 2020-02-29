import React from 'react';
import {Icon, Avatar, Button} from 'antd';
import {ArrowBox, ChattingForm, ChattingInput, ChattingMain, ChattingTop,Modal} from './Chatting.style';

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

export default Chatting;