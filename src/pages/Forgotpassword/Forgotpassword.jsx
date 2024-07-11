import React, { useState } from "react";
import "./Forgotpassword.css";
import image1 from "../../assets/1.png";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/Input/Password";
import { Link ,useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleforgot = async(e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
    }
    if (!newPassword) {
        setError("Please enter your password");
        return;
    }
    if (!confirmpassword) {
        setError("Please confirm your password");
        return;
    }
    if (newPassword !== confirmpassword) {
        setError("Passwords do not match");
        return;
    }

    setError("");

        // Forget Password API call
        try {
            const response = await axiosInstance.post("/reset-password", {
                email: email,
                newPassword: newPassword,
                confirmPassword: confirmpassword,
            });

            if (response.data ) {
                navigate("/");
            } else {
                setError(response.data.message || "Password reset failed");
            }
        } catch (err) {
            setError("User does not exit.")
        }
  };

  return (
    <div className="forgot-password">
      <div className="forgot__container">
        <div className="image__container">
          <img
            src={image1}
            alt="forgot"
            style={{ width: "250px", height: "50%" }}
          />
          <p className="verified">Be Verified</p>
          <small className="join">
            Join experienced Designers on this platform.
          </small>
        </div>
        <div className="forgot__text">
          <div className="header-text">
            <h2>Hello, Again</h2>
            <p>We are happy to have you back.</p>
          </div>
          <div className="forgot__form">
            <form onSubmit={handleforgot}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
              />
              <PasswordInput
                type="password"
                placeholder="ConfirmPassword"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              
              {error && <p className="error-msg">{error}</p>}
              <button type="submit">Login</button>
            </form>
            <div className="row">
              <small className="row-text">
                Alread have an account?&nbsp;<Link to="/"><div className="link-text">Login</div></Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
