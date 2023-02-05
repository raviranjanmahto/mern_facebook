import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/RightHome";

const Home = () => {
  const { user } = useSelector(user => ({ ...user }));

  return (
    <div>
      <Header />
      <LeftHome user={user} />
      <RightHome/>
    </div>
  );
};

export default Home;
