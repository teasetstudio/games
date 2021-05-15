import { connect } from 'react-redux'
import * as actions from '../../memoActions';

type TMenu = {
    menuOpen: boolean,
    toggleMenu(is: boolean): void,
    setPlayers(num: number): void,
    restart(size: number): void
}
const Menu = ({ menuOpen, toggleMenu, setPlayers, restart }: TMenu) => {
    return (
        <div className={`menu ${menuOpen ? 'menu_open' : null}`}
            onMouseLeave={() => toggleMenu(false)}
            onClick={() => toggleMenu(false)}>
            <h4>Игроков:</h4>
            <div className="menu__block flex">
                <button className="menu__item" onClick={() => setPlayers(1)}>1 Игрок</button>
                <button className="menu__item" onClick={() => setPlayers(2)}>2 Игрока</button>
            </div>
            <h4>Сложность:</h4>
            <div className="menu__block flex">
                <button className="menu__item" onClick={() => restart(20)}>Норма</button>
                <button className="menu__item" onClick={() => restart(30)}>Сложнее</button>
            </div>
        </div>
    )
}

export default connect(null, actions)(Menu)
