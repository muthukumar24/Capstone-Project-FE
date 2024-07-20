import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseMessage = await forgotPassword(formData.email);
      toast.success(responseMessage);
    } catch (err) {
      toast.error("Failed to send reset email.");
    }
  };

  return (
    <div className="container-fluid py-5 forgot-password-main-container">
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="container py-5" id="forgot-password-form">
              <div className="row justify-content-center">
                <div className="col-sm-10 col-md-8 col-lg-8 col-xl-8">
                  <p className="text-center h6 mb-1">
                    Enter your email address and we'll send you an email with
                    instructions to reset your password.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control mt-3 py-2 email-input"
                        placeholder="Enter your email..."
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center gap-4">
                      <button
                        className="btn btn-primary mt-3 px-3 reset-button"
                        type="submit"
                      >
                        Send
                      </button>
                      <Link to="/login">
                        <button className="btn btn-secondary mt-3 px-3 login-btn">
                          Login
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
