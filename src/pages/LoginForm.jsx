import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await login(values);
      setStatus({ success: "Login successful" });
      navigate("/dashboard");
    } catch (err) {
      setStatus({ error: err.response?.data?.message || "An error occurred" });
    }
    setSubmitting(false);
  };

  return (
    <div className="container-fluid h-100 login-main-container">
      <div className="container py-5" >
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
            <div className="container py-5" id="login-form">
              <div className="row justify-content-center">
                <div className="col-sm-10 col-md-10 col-lg-9 col-xl-10">
                  <h3 className="text-center mb-3">
                    ProGoods Inventory Management
                  </h3>
                  <h1 className="text-center">
                    <i className="bi bi-person-circle"></i>
                  </h1>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, status }) => (
                      <Form>
                        {status && status.success && (
                          <div className="alert alert-success">
                            {status.success}
                          </div>
                        )}
                        {status && status.error && (
                          <div className="alert alert-danger">
                            {status.error}
                          </div>
                        )}
                        <div className="form-group">
                          <label className="mb-2">Email</label>
                          <Field
                            type="email"
                            name="email"
                            className="form-control email-input py-2"
                            placeholder="Enter email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="form-group">
                          <label className="mt-2 mb-2">Password</label>
                          <Field
                            type="password"
                            name="password"
                            className="form-control password-input py-2"
                            placeholder="Enter password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="d-flex justify-content-start">
                          <button
                            type="button"
                            className="btn btn-link p-0 mt-2"
                            onClick={() => navigate("/forgot-password")}
                            style={{ textDecoration: "none" }}
                          >
                            Forgot Password
                          </button>
                        </div>
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="mt-3 px-4 py-2 login-btn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Login
                          </button>
                        </div>
                        <div className="mt-3">
                          <p className="text-center">
                            Don't have an account?{" "}
                            <Link to={"/register"}>Signup</Link>
                          </p>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <p className="text-center mt-3">Or</p>
                  <p className="text-center">Login With</p>
                  <div className="d-flex justify-content-center gap-3">
                    <button className="px-3 py-2 login-btn">
                      <i className="bi bi-google"></i>
                    </button>
                    <button className="px-3 py-2 login-btn">
                      <i className="bi bi-facebook"></i>
                    </button>
                    <button className="px-3 py-2 login-btn">
                      <i className="bi bi-twitter-x"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
