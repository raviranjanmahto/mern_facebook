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
        <div className='register'></div>
        <footer className='login_footer'>
          <div className='login_footer_wrap'>
            <Link to='/'>English (UK)</Link>
            <Link to='/'>ગુજરાતી</Link>
            <Link to='/'>हिन्दी</Link>
            <Link to='/'>मराठी</Link>
            <Link to='/'>اردو</Link>
            <Link to='/'>ਪੰਜਾਬੀ</Link>
            <Link to='/'>தமிழ்</Link>
            <Link to='/'>తెలుగు</Link>
            <Link to='/'>বাংলা</Link>
            <Link to='/'>മലയാളം</Link>
            <Link to='/'>Español</Link>
            <Link to='/' className='footer_square'>
              <i className='plus_icon'></i>
            </Link>
          </div>
          <div className='footer_splitter'></div>
          <div className='login_footer_wrap'>
            <Link to='/'>Sign Up</Link>
            <Link to='/'>Log in</Link>
            <Link to='/'>Messenger</Link>
            <Link to='/'>Facebook Lite</Link>
            <Link to='/'>Watch</Link>
            <Link to='/'>Places</Link>
            <Link to='/'>Games</Link>
            <Link to='/'>Marketplace</Link>
            <Link to='/'>Meta Pay</Link>
            <Link to='/'>Oculus</Link>
            <Link to='/'>Portal</Link>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Bulletin</Link>
            <Link to='/'>Fundraisers</Link>
            <Link to='/'>Services</Link>
            <Link to='/'>Voting Information Centre</Link>
            <Link to='/'>Privacy Policy</Link>
            <Link to='/'>Privacy Centre</Link>
            <Link to='/'>Groups</Link>
            <Link to='/'>About</Link>
            <Link to='/'>Create ad</Link>
            <Link to='/'>Create Page</Link>
            <Link to='/'>Developers</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Cookies</Link>
            <Link to='/'>
              AdChoices<i className='adChoices_icon'></i>
            </Link>
            <Link to='/'>Terms</Link>
            <Link to='/'>Help</Link>
            <Link to='/'>Contact uploading and non-usersSettings</Link>
          </div>
          <div className='login_footer_wrap'>
            <Link to='/' style={{ fontSize: "12px", marginTop: "10px" }}>
              Meta © 2023
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
