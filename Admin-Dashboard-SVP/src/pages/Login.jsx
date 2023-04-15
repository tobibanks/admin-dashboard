import React, { useEffect, useRef } from "react";
import login from "./General.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Image, Form, Button, Spinner } from "react-bootstrap";
import { EMAIL_VALIDATION } from "@/constants/Regex";
import { adminLogin } from "../features/auth/authActions";
import { useSelector, useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const { loading, adminInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (adminInfo) {
      navigate("/dashboard");
    }
  }, [navigate, adminInfo]);

  const submitForm = (data) => {
    dispatch(adminLogin(data));
  };

  const password = watch("password");
  return (
    <div className={login.container2}>
      <div className={login.logincenteredcontainer}>
        <div className={login.absolutecenter}>
          <Image
            src="/images/svp.png"
            alt="main-icon"
            className={login.logoicon}
          />
        </div>
        <div className={login.formcontainer}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                {...register("email", EMAIL_VALIDATION)}
              />
              <div className={login.errorcontainer}>
                {errors.email && errors.email.type === "required" && (
                  <span className={login.error}>This field is required</span>
                )}
                {errors.email && errors.email.type === "maxLength" && (
                  <span className={login.error}>Max length exceeded</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className={login.error}>Email is Invalid</span>
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
                    message:
                      "Password should be at least 8 characters, At least 1 uppercase character, 1 lowercase character and 1 number",
                  },
                })}
                name="password"
                type="password"
                placeholder=""
              />
              <div className={login.errorcontainer}>
                {errors.password && errors.password.type === "required" && (
                  <span className={login.error}>This field is required</span>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                  <span className={login.error}>Max length exceeded</span>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <span className={login.error}>
                    {" "}
                    Password should be at least 8 characters, At least 1
                    uppercase character, 1 lowercase character and 1 number,
                  </span>
                )}
              </div>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder=""
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              <div className={login.errorcontainer}>
                {errors.confirmPassword && (
                  <span className={login.error}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </Form.Group>
            {errors.password_repeat && errors.password_repeat?.message}
            {console.log(errors.password_repeat?.message)} */}
            {/* {console.log(errors.password_repeat.message)} */}
            {/* <Spinner /> */}
            <Button
              type="submit"
              disabled={loading}
              className={login.submitbutton}
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
          </form>
          {/* <p className={login.text}>
            First time here?
            <Link className={login.route} to="/register">
              Sign Up
            </Link>
          </p> */}
          <Toaster
            position="top-left"
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
