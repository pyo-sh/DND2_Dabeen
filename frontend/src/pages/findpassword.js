import React, { useCallback, useEffect } from 'react';
import { FormDiv, Content, InputUser, LoginButton, ContentBottom } from '../pagesStyles/findpassword.style';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import inputChangeHook from '../hooks/inputChangeHook';
// import { loginRequestAction } from '../reducers/user';

const FindPassword = () => {
  const { isLoggingIn, isLoginSuccess } = useSelector(state => state.user);
  const [id, onChangeId] = inputChangeHook('');
  const [email, onChangeEmail] = inputChangeHook('');

  const submitForm = useCallback(
    async e => {
      e.preventDefault();
      const reqData = {
        data: {
          user_id: id,
          email
        }
      };
      await axios.post('http://15.164.2.26:3307/api/user/find-pwd', reqData);
      alert('이메일을 확인해주세요!');
      Router.push('/login');
    },
    [id, email]
  );

  useEffect(() => {
    if (isLoginSuccess) {
      Router.push('/');
    }
  }, [isLoginSuccess]);
  
  return (
    <FormDiv onSubmit={submitForm}>
        <Content>
          <img src="/images/logo.svg" alt="dabeen logo"/>
          <div className='loginForm'>
            <InputUser onChange={onChangeId} value={id} placeholder='아이디' />
            <InputUser
              onChange={onChangeEmail}
              type='email'
              value={email}
              placeholder='이메일'
            />
          </div>
          <LoginButton htmlType='submit' loading={isLoggingIn}>
            비밀번호 찾기
          </LoginButton>
          <ContentBottom>
            <div>
              <Link href='/signup'>
                <a>회원가입</a>
              </Link>
            </div>
            <div>
              <Link href='/login'>
                <a>로그인</a>
              </Link>
            </div>
            <div className='idAndPasswordFind'>
              <div>
                <Link href='/findid'>
                  <a>아이디 찾기</a>
                </Link>{' '}
              </div>
            </div>
          </ContentBottom>
        </Content>
    </FormDiv>
  );
};

export default FindPassword;
