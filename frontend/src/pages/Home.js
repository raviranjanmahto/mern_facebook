import { useSelector } from "react-redux";
import CreatePost from "../components/createPost/CreatePost";
import Header from "../components/header/Header";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/RightHome";
import Stories from "../components/home/Stories";
import "./Home.css";

const Home = () => {
  const { user } = useSelector(user => ({ ...user }));

  return (
    <div className='home'>
      <Header />
      <LeftHome user={user} />
      <div className='home_middle'>
        <Stories />
        <CreatePost user={user}/>
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
