import React, { useRef, useState } from "react";
import "./signin.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Field, Form, Formik } from "formik";
import ValidateNationalId from "../Validation/ValidationNationalId";
import axios from "../../config/axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import useAuth from "../../hooks/useAuth";
import { handleTokenExipration } from "../../Utils/RefreshToken";
import jwtDecode from "jwt-decode";
const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { isValid } = useAuth();
  const captcha = useRef();

  if (isValid) {
    return <Navigate to={"/"} replace />;
  }
  // API
  const loginOnSubmit = async (values) => {
    const url = "login";
    setIsLoading(true);
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    var jsonObject = {
      username: values.code,
      password: values.password,
    };

    const { status, data } = await axios.post(
      url,
      JSON.stringify(jsonObject),
      customConfig
    );
    if (status < 300) {
      setIsLoading(false);
      if (data.hasOwnProperty("token")) {
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("Token", JSON.stringify(data));
        const { exp } = jwtDecode(data.token);

        handleTokenExipration({ exp });
        /// ---------------------------------------
        navigate("/");
      } else {
        console.log(data.data); // msg: username and password not valid
      }
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!ValidateNationalId(values.code) || values.code === "123456789") {
      errors.code = "لطفا کد ملی ده رقمی خود را وارد نمایید";
    }
    if (!values.password) {
      errors.password = "رمزعبور اشتباه است";
    }
    return errors;
  };

  const onChange = () => {
    console.log(captcha);
  };

  return (
    <>
      <Navbar />
      {/* {token ? (
        <Navigate replace to="/" />
      ) : ( */}
      <Formik
        const
        initialValues={{
          code: "",
          password: "",
        }}
        onSubmit={loginOnSubmit}
        validate={validate}
      >
        {({ errors, touched }) => (
          <Form className="auth-wrapper">
            <div className="auth-inner ">
              <h2>ورود به سامانه</h2>
              <div className="mb-3 ">
                <label htmlFor="code">نام کاربری</label>
                <Field
                  name="code"
                  type="text"
                  className="form-control"
                  placeholder="کد ملی خود را وارد کنید"
                />
                {touched.code || errors.code ? (
                  <div className="error">{errors.code}</div>
                ) : null}
              </div>
              <div className="mb-2 ">
                <label htmlFor="password">رمز عبور</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                {touched.password || errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <p className="forgot-password text-right">
                <a href="#">رمز خود را فراموش کرده ام؟</a>
              </p>
              <div className="mb-3 ">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    مرا بخاطر داشته باش
                  </label>
                </div>
              </div>
              <div>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LcsH7IhAAAAAPFEDAOkCo6gfizp7GQdNfXsg8sd"
                  onChange={onChange}
                  style={{ justifyContent: "center" }}
                  className="captcha"
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success mt-3">
                  {isLoading ? loadingSvg : "ورود"}
                </button>
              </div>
              <p className="sign-up text-center mt-3">
                <a className="sign-up" href="/sign-up">
                  {" "}
                  ثبت نام
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      {/* )} */}
    </>
  );
};

export default Signin;
const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
