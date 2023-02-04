import React, { useState } from "react";
import "./LeftHome.css";
import LeftLink from "./LeftLink";
import { left } from "../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../svg";
import Shortcut from "./Shortcut";

const LeftHome = ({ user }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='left_home scrollbar'>
      <Link to='/profile' className='left_link hover1'>
        <img src={user?.picture} alt='' />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className='left_link hover1' onClick={() => setVisible(true)}>
          <div className='small_circle'>
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className='more_left'>
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className='left_link hover1' onClick={() => setVisible(false)}>
            <div className='small_circle rotate360'>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className='splitter'></div>
      <div className='shortcut'>
        <div className='heading'>Your Shortcuts</div>
        <div className='edit_shortcut'>Edit</div>
      </div>
      <div className='shortcut_list'>
        <Shortcut
          link='https://vikreta.in/'
          img='../../images/ytb.png'
          name='My YouTube channel'
        />
        <Shortcut
          link='https://www.instagram.com/mr_expert.exe/'
          img='../../images/insta.png'
          name='My Instagram channel'
        />
      </div>
    </div>
  );
};

export default LeftHome;
