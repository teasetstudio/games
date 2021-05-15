import { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../letterActions';

interface IStateToProps {
    wrongLetters: string[],
    gameState: string
}
interface ILetterInput extends IStateToProps{
    letterInputed(letter: string): void
}
const LetterInput = ({ wrongLetters, gameState, letterInputed }: ILetterInput) => {
    const letterOBJ = useRef<HTMLInputElement>(null);
    function autoReInput(): void {
        const value: string = letterOBJ.current!.value;
        letterOBJ.current!.value = value.length>1 ? value.slice(1) : value;
    }
    useEffect(() => {
        if (gameState === "game") {
            letterOBJ.current!.focus()
        }
    })
    function isFocus(): void {
        if (gameState !== "game") {
            letterOBJ.current!.blur()
        }
    }
    function IsEnterPressed (e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            checkLetter();
        }
    }
    function checkLetter (): void {
        // const regexRu = /[а-яА-ЯЁё]/;
        const value: string = letterOBJ.current!.value;
        letterOBJ.current!.value = '';
        letterInputed(value);
    }

    return (
        <div className="input">
            <label className="input__label" htmlFor="letter">Введите букву:</label>
            <div className="input__shadow">
                <input className="input__letter" type="text" ref={letterOBJ}
                    onFocus={isFocus}
                    onKeyDown={IsEnterPressed} name='letter'
                    onChange={autoReInput} autoComplete="off" />
            </div>
            <button type='button' onClick={checkLetter}
                className="input__btn">Ввод</button>
        </div>
    )
}


const mapStateToProps = ({ wrongLetters, gameState }: IStateToProps) => ({ wrongLetters, gameState })
export default connect(mapStateToProps, actions)(LetterInput)