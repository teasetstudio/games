import {Link} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './burger.scss';


const BurgerMenu = () => {

    return (
        <Menu right>
            <Link id="home" className="menu-item" to="/">Home</Link>
            <Link id="about" className="menu-item" to="/memory">Memory</Link>
            <Link id="contact" className="menu-item" to="/letterhummer">Letter Hummer</Link>
        </Menu>
    );
}

export default BurgerMenu;