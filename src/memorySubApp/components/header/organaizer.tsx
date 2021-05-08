import { connect } from 'react-redux';
import './organaizer.scss';

interface IOrganizer {
    clicks: number,
    toggleMenu(menuOpen: boolean): void
}

const Organaizer = ({ clicks, toggleMenu }: IOrganizer) => {
    return (
        <div className='organaizer'>
            <button className="organaizer__btn-menu"
                onClick={() => toggleMenu(true)} >
                Menu
            </button>
            <p className='organaizer__clicks'>Кликов: <span>{clicks}</span></p>
        </div>
    )
}
type TState = {
    score: {[key:string]: number}
}
const mapStateToProps = ({score}: TState) => ({clicks: score.clicks})
export default connect(mapStateToProps)(Organaizer)
