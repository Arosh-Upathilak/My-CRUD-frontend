import React, { useState, useEffect } from "react";
import "./Login.css";
import image1 from "../../assets/1.png";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/Input/Password";
import { Link ,useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Check local storage for remembered credentials on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!email || !password) {
      setError("All fields are required");
      return;
    } 
    else {
      //Login API Call
      try{
        const response = await axiosInstance.post("/login", {
            email:email,
            password:password,
        });
        //Handle sucessful login response
        if(response.data && response.data.accessToken){
            localStorage.setItem("token", response.data.accessToken);
            navigate ("/home");
        }
    }
    catch(err){
        //handle login error
        if(err.response && err.response.data && err.response.data.message){
            setError(err.response.data.message);
        }else{
            setError("Something went wrong. Please try again later.");
        }
    }

      // Save credentials if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe((prev) => !prev);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="image__container">
          <img
            src={image1}
            alt="login"
            style={{ width: "250px", height: "50%" }}
          />
          <p className="verified">Be Verified</p>
          <small className="join">
            Join experienced Designers on this platform.
          </small>
        </div>
        <div className="login__text">
          <div className="header-text">
            <h2>Hello, Welcome</h2>
            <p>We are happy to have you back.</p>
          </div>
          <div className="login__form">
            <form onSubmit={handleLogin}>
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
              <div className="form-check">
                <div className="remember">
                  <input
                    type="checkbox"
                    id="formCheck"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label
                    htmlFor="formCheck"
                    className="remember-text"
                  >
                    <small>Remember&nbsp;Me</small>
                  </label>
                </div>
                <div className="forgot">
                  <small>
                  <Link to="/forgot-password" style={{ color: "blue", textDecoration: "none" }} className="hover:underline">
                      Forgot Password?
                  </Link>

                  </small>
                </div>
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button type="submit">Login</button>
            </form>
            <div className="row">
              <small>
                Don't have an account? <Link to="/signup" style={{ color: "blue" }} className="link">Sign Up</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
