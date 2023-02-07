import { Plus } from "../../svg";
import "./Stories.css";

const Stories = () => {
  return (
    <div className='stories'>
      <div className='create_story_card'>
        <img
          src='../../../images/default_pic.png'
          alt=''
          className='create_story_img'
        />
        <div className='plus_story'>
          <Plus color='#fff' />
        </div>
        <div className='story_create_text'>Create Story</div>
      </div>
    </div>
  );
};

export default Stories;
