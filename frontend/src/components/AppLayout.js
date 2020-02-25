import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import Hedaer from "./main/Header";
import Footer from "./main/Footer";
import styled from "styled-components";
import {maintainLoginAction} from '../reducers/user';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(maintainLoginAction());
    }
  }, []);
  return (
    <>
      <Hedaer />
      <AllDiv>
        <ChildrenDiv>{children}</ChildrenDiv>
        <Footer />
      </AllDiv>
    </>
  );
};

const AllDiv = styled.div`
  position: relative;
  min-height : 100vh;
`;
const ChildrenDiv = styled.div`
  margin-top: 40px;
  padding-bottom : 2.5rem;
`;

export default AppLayout;
