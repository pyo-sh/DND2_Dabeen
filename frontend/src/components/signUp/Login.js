import React, {useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Button, Form } from 'antd';
import {useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import Router from 'next/router';
import Link from 'next/link';
import inputChangeHook from '../../hooks/inputChangeHook';

const Login = ({clickLogin}) => {
    const dispatch = useDispatch();
    const { isLoggingIn, isLoginSuccess } = useSelector(state => state.user);
    const [id, onChangeId] = inputChangeHook('');
    const [password, onChangePassword] = inputChangeHook('');
    const [loginMaintain, setLoginMaintain] = useState(false);

    const onClickMaintain = useCallback((e) => {
        setLoginMaintain(prev => !prev);
    }, []);
    const submitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(loginRequestAction({id, password, loginMaintain}));
        clickLogin();
    },[id, password, loginMaintain]);

    useEffect(() => {
        if(isLoginSuccess){
            Router.push('/');
        }
    }, [isLoginSuccess]);
    return (
            <Modal>
                <Form onSubmit={submitForm}>
                <Content>
                    <div className="loginHeader">
                        <img className="dabainLogo" src="/images/logo.svg" alt="다빈로고"/>
                        <Icon className ="closeIcon" type="close" size="large" onClick={clickLogin}/>
                    </div>
                    <div className="loginForm">
                        <InputUser onChange={onChangeId} value ={id} placeholder="아이디"/>
                        <InputUser type="password" onChange={onChangePassword} value={password} placeholder="비밀번호"/> 
                        <div className = "loginKeeping">
                            <div>
                            <Icon type="check-circle" onClick ={onClickMaintain} style = {{fontSize: '16px', color : loginMaintain ? "green" : "gray"}}/> 로그인 상태 유지
                            </div>
                            <div className="confirmIDPasswordText">아이디와 비밀번호를 확인해 주세요</div>
                        </div>
                    </div>
                    <LoginButton htmlType="submit" loading={isLoggingIn}>로그인</LoginButton>
                    <ContentBottom>
                        <div><Link href="/signup"><a>회원가입</a></Link></div>
                        <div className="idAndPasswordFind">
                            <div><Link href="/findid"><a>아이디 찾기</a></Link> </div>
                            &nbsp; |  &nbsp;
                            <div><Link href="/findpassword"><a>비밀번호 찾기</a></Link></div>
                        </div>
                    </ContentBottom>
                </Content>
                </Form>
            </Modal>
    );
};

const Modal = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index : 2;
    & form {
        z-index : 99;
    }
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

    & .loginHeader {
        display: flex;
        width: 100%;
        height : 40%;
        padding : 0 0 20px 20px;
        & .dabainLogo {
            width : 80%;
            margin : auto;
        }
        & .closeIcon {
        font-size: 20px;
        margin-left: auto;
        margin-bottom : auto;
    }
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
        align-items : center;
        width : 100%;
    }

    & .loginKeeping {
        display: flex;
        justify-content: space-around; 
        width: 100%;
        margin-bottom: 20px;
    }

    & .confirmIDPasswordText {
        font-size: 14px;
        color: #FF4300; 
    }
`;

const InputUser = styled.input`
    border: none;
    border-bottom: 1px solid #BFC7CE;
    width: 65%;
    margin-bottom: 2vh;
    font-size: 17.5px;

    :hover{
        border-bottom: 2px solid #FF4300;
    }

    /* @media only screen and (max-width: 1440px){
        width: 22vw;    
    }

    @media only screen and (max-width: 1024px){
        width: 30vw;    
    }

    @media only screen and (max-width: 425px){
        width: 40vw;    
    } */
`;
   
const LoginButton = styled(Button)`
    margin-bottom: 20px;
    width: 50%;
    height: 50px;
    margin-top: 20px;
    background: #FF4300;
    border: #FF4300;
    color: white;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;
    
    /* @media only screen and (max-width: 1440px){
        width: 22vw;    
    }

    @media only screen and (max-width: 1024px){
        width: 30vw;    
    }

    @media only screen and (max-width: 425px){
        width: 40vw;    
    } */

    :hover {
        opacity: 0.9;
        background: #FF4300;
        border: #FF4300;
        color: white;
    }
`;

const ContentBottom = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    & a {
        color : black;
        & :hover {
            color : #ff4300;
        }
    }
    & > .idAndPasswordFind{
        display: flex;
    }
`;

export default Login;