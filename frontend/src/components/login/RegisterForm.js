// import React from "react";

import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/RegisterInput";

const RegisterForm = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(initialState);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (value, index) => tempYear - index);
  const months = Array.from(new Array(12), (value, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (value, index) => 1 + index);
  console.log(user);
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
                  <select name='bDay' value={bDay} onChange={handleChange}>
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name='bMonth' value={bMonth} onChange={handleChange}>
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name='bYear' value={bYear} onChange={handleChange}>
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <div className='reg_grid'>
                  <label htmlFor='male'>
                    Male
                    <input
                      type='radio'
                      name='gender'
                      id='male'
                      value='male'
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor='female'>
                    Female
                    <input
                      type='radio'
                      name='gender'
                      id='female'
                      value='female'
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor='custom'>
                    Custom
                    <input
                      type='radio'
                      name='gender'
                      id='custom'
                      value='custom'
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{" "}
                <span> Terms, Privacy Policy &nbsp;</span> and{" "}
                <span> Cookies Policy</span>. You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
