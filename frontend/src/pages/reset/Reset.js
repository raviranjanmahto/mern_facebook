import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Reset.css";
import SearchAccount from "./SearchAccount";

const Reset = () => {
  const { user } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
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
          <SearchAccount email={email} setEmail={setEmail} error={error} />
        )}
      </div>
    </div>
  );
};

export default Reset;
