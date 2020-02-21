import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./main/Header";
import Footer from "./main/Footer";
import styled from "styled-components";
import { maintainLoginAction, loginSuccessAction } from "../reducers/user";


const AppLayout = ({ children, asPath }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      dispatch(loginSuccessAction({token, loginMaintain : true}));
    }
  }, []);
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
  height: 100%;
  display: flex;
  flex-direction: column;
  & .childrenWrapper {
    margin-top: 12vh;
  }
`;

export default AppLayout;
