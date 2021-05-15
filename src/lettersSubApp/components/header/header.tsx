import React, { useState } from 'react'
import Menu from './menu';
import Records from './records';
import MenuBtn from './menuBtn';

const Header = () => {
    const [menuOpen, menuToggle] = useState<boolean>(false);

    return (
        <div className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <MenuBtn menuToggle={menuToggle} />

                    <Records />
                </div>
                <Menu menuOpen={menuOpen} menuToggle={menuToggle} />
            </div>
        </div>
    )
}
export default Header;
