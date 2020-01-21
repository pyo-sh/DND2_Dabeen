import React from "react";
import SignUp from './signUp/SignUp';
import RegistSupplier from './signUp/RegistSupplier';
import MenuBar from './main/MenuBar';
import Main from './main/Main';

const AppLayout = ({ children }) => {
  return (
      <div>
        {/* <SignUp></SignUp> */}
        <MenuBar />
        <Main />
        {children}
      </div>
  );
};

export default AppLayout;
