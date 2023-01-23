import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/RegisterInput";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import { DateOfBirthSelect, GenderSelect } from "./index";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "First name must be between 2 and 24 character.")
      .max(24, "First name must be between 2 and 24 character.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed!"
      ),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 24 character.")
      .max(24, "Last name must be between 2 and 24 character.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed!"
      ),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password"
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(40, "Password can't be more than 40 characters."),
  });

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let pickedDate = new Date(bYear, bMonth - 1, bDay);
            let atLeast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan94 = new Date(1970 + 94, 0, 1);
            if (currentDate - pickedDate < atLeast14) {
              setDateError(
                "it looks like you entered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (currentDate - pickedDate > noMoreThan94) {
              setDateError("");
              setDateError(
                "it looks like you entered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
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
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleChange={handleChange}
                  dateError={dateError}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>
                <GenderSelect
                  handleChange={handleChange}
                  genderError={genderError}
                />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{" "}
                <span> Terms, Privacy Policy &nbsp;</span> and{" "}
                <span> Cookies Policy</span>. You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button type='submit' className='blue_btn open_signup'>
                  Sign Up
                </button>
              </div>
              <ScaleLoader color='#1876f2' loading={loading} size={30} />
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
