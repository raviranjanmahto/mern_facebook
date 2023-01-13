import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./Login.css";
import InputRow from "../components/InputRow";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(initialState);
  const { email, password } = login;
  console.log(login);

  const handleChange = e => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    // setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required(`Email address is required`)
      .email(`Must be a valid email`)
      .max(70, "Email is too long"),
    password: Yup.string()
      .required(`Password is required`)
      .min(6, "Password must be atleast 6 character !")
      .max(40, "Password is too long!"),
  });

  return (
    <div className='login'>
      <div className='login_wrapper'>
        <div className='login_wrap'>
          <div className='login_1'>
            <img src='../../icons/facebook.svg' alt='' />
            <span>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div className='login_2'>
            <div className='login_2_wrap'>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidation}
              >
                {formik => (
                  <Form>
                    <InputRow
                      type='text'
                      name='email'
                      // value={login.email}
                      placeholder='Email address or phone number'
                      onChange={handleChange}
                    />
                    <InputRow
                      type='password'
                      name='password'
                      // value={login.password}
                      placeholder='Password'
                      onChange={handleChange}
                      bottom
                    />
                    <button type='submit' className='blue_btn'>
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to='/forgot' className='forgot_password'>
                Forgotten password?
              </Link>
              <div className='sign_splitter'></div>
              <button className='blue_btn open_signup'>Create Account</button>
            </div>
            <Link to='/' className='sign_extra'>
              <b>Create a Page</b> for a celebrity, brand or business.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
