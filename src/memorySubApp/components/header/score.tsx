import { connect } from 'react-redux';

type TScore = {
    curPlayer: string,
    redScore: number,
    blueScore: number
}

const Score = ({ curPlayer, redScore, blueScore }: TScore) => {
    const activeClass: string = curPlayer === 'red' ? 'active-red' : 'active-blue';
    console.log('curPlayer', curPlayer)
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
type TState = {
    curPlayer: string,
    score: { [key: string]: number }
}
const mapStateToProps = ({ curPlayer, score }: TState) => ({ 
    curPlayer,
    redScore: score.red,
    blueScore: score.blue
})

export default connect(mapStateToProps)(Score)
