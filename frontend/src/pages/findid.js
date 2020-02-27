import React, { useCallback, useEffect } from 'react';
import { FormDiv, Content, InputUser, LoginButton, ContentBottom } from '../pagesStyles/findid.style';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import inputChangeHook from '../hooks/inputChangeHook';

const FindId = () => {
  const { isLoginSuccess } = useSelector(state => state.user);
  const [name, onChangeName] = inputChangeHook('');
  const [email, onChangeEmail] = inputChangeHook('');

  const submitForm = useCallback(
    async e => {
      e.preventDefault();
      const reqData = {
        data: {
          name,
          email
        }
      };
      await axios.post('/user/find-id', reqData);
      alert('이메일을 확인해주세요!');
      Router.push('/login');
    },
    [name, email]
  );

  useEffect(() => {
    if (isLoginSuccess) {
      Router.push('/');
    }
  }, [isLoginSuccess]);

  return (
    <FormDiv onSubmit={submitForm}>
      <Content>
        <img src='/images/logo.svg' alt='dabeen logo' />
        <div className='loginForm'>
          <InputUser onChange={onChangeName} value={name} placeholder='이름' />
          <InputUser
            onChange={onChangeEmail}
            type='email'
            value={email}
            placeholder='이메일'
          />
        </div>
        <LoginButton htmlType='submit'>아이디 찾기</LoginButton>
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
              <Link href='/findpassword'>
                <a>비밀번호 찾기</a>
              </Link>
            </div>
          </div>
        </ContentBottom>
      </Content>
    </FormDiv>
  );
};

export default FindId;
