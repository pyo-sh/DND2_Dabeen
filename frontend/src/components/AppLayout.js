import React, { useEffect } from "react";
import Header from "./main/Header";
import Footer from "./main/Footer";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import Router from 'next/router';


const AppLayout = ({ children, asPath }) => {
  const { loginSuccess, loginError } = useSelector(state => state.user);

  useEffect(() => {
    if(loginSuccess) {
      Router.push('/');
    }
  }, [loginSuccess]);

  useEffect(() => {
    if(loginError) {
      alert(loginError);
    }
  }, [loginError]);
  return (
    <>
      <Header asPath={asPath} />
      <AllDiv>
        <div className="childrenWrapper">{children}</div>
        <Footer />
      </AllDiv>
    </>
  );
};
const AllDiv = styled.div`
  display: flex;
  flex-direction: column;
  & .childrenWrapper {
    margin-top: 11vh;
    min-height: 80vh;
  }
`;

export default AppLayout;
