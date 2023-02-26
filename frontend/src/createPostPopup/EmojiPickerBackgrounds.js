import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

const EmojiPickerBackgrounds = ({ text, setText, user, type2 }) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);

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
    <>
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
      <div className='post_emojis_wrap'>
        {picker && (
          <div className='comment_emoji_picker rlmove'>
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src='../../../icons/colorful.png' alt='' />}
        <i
          className='emoji_icon_large'
          onClick={() => setPicker(prev => !prev)}
        ></i>
      </div>
    </>
  );
};

export default EmojiPickerBackgrounds;
