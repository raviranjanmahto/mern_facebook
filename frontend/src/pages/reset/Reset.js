import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";
import CodeVerification from "./CodeVerification";
import "./Reset.css";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";

const Reset = () => {
  const { user } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [error, setError] = useState("");
  const [userInfos, setUserInfos] = useState("");
  const logout = () => {
    Cookies.remove("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../icons/facebook.svg' alt='facebook_icons' />
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user?.picture} alt='user_picture' />
            </Link>

            <button
              className='blue_btn'
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to='/' className='right_reset'>
            <button className='blue_btn'>Login</button>
          </Link>
        )}
      </div>
      <div className='reset_wrap'>
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && <SendEmail userInfos={userInfos} />}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            setPassword={setPassword}
            confirm_password={confirm_password}
            setConfirm_password={setConfirm_password}
            error={error}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
