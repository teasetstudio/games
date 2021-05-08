import { connect } from 'react-redux';
import './organaizer.scss';

interface IOrganizer {
    clicks: number,
    toggleMenu(menuOpen: boolean): void
}

const Organaizer:React.FC<IOrganizer> = ({ clicks, toggleMenu }) => {
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

const mapStateToProps = ({score}: any) => ({clicks: score.clicks})
export default connect(mapStateToProps)(Organaizer)
