import React from "react";
import "./ProfileInfo.css";
import {getInitals} from "../../utils/helper";

const ProfileInfo = ({ userInfo,onLogout }) => {
    return (
        <div className="ProfileInfo"> 
            <div className="ProfileInfo-logout">
            {getInitals(userInfo?.fullName)}
            </div>
            <div>
                <p className="name-text">{userInfo?.fullName}</p>
                <button className="logout-btn" onClick={onLogout} >Logout</button>
            </div>
            
        </div>
    );
}
export default ProfileInfo;