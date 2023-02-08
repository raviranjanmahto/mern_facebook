import { stories } from "../../data/home";
import { ArrowRight, Plus } from "../../svg";
import "./Stories.css";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";

const Stories = () => {
  const query1175px = useMediaQuery({ query: "(max-width:1175px)" });
  const query1030px = useMediaQuery({ query: "(max-width:1030px)" });
  const query950px = useMediaQuery({ query: "(max-width:950px)" });
  const query875px = useMediaQuery({ query: "(max-width:875px)" });
  const max = query875px
    ? 5
    : query950px
    ? 4
    : query1030px
    ? 5
    : query1175px
    ? 4
    : stories.length;
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
      {stories.slice(0, max).map((story, i) => (
        <Story key={i} story={story} />
      ))}
      <div className='white_circle'>
        <ArrowRight color='#65676b' />
      </div>
    </div>
  );
};

export default Stories;
