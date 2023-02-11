import React from "react";
import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/LoginInput";
import { Link } from "react-router-dom";

const ChangePassword = ({
  password,
  setPassword,
  confirm_password,
  setConfirm_password,
  error,
}) => {
  return (
    <div className='reset_form' style={{ height: "310px" }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Create a strong password</div>
      <Formik enableReinitialize initialValues={{ password, confirm_password }}>
        {formik => (
          <Form>
            <LoginInput
              type='text'
              name='password'
              onChange={e => setPassword(e.target.value)}
              placeholder='New password'
            />
            <LoginInput
              type='text'
              name='confirm_password'
              onChange={e => setConfirm_password(e.target.value)}
              placeholder='Confirm new password'
            />
            {error && <div className='error_text'>{error}</div>}
            <div className='reset_form_btn'>
              <Link to='/' className='grey_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
