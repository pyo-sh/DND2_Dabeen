import React from "react";
import SignUp from './signUp/SignUp';
import RegistSupplier from './signUp/RegistSupplier';
import MenuBar from './main/MenuBar';
import Main from './main/Main';
import MainBottom from "./main/MainBottom";
import PostMain from "./posts/PostMain";

const AppLayout = ({ children }) => {
  return (
      <div>
        {/* <SignUp></SignUp> */}
        {/* <MenuBar />
        <Main />
        <MainBottom /> */}
        <PostMain />
        {children}
      </div>
  );
};

export default AppLayout;
