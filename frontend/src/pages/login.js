import React, {useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Button, Form } from 'antd';
import {useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import Router from 'next/router';

const LoginMain = () => {
    const dispatch = useDispatch();
    const { isLoggingIn, isLoginSuccess } = useSelector(state => state.user);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const submitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(loginRequestAction({id, password}));
    },[id, password]);

    useEffect(() => {
        if(isLoginSuccess){
            Router.push('/');
        }
    }, [isLoginSuccess]);
    return (
        <>
            <Modal>
                <Form onSubmit={submitForm}>
                <Content>
                    <div className="loginName">로고 넣음</div>
                    <div className="loginForm">
                        <InputUser onChange={onChangeId} value ={id} placeholder="아이디"/>
                        <InputUser onChange={onChangePassword} value={password} placeholder="비밀번호"/> 
                        <div className = "loginKeeping">
                            <div>
                            <Icon type="check-circle" style = {{fontSize: '16px'}}/> 로그인 상태 유지
                            </div>
                            <div className="confirmIDPasswordText">아이디와 비밀번호를 확인해 주세요</div>
                        </div>
                    </div>
                    <LoginButton htmlType="submit" loading={isLoggingIn}>로그인</LoginButton>
                    <ContentBottom>
                        <div>회원가입</div>
                        <div className="idAndPasswordFind">
                            <div>아이디 찾기</div> |
                            <div>비밀번호 찾기</div>
                        </div>
                    </ContentBottom>
                </Content>
                </Form>
            </Modal>
        </>
    );
};

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
    width: 420px;
    height: 430px;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 425px){
        width: 320px;
        height: 330px;
    }

    & > .loginName {
        font-size: 40px;
        text-align: center;
        margin-bottom: 10px;
    }

    & > .loginForm {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    & .loginKeeping {
        display: flex;
        justify-content: space-between; 
        width: 100%;
        margin-bottom: 20px;
        
        @media only screen and (max-width: 768px){
            display: flex;
            flex-direction: column;    
            justify-content: space-around;
        }
    }

    & .confirmIDPasswordText {
        font-size: 14px;
        color: #FF4300; 
    }
`;

const InputUser = styled.input`
    border: none;
    border-bottom: 1px solid #BFC7CE;
    width: 15vw;
    margin-bottom: 2vh;
    font-size: 17.5px;

    :hover{
        border-bottom: 2px solid #FF4300;
    }

    @media only screen and (max-width: 1440px){
        width: 22vw;    
    }

    @media only screen and (max-width: 1024px){
        width: 30vw;    
    }

    @media only screen and (max-width: 425px){
        width: 40vw;    
    }
`;
   
const LoginButton = styled(Button)`
    margin-bottom: 20px;
    width: 15vw;
    height: 50px;
    margin-top: 20px;
    background: #FF4300;
    border: #FF4300;
    color: white;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;
    
    @media only screen and (max-width: 1440px){
        width: 22vw;    
    }

    @media only screen and (max-width: 1024px){
        width: 30vw;    
    }

    @media only screen and (max-width: 425px){
        width: 40vw;    
    }

    :hover {
        opacity: 0.9;
        background: #FF4300;
        border: #FF4300;
        color: white;
    }
`;

const ContentBottom = styled.div`
    display: flex;
    justify-content: space-between;
    width: 15vw;

    & > .idAndPasswordFind{
        display: flex;
    }
`;

export default LoginMain;