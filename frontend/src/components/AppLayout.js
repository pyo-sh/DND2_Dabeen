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
        {children}
        <Footer />
      </AllDiv>
    </>
  );
};

const AllDiv = styled.div`
  height : 100%;
  display : flex;
  flex-direction : column;
`;

export default AppLayout;
