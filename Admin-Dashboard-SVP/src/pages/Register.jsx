import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { Container, Image, Form, Button, Spinner } from "react-bootstrap";
import "./form.css";
import registerform from "./General.module.css";
import { EMAIL_VALIDATION } from "@/constants/regex";
import { registerAdmin } from "../features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [type, setType] = useState("");
  const { loading, adminInfo, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});
  const navigate = useNavigate();

  useEffect(() => {
    if (success) Navigate("/");
  }, [navigate, adminInfo, success]);

  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(registerAdmin(data));
  };

  return (
    <Container className={registerform.container1}>
      <div className={registerform.flexcontainer}>
        <div className={registerform.figurecontainer}>
          <Image src="/icons/login-illustration.svg" alt="icons" />
        </div>
        <div className={registerform.rightcontainer}>
          <div className={registerform.logincenteredcontainer1}>
            <div className={registerform.absolutecenter}>
              <Image
                src="/images/svp.png"
                alt="main-icon"
                className={registerform.logoicon}
              />
            </div>
            <div className={registerform.formcontainer}>
              <form onSubmit={handleSubmit(submitForm)}>
                {/* {error && <Error>{error}</Error>}
                {customError && <Error>{customError}</Error>} */}
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label className={registerform.formlabel}>
                    FirstName
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="firstname"
                    placeholder=""
                    {...register("firstname", {
                      required: "Name is required",
                      maxLength: { value: 50, message: "Name is too long" },
                    })}
                  />
                  <div className={registerform.errorcontainer}>
                    {errors.firstname &&
                      errors.firstname.type === "required" && (
                        <span className={registerform.error}>
                          This field is required
                        </span>
                      )}
                    {errors.firstname &&
                      errors.firstname.type === "maxLength" && (
                        <span className={registerform.error}>
                          Max length exceeded
                        </span>
                      )}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label className={registerform.formlabel}>
                    LastName
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...register("lastname", {
                      required: "Name is required",
                      maxLength: { value: 50, message: "Name is too long" },
                    })}
                    // required
                  />
                  <div className={registerform.errorcontainer}>
                    {errors.lastname && errors.lastname.type === "required" && (
                      <span className={registerform.error}>
                        This field is required
                      </span>
                    )}
                    {errors.lastname &&
                      errors.lastname.type === "maxLength" && (
                        <span className={registerform.error}>
                          Max length exceeded
                        </span>
                      )}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRole">
                  <Form.Label className={registerform.formlabel}>
                    Role
                  </Form.Label>
                  <Form.Select
                    as="select"
                    value={type}
                    {...register("role")}
                    required
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    size="md"
                  >
                    <option>User</option>
                    <option>Product Manager</option>
                    <option>Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className={registerform.formlabel}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    // required
                    {...register("email", EMAIL_VALIDATION)}
                  />
                  <div className={registerform.errorcontainer}>
                    {errors.email && errors.email.type === "required" && (
                      <span className={registerform.error}>
                        This field is required
                      </span>
                    )}
                    {errors.email && errors.email.type === "maxLength" && (
                      <span className={registerform.error}>
                        Max length exceeded
                      </span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className={registerform.error}>
                        Email is Invalid
                      </span>
                    )}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className={registerform.formlabel}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    // required
                    placeholder=""
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
                        message:
                          "Password should be at least 8 characters, At least 1 uppercase character, 1 lowercase character and 1 number",
                      },
                    })}
                  />
                  <div className={registerform.errorcontainer}>
                    {errors.password && errors.password.type === "required" && (
                      <span className={registerform.error}>
                        This field is required
                      </span>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <span className={registerform.error}>
                        Password is invalid
                      </span>
                    )}
                  </div>
                </Form.Group>
                <Button type="submit" className={registerform.submitbutton1}>
                  {loading ? <Spinner /> : "Register"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
