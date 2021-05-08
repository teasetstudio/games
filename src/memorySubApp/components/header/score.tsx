import { connect } from 'react-redux';
import './score.scss';

const Score: React.FC = ({ curPlayer, redScore, blueScore }: any) => {
    const activeClass = curPlayer === 'red' ? 'active-red' : 'active-blue';
    return (
        <>
        <div className={`score ${activeClass}`}>
            <div className='score__wrapper'>
                <p className="score__red">Красный: <span>{redScore}</span></p>
                <p className="score__blue">Синий: <span>{blueScore}</span></p>
            </div>
        </div>
        <div className={`score__slider ${activeClass}`}></div>
        </>
    )
}

const mapStateToProps = ({ curPlayer, score }: any) => ({ 
    curPlayer,
    redScore: score.red,
    blueScore: score.blue
})

export default connect(mapStateToProps)(Score)
