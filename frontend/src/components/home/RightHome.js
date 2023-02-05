import { Dots, NewRoom, Search } from "../../svg";
import "./RightHome.css";

const RightHome = () => {
  const color = "#65676b";

  return (
    <div className='right_home'>
      <div className='heading'>Sponsored</div>
      <div className='splitter1'></div>
      <div className='contact_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>Contacts</div>
          <div className='contacts_header_right'>
            <div className='contact_circle'>
              <NewRoom color={color} />
            </div>
            <div className='contact_circle'>
              <Search color={color} />
            </div>
            <div className='contact_circle'>
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className='contact_list'></div>
      </div>
    </div>
  );
};

export default RightHome;
