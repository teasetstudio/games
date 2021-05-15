import React, { useEffect, useRef } from 'react'
import { connect } from "react-redux";
import * as actions from '../../letterActions';
// styled in modalSet.scss

interface IState {
    players: number,
    guessedWords: number,
    wrongLetters: string[],
    seconds: number
}
interface IStateGuessed extends IState {
    nextWord(add: number): void
}
const GuessedModal = ({ players, guessedWords, wrongLetters, seconds, nextWord }: IStateGuessed) => {
    const enterBtn = useRef<HTMLButtonElement>(null)
    const addScore: number = 1 + (Math.round((guessedWords*15 + 500)/(1.3 + (wrongLetters.length) + (seconds/20))/100));
    
    function IsEnterPressed (e: React.KeyboardEvent<HTMLButtonElement>): void {
        if (e.key === 'Enter') {
            nextWord(addScore)
        }
    }
    useEffect(() => {
        setTimeout(()=>{
            enterBtn.current!.focus();
        }, 200)
    })
    return (
        <div className="modal-set">
            <p>Ты отгадал слово и заработал очки, поздравляю!</p>
            <p className="modal-set__score">+{addScore}</p>
            <button className="modal-set__btn"  ref={enterBtn} onKeyDown={IsEnterPressed}
                onClick={()=> nextWord(addScore)} type='button'>Enter</button>
        </div>
    )
}
const mapStateToProps = ({ players, guessedWords, wrongLetters, seconds }: IState) => ({ players, guessedWords, wrongLetters, seconds });
export default connect(mapStateToProps, actions)(GuessedModal)
