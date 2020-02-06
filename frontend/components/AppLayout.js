import React from "react";
import MenuBar from "./main/MenuBar";
import MainBottom from "./main/MainBottom";

const AppLayout = ({ children }) => {
  return (
    <>
      <MenuBar />
      {children}
      <MainBottom />
    </>
  );
};

export default AppLayout;
