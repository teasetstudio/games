import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../letterActions';

interface IOrgRight {
    seconds: number,
    isTimerOn: boolean,
    guessedWords: number
}
interface IProps extends IOrgRight {
    timerTick(): void
}

const Info = ({ isTimerOn, seconds, guessedWords, timerTick }: IProps) => {
    useEffect(()=>{
        if (isTimerOn){
            const timer: any = setInterval(() => {timerTick()}, 1000);
            return ()=> clearInterval(timer);
        }
    })
    return (
        <div className='info'>
            <div className="info__item clock">
                <p className='info__title'>Время</p>
                <div id="timer" className="info__number">{seconds}</div>
            </div>
            <div className="info__item words">
                <p className='info__title'>Слова</p>
                <div id="words-guessed" className="info__number">{guessedWords}</div>
            </div>
        </div>
    )
}
const mapStateToProps = ({ isTimerOn, seconds, guessedWords }: IOrgRight) => ({ isTimerOn, seconds, guessedWords })
export default connect(mapStateToProps, actions)(Info)