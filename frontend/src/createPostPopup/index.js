import { useState } from "react";
import "./style.css";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";

const CreatePostPopup = ({ user }) => {
  const [text, setText] = useState("");
  const [showPre, setShowPre] = useState(true);

  return (
    <div className='blur'>
      <div className='postBox'>
        <div className='box_header'>
          <div className='small_circle'>
            <i className='exit_icon'></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className='box_profile'>
          <img
            src={user?.picture}
            alt='user_image'
            className='box_profile_img'
          />
          <div className='box_col'>
            <div className='box_profile_name'>
              {user?.first_name} {user?.last_name}
            </div>
            <div className='box_privacy'>
              <img src='../../../icons/public.png' alt='public_icon' />
              <span>Public</span>
              <i className='arrowDown_icon'></i>
            </div>
          </div>
        </div>
        {!showPre ? (
          <>
            <EmojiPickerBackgrounds text={text} user={user} setText={setText} />
          </>
        ) : (
          <ImagePreview text={text} user={user} setText={setText} />
        )}
        <AddToYourPost />
        <button className='post_submit'>Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
