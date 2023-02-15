import { useEffect, useRef, useState } from "react";
import "./style.css";
import Picker from "emoji-picker-react";

const CreatePostPopup = ({ user }) => {
  const [text, setText] = useState("");
  const [showPre, setShowPre] = useState(false);
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
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
        {!showPre && (
          <div className='flex_center'>
            <textarea
              ref={textRef}
              maxLength='140'
              value={text}
              placeholder={`What's on your mind, ${user?.first_name}`}
              className='post_input'
              onChange={e => setText(e.target.value)}
            ></textarea>
          </div>
        )}
        <div className='post_emojis_wrap'>
          {picker && (
            <div className='comment_emoji_picker rlmove'>
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <img src='../../../icons/colorful.png' alt='' />
          <i
            className='emoji_icon_large'
            onClick={() => setPicker(prev => !prev)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
