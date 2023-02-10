import { useSelector } from "react-redux";
import CreatePost from "../components/createPost/CreatePost";
import Header from "../components/header/Header";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/RightHome";
import Stories from "../components/home/Stories";
import ResendVerification from "../components/resendVerification/ResendVerification";
import "./Home.css";

const Home = () => {
  const { user } = useSelector(state => ({ ...state }));

  return (
    <div className='home'>
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
        {user.verified === false && <ResendVerification user={user} />}

        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
