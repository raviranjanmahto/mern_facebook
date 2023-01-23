import "./Login.css";
import { LoginForm, RegisterForm, Footer } from "../components/login";
import { useState } from "react";

const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
};

export default Login;
