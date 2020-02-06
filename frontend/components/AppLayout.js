import React from "react";
import Hedaer from "./main/Header";
import Footer from "./main/Footer";
import styled from "styled-components";

const AllDiv = styled.div`
  display: flex;
  flex-direction : column;
  justify-content : space-between;
`;
const ChildrenDiv = styled.div`
  height: 100vh;
  margin-top: 40px;
`;
const AppLayout = ({ children }) => {
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

export default AppLayout;
