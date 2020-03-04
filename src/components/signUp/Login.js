import React, {useState, useCallback, useEffect } from 'react';
import { Icon, Form } from 'antd';
import {useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import Router from 'next/router';
import Link from 'next/link';
import inputChangeHook from '../../hooks/inputChangeHook';
import {Modal, Content, InputUser, LoginButton, ContentBottom} from './Login.style';

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
    const closeLoginModal = useCallback(() => {
        clickLogin(prev => !prev);
    }, []);
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
                        <div><Link href="/signup"><a onClick={closeLoginModal}>회원가입</a></Link></div>
                        <div className="idAndPasswordFind">
                            <div><Link href="/findid"><a onClick={closeLoginModal}>아이디 찾기</a></Link> </div>
                            &nbsp; |  &nbsp;
                            <div><Link href="/findpassword"><a onClick={closeLoginModal}>비밀번호 찾기</a></Link></div>
                        </div>
                    </ContentBottom>
                </Content>
                </Form>
            </Modal>
    );
};

export default Login;