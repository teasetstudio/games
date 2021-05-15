import { connect } from 'react-redux';
import LetterInput from './letterInput';

interface IOrg {
    wrongLetters: string[],
    guessedWords: number,
    seconds: number
}
const Organaizer = ({ wrongLetters, guessedWords, seconds }: IOrg) => {
    return (
        <div className="organaizer">

            <div className="organaizer__side">
                <div className="used-letters">
                    {wrongLetters.map((item, id) => {
                        return <p key={id} className='used-letters__item'>{item.toUpperCase()}</p>
                    })}
                </div>
            </div>

            <LetterInput />

            <div className="organaizer__side info">
                <div className="info__item clock">
                    <p className='info__title'>Время</p>
                    <div id="timer" className="info__number">{seconds}</div>
                </div>
                <div className="info__item words">
                    <p className='info__title'>Слова</p>
                    <div id="words-guessed" className="info__number">{guessedWords}</div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({ wrongLetters, guessedWords, seconds }: IOrg) => ({ wrongLetters, guessedWords, seconds })

export default  connect(mapStateToProps)(Organaizer)
