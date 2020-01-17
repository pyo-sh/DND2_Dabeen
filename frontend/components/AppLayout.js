import React from "react";
import SignUp from './signUp/SignUp';
import RegistSupplier from './signUp/RegistSupplier';

const AppLayout = ({ children }) => {
  return (
      <div>
        {/* <SignUp></SignUp> */}
        <RegistSupplier></RegistSupplier>
        {children}
      </div>
  );
};

export default AppLayout;
