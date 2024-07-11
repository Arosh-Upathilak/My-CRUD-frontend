import React,{ useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

import "./Home.css";

const Home = () => {
    const [userInfo, setUserInfo]=useState(null)
    const navigate =useNavigate();

    //Get User Info
    const getUserInfo =async () =>{
        try{
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/");
            }
        }
    
    };
    
    useEffect(() => {
        getUserInfo();
        return () => {};
    });

    return (
        <div className="home">
            <Navbar userInfo={userInfo}/>
        <h1>Home Page</h1>
        <Footer/>
        </div>
    );
    }
export default Home;