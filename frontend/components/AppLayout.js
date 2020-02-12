import React from "react";
import Hedaer from "./main/Header";
import Footer from "./main/Footer";
import styled from "styled-components";

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

const AllDiv = styled.div`
  position: relative;
  min-height : 100vh;
`;
const ChildrenDiv = styled.div`
  margin-top: 40px;
  padding-bottom : 2.5rem;
`;

export default AppLayout;
