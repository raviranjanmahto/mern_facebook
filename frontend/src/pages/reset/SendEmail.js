import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const SendEmail = ({
  userInfos,
  error,
  setError,
  setVisible,
  setUserInfos,
  loading,
  setLoading,
  email,
}) => {
  const SendEmail = async () => {
    try {
      setError("");
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setError("");
      setVisible(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='reset_form dynamic_height'>
      <div className='reset_form_header'>Reset Your Password</div>
      <div className='reset_grid'>
        <div className='reset_left'>
          <div className='reset_form_text'>
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor='email' className='hover1'>
            <input type='radio' id='email' checked readOnly />
            <div className='label_col'>
              <span>Send code via email</span>
              <span>{userInfos?.email}</span>
            </div>
          </label>
        </div>
        <div className='reset_right'>
          <img src={userInfos?.picture} alt='' />
          <span>{userInfos?.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className='error_text' style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className='reset_form_btn'>
        <Link to='/' className='grey_btn'>
          Not You ?
        </Link>
        <button
          onClick={() => {
            SendEmail();
          }}
          className='blue_btn'
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
