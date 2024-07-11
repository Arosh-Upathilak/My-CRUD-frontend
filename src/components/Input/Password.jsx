import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Password.css"; 

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword((prev) => !prev);
    };

    return (
        <div className="password-input-container">
            <input 
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="password-input"
            />
            
            {isShowPassword ? (
                <FaRegEyeSlash 
                    size={22} 
                    className="password-toggle-icon" 
                    onClick={toggleShowPassword} 
                />
            ) : (
                <FaRegEye 
                    size={22} 
                    className="password-toggle-icon" 
                    onClick={toggleShowPassword} 
                />
            )}
        </div>
    );
};

export default PasswordInput;
