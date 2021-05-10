import { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../memoActions';
import WinModal from '../winModals/winModal';
import Menu from '../menu/Menu';
import Records from './records';
import Score from './score';
import Organaizer from './organaizer';
import './header.scss';

type THeader = {
    players: number,
    isWin: boolean
}

const Header = ({ players, isWin }: THeader) => {
    const [menuOpen, toggleMenu] = useState(false);

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

const mapStateToProps = ({ players, isWin }: THeader) => ({players, isWin})

export default connect(mapStateToProps, actions)(Header)
