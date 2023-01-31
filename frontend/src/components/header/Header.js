import { Link } from "react-router-dom";
import "./Header.css";
import {
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Search,
  Watch,
} from "../../svg";

const Header = () => {
  const color = "#65676b";

  return (
    <header>
      <div className='header_left'>
        <Link to='/'>
          <div className='circle'>
            <Logo />
          </div>
        </Link>
        <div className='search search1'>
          <Search color={color} />
          <input
            type='text'
            placeholder='Search Facebook'
            className='hide_input'
          />
        </div>
      </div>
      <div className='header_middle'>
        <Link to='/' className='middle_icon active'>
          <HomeActive color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Friends color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Watch color={color} />
          <div className='middle_notification'>9+</div>
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Market color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Gaming color={color} />
        </Link>
      </div>
      <div className='header_right'></div>
    </header>
  );
};

export default Header;
