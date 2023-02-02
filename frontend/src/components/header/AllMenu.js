import { menu, create } from "../../data/allMenu";
import { AllMenuItem } from "./AllMenuItem";

const AllMenu = () => {
  return (
    <div>
      <div className='all_menu'>
        <div className='all_menu_header'>Menu</div>
        <div className='all_menu_wrap scrollbar'>
          <div className='all_left'>
            <div className='all_menu_search'>
              <i className='amm_s_ic'></i>
              <input type='text' placeholder='Search Menu' />
            </div>
            <div className='all_menu_group'>
              <div className='all_menu_group_header'>Social</div>
              {menu.slice(0, 6).map((item, i) => (
                <AllMenuItem
                  key={i}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
