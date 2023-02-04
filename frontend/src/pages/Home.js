import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import LeftHome from "../components/home/LeftHome";

const Home = () => {
  const { user } = useSelector(user => ({ ...user }));

  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
};

export default Home;
