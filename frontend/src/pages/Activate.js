import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../components/createPost/CreatePost";
import Header from "../components/header/Header";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/RightHome";
import Stories from "../components/home/Stories";
import ActivateForm from "./ActivateForm";
import "./Home.css";

const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(user => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({ type: "VERIFY", payload: true });
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  return (
    <div className='home'>
      {success && (
        <ActivateForm
          type='success'
          header='Account verification success!'
          text={success}
          loading={loading}
        />
      )}{" "}
      {error && (
        <ActivateForm
          type='error'
          header='Account verification failed!'
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
