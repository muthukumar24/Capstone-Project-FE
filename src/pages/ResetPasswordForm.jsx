import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useContext(AuthContext);
  const [formData, setFormData] = useState({ password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseMessage = await resetPassword(token, formData.password);
      alert(responseMessage);
      setTimeout(() => {
        window.close();
      }, 3000);
    } catch (err) {
      alert("Failed to reset password.");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="container py-5" id="register-form">
              <div className="row justify-content-center">
                <div className="col-sm-10 col-md-8 col-lg-8 col-xl-8">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="mb-2">New Password</label>
                      <input
                        type="password"
                        className="form-control py-2 reset-password-input"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                       <button className="reset-button mt-4 px-4 py-2" type="submit"style={{ minWidth: "100px"}}
                        >
                          {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <ClipLoader size={20} color={"#fff"} />
                            </div>
                          ) : (
                            "Reset Password"
                          )}
                          </button>
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

export default ResetPassword;
