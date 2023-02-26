import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

const ImagePreview = ({ text, setText, user, type2 }) => {
  return (
    <div className='overflow_a'>
      <EmojiPickerBackgrounds text={text} user={user} setText={setText} type2 />
    </div>
  );
};

export default ImagePreview;
