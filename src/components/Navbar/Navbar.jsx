import React from "react";
import "./Navbar.css";
import ProfileInfo from "../Card/ProfileInfo";
import { useNavigate } from "react-router-dom";

const Navbar = ({userInfo})=> {
  const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/");
    };

  return (
    <div className="navbar">
      <p className="curd-text">CRUD APP</p>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  );
}

export default Navbar;