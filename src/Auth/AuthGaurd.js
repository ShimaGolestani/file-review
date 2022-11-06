import React from "react";
import { Navigate } from "react-router-dom";
import { Token } from "../Constants/LocalStorageConstants";
import useAuth from "../hooks/useAuth";

const AuthGaurd = ({ children }) => {
  const { isValid, TokenValidator } = useAuth();

  if (!isValid) {
    const token = localStorage.getItem(Token);
    const validate = TokenValidator(token);
    if (!validate) {
      return <Navigate to={"sign-in"} replace />;
    } else {
      return <Navigate to={"/"} replace />;
    }
  }
  return <>{children}</>;
};

export default AuthGaurd;
