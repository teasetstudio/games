import { connect } from "react-redux"
import * as actions from '../../letterActions';

interface IMenu {
    menuOpen: boolean,
    levelStart(level: number): void,
    menuToggle(p: boolean): void,
    onePlayer(): void,
    twoPlayers(): void
}
const Menu = ({ menuOpen, menuToggle, levelStart, onePlayer, twoPlayers }: IMenu) => {
    return (
        <div className={`menu container ${menuOpen ? 'menu-open' : ''}`}
                onMouseLeave={() => menuToggle(false)} >
            <div className="menu__block">
                <h3>Сложность:</h3>
                <div className="menu__btns">
                    <button className="menu__item" onClick={() => levelStart(13)} >Норма</button>
                    <button className="menu__item" onClick={() => levelStart(7)} >Сложно</button>
                </div>
            </div>

            <div className="menu__block">
                <h3>Режимы:</h3>
                <div className="menu__btns">
                    <button className="menu__item" onClick={onePlayer} >1 Игрок</button>
                    <button className="menu__item" onClick={twoPlayers} >2 Игрока</button>
                </div>
            </div>
        </div>
    )
}
export default connect( null, actions )(Menu)