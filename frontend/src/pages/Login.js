// import React from "react";
import { Footer, LoginForm } from "../components";
import "./Login.css";

const Login = () => {
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm />
        <div className='register'></div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
