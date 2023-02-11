import React from "react";
import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/LoginInput";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const ChangePassword = ({
  password,
  setPassword,
  confirm_password,
  setConfirm_password,
  error,
}) => {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(40, "Password can't be more than 40 characters."),
    confirm_password: Yup.string()
      .required("Confirm password required")
      .oneOf([Yup.ref("password")], "Password must match."),
  });

  return (
    <div className='reset_form' style={{ height: "310px" }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Create a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirm_password }}
        validationSchema={validatePassword}
      >
        {formik => (
          <Form>
            <LoginInput
              type='password'
              name='password'
              onChange={e => setPassword(e.target.value)}
              placeholder='New password'
            />
            <LoginInput
              type='password'
              name='confirm_password'
              onChange={e => setConfirm_password(e.target.value)}
              placeholder='Confirm new password'
              bottom
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
