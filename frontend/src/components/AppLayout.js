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
    <style jsx global>{`
            html,
            body {
              height: 100%;
              overflow: auto;
            }
            body {
              font-family: "Noto Sans KR", sans-serif;
            }
            #__next {
              height: 100%;
            }
          `}</style>
      <Hedaer />
      <AllDiv>
        <div className="childrenWrapper">{children}</div>
        <Footer />
      </AllDiv>
    </>
  );
};

const AllDiv = styled.div`
  height : 100%;
  display : flex;
  flex-direction : column;
  & .childrenWrapper {
    margin-top : 10vh;
  }
`;

export default AppLayout;
