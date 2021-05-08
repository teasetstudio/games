import { useState } from 'react';
import { connect } from 'react-redux';
import * as action from '../../memoActions';
import WinModal from '../winModals/winModal';
import Menu from '../menu/Menu';
import Records from './records';
import Score from './score';
import Organaizer from './organaizer';
import './header.scss';

const Header: React.FC<any> = ({ players, isWin }) => {

    const [menuOpen, toggleMenu] = useState<boolean>(false);

    return (
        <div className='header'>
            <div className='header__wrapper container'>
                <Organaizer toggleMenu={toggleMenu} />

                {players === 2 ? <Score /> : null }

                <Records />
            </div>

            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />

            {isWin ? <WinModal /> : null}
        </div>
    )
}

const mapStateToProps = ({ players, isWin }: any) => ({players, isWin})

export default connect(mapStateToProps, action)(Header)