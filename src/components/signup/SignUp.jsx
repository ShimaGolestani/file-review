import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form, Field } from "formik";
import ValidateNationalId from "../Validation/ValidationNationalId";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";

const Signup = () => {
  const token = localStorage.getItem("accessToken");

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "نام  خود را وارد کنید";
    } else if (!/^[\u0600-\u06FF\s]+$/i.test(values.name)) {
      errors.name = "لطفا از کیبورد فارسی استفاده نمایید";
    }

    if (!values.lastname) {
      errors.lastname = "نام خانوادگی خود را وارد کنید";
    } else if (!/^[\u0600-\u06FF\s]+$/i.test(values.name)) {
      errors.lastname = "لطفا از کیبورد فارسی استفاده نمایید";
    }
    if (!ValidateNationalId(values.code) || values.code === "123456789") {
      errors.code = "لطفا کد ملی ده رقمی خود را وارد نمایید";
    }
    if (!values.email) {
      errors.email = "ایمیل خود را وارد نمایید";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "فرمت ایمیل صحیح نمیباشد";
    }
    if (!values.password) {
      errors.password = "رمزعبور اشتباه است";
    }
    return errors;
  };

  const registerOnSubmit = (values) => {
    const url = "api/v1/user/register";
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    var jsonObject = {
      username: values.code,
      firstName: values.name,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
    };

    axios
      .post(url, JSON.stringify(jsonObject), customConfig)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const captcha = useRef();

  const onChange = () => {
    console.log(captcha);
  };

  return (
    <>
      <Navbar />
      {/* {
      token ?
      <Navigate replace to="/" />
      : */}
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          code: "",
          email: "",
          password: "",
        }}
        onSubmit={registerOnSubmit}
        validate={validate}
      >
        {({ errors, touched }) => (
          <Form className="auth-wrapper">
            <div className="auth-inner">
              <h2>ثبت نام</h2>

              <div className="mb-3">
                <label>نام </label>
                <Field
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="نام خود را وارد کنید"
                />
                {touched.name || errors.name ? (
                  <div className="error">{errors.name}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label> نام خانوادگی</label>
                <Field
                  name="lastname"
                  type="text"
                  className="form-control"
                  placeholder=" نام خانوادگی خود را وارد کنید"
                />
                {touched.lastname || errors.lastname ? (
                  <div className="error">{errors.lastname}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label> کد ملی</label>
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
              <div className="mb-3">
                <label>آدرس ایمیل</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="ایمیل خود را وارد کنید"
                />
                {touched.email || errors.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label>رمز عبور</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="رمز خود را وارد کنید"
                />
                {touched.password || errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <ReCAPTCHA
                ref={captcha}
                sitekey="6LcsH7IhAAAAAPFEDAOkCo6gfizp7GQdNfXsg8sd"
                onChange={onChange}
                style={{ justifyContent: "center" }}
                className="captcha"
              />

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  ثبت نام
                </button>
              </div>

              <p className="forgot-password text-center">
                <a href="/sign-in">عضو هستم!</a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      {/* } */}
    </>
  );
};

export default Signup;
