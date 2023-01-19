// import React from "react";

import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/RegisterInput";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: "",
  bMonth: "",
  bDay: "",
  gender: "",
};

const RegisterForm = () => {
  const [user, setUser] = useState(initialState);
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon'></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik>
          {formik => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onChange={handleChange}
                />
                <RegisterInput
                  type='text'
                  placeholder='Surname'
                  name='last_name'
                  onChange={handleChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='email'
                  placeholder='Mobile number or email'
                  name='email'
                  onChange={handleChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  placeholder='New password'
                  name='password'
                  onChange={handleChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <div className='reg_grid'>
                  <select name='bDay'>
                    <option value=''>17</option>
                  </select>
                  <select name='bMonth'>
                    <option value=''>17</option>
                  </select>
                  <select name='bYear'>
                    <option value=''>17</option>
                  </select>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
