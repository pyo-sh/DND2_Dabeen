import React from "react";
import SignUp from './signUp/SignUp';

const AppLayout = ({ children }) => {
  return (
      <div>
        <SignUp></SignUp>
        {children}
      </div>
  );
};

export default AppLayout;
