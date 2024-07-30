import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setLoading(true);
    try {
      await register(values);
      alert("User created successfully.");
      setStatus({ success: "User created successfully." });
    } catch (err) {
      alert("An error occurred during registration.");
      setStatus({ error: err.message || "An error occurred" });
    }
    setSubmitting(false);
    setLoading(false);
  };

  return (
    <div className="container-fluid register-main-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
            <div className="container py-5" id="register-form">
              <div className="row justify-content-center">
                <div className="col-sm-10 col-md-10 col-lg-9 col-xl-10">
                  <h3 className="text-center mb-3">
                    ProGoods Inventory Management
                  </h3>
                  <h1 className="text-center">
                    <i className="bi bi-person-fill-add"></i>
                  </h1>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, status }) => (
                      <Form>
                        <div className="form-group">
                          <label className="mb-2">First Name</label>
                          <Field
                            type="text"
                            name="firstName"
                            className="form-control fname-input"
                            placeholder="Enter first name"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label className="mt-2 mb-2">Last Name</label>
                          <Field
                            type="text"
                            name="lastName"
                            className="form-control lname-input"
                            placeholder="Enter last name"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label className="mt-2 mb-2">Email</label>
                          <Field
                            type="email"
                            name="email"
                            className="form-control email-input"
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
                            className="form-control password-input"
                            placeholder="Enter password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="px-4 py-2 mt-4 signup-btn"
                            type="submit"
                            disabled={isSubmitting}
                            style={{ minWidth: "110px", minHeight: "40px" }}
                          >
                            {loading ? (
                              <div className="d-flex justify-content-center align-items-center">
                                <ClipLoader size={20} color={"#fff"} />
                              </div>
                            ) : (
                              "SignUp"
                            )}
                          </button>
                        </div>

                        <div className="mt-3">
                          <p className="text-center">
                            Already have an account?{" "}
                            <Link to={"/login"}>Login</Link>
                          </p>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
