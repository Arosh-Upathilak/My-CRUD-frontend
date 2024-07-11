import React, { useState } from "react";
import "./Signup.css";
import image1 from "../../assets/1.png";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/Input/Password";
import { Link ,useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

const Signup = () => {
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesignup = async(e) => {
    e.preventDefault();
    if (!name) {
        setError("Please enter your name");
        return;
    }
    if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
    }
    if (!password) {
        setError("Please enter your password");
        return;
    }
    if (!confirmpassword) {
        setError("Please confirm your password");
        return;
    }
    if (password !== confirmpassword) {
        setError("Passwords do not match");
        return;
    }

    setError("");

        // Sign Up API Call
        try {
            const response = await axiosInstance.post("/createAccount", {
                fullName: name,
                email: email,
                password: password,
            });

            // Handle successful registration response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/");
            }
        } catch (err) {
            // Handle registration error
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="image__container">
          <img
            src={image1}
            alt="signup"
            style={{ width: "250px", height: "50%" }}
          />
          <p className="verified">Be Verified</p>
          <small className="join">
            Join experienced Designers on this platform.
          </small>
        </div>
        <div className="signup__text">
          <div className="header-text">
            <h2>Hello, Again</h2>
            <p>We are happy to have you back.</p>
          </div>
          <div className="signup__form">
            <form onSubmit={handlesignup}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Alread have an account?&nbsp;<Link to="/"><div className="link-text" >Create and Account</div></Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
