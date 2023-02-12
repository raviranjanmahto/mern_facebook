import React from "react";
import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/LoginInput";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const CodeVerification = ({
  code,
  setCode,
  error,
  setError,
  setLoading,
  setVisible,
  userInfos,
}) => {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required!")
      .min(6, "Code must be 6 character")
      .max(6, "Code must be 6 character"),
  });
  const { email } = userInfos;
  const verifyCode = async () => {
    try {
      setLoading(true);
      setError("");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email, code }
      );
      setError("");
      setLoading(false);
      setVisible(3);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Code Verification</div>
      <div className='reset_form_text'>
        Please enter code that has been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
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
