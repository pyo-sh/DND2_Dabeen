import React from 'react';
import styled from 'styled-components';
import { Icon, Button, Input } from 'antd';

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
`;

const Content = styled.div`
    background: white;
    padding: 1rem;
    width: 350px;
    height: auto;
    color: gray;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > .loginName {
        font-size: 40px;
        text-align: center;
        margin-bottom: 10px;
    }

    & .textInput {
        width: 250px;
        margin-right: 10px;
    }

    & .deleteIcon {
        text-align: right;
    }

    & > .id {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    & > .password {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
    }

    & > .loginKeeping {
        margin-right: 155px;
    }
`;

const LoginButton = styled.div`
    margin-bottom: 20px;

    & > .loginButton {
        width: 270px;
        margin-top: 20px;
    }

    & > .confirmIDPasswordText {
        text-align: center;
        font-size: 12px;
        color: red; 
    }
`;

const ContentBottom = styled.div`
    display: flex;

    & > .signUp {
        margin-right: 140px;
    }
`;

const Login = () => {
    return (
        <>
            <Modal>
                <Content>
                    <div className="loginName">Welcome</div>
                    <div className ="id">
                        <Input placeholder="아이디" className = "textInput"/><Icon type="close-circle" theme="twoTone" twoToneColor="gray" className = "deleteIcon" style={{fontSize: '25px'}}/>
                    </div>
                    <div className = "password">
                        <Input placeholder="비밀번호" className = "textInput"/><Icon type="close-circle" theme="twoTone" twoToneColor="gray" className = "deleteIcon" style={{fontSize: '25px'}}/>
                    </div>
                    <div className = "loginKeeping">
                        <Icon type="check-circle" style = {{fontSize: '20px'}}/> 로그인 상태 유지
                    </div>
                    <LoginButton>
                        <Button size="large" className = "loginButton">로그인</Button>
                        <div className="confirmIDPasswordText">아이디와 비밀번호를 확인해 주세요</div>
                    </LoginButton>
                    <ContentBottom>
                        <div className="signUp">회원가입</div>
                        <div>아이디  </div> |
                        <div>  비밀번호</div>
                    </ContentBottom>
                </Content>
            </Modal>
        </>
    );
};

export default Login;