import "./Login.css";
import { LoginForm, RegisterForm, Footer } from "../components/login";

const Login = () => {
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
