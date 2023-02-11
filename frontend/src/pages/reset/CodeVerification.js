import React from "react";
import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/LoginInput";
import { Link } from "react-router-dom";

const CodeVerification = ({ code, setCode, error }) => {
  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Code Verification</div>
      <div className='reset_form_text'>
        Please enter code that has been sent to your email.
      </div>
      <Formik enableReinitialize initialValues={{ code }}>
        {formik => (
          <Form>
            <LoginInput
              type='text'
              name='code'
              onChange={e => setCode(e.target.value)}
              placeholder='Code'
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

export default CodeVerification;
