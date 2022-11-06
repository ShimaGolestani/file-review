import "../../App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useRoutes,
} from "react-router-dom";
import Signup from "../signup/SignUp";
import Signin from "../signin/Signin";
import Home from "../../pages/Home";
import { AuthProvider } from "../../context/JWTContext";
import { lazy, Suspense } from "react";
import AuthGaurd from "../../Auth/AuthGaurd";

function Loginapp() {
  return useRoutes([
    { path: "/sign-in", element: <Signin /> },
    {
      path: "/sign-up",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: (
            <AuthGaurd>
              <Home />
            </AuthGaurd>
          ),
          index: true,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);
}

export default Loginapp;
