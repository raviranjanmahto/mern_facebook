import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../inputs/LoginInput";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(initialState);
  const { email, password } = login;

  const handleChange = e => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    // setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required(`Email address is required`)
      .email(`Must be a valid email`),
    password: Yup.string().required(`Password is required`),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      const { message, ...rest } = data;
      dispatch({ type: "LOGIN", payload: rest });
      Cookies.set("user", JSON.stringify(rest));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
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
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {formik => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  // value={login.email}
                  placeholder='Email address or phone number'
                  onChange={handleChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  // value={login.password}
                  placeholder='Password'
                  onChange={handleChange}
                  bottom
                />
                <button type='submit' className='blue_btn' disabled={loading}>
                  <ScaleLoader color='#fff' loading={loading} size={30} />
                  {loading ? "Please wait..." : "Login"}
                  {/* Login */}
                  <ScaleLoader color='#fff' loading={loading} size={30} />
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/reset' className='forgot_password'>
            Forgotten password?
          </Link>
          {error && <div className='error_text'>{error}</div>}
          <div className='sign_splitter'></div>
          <button
            className='blue_btn open_signup'
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to='/' className='sign_extra'>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
