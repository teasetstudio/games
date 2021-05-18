import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../letterActions';

interface IStateToProps {
    wrongLetters: string[],
    usedLetters: string[],
    gameState: string
}
interface ILetterInput extends IStateToProps{
    letterInputed(letter: string): void
}
const LetterInput = ({ usedLetters, gameState, letterInputed }: ILetterInput) => {
    const [alertModal, setAlertModal] = useState<string>('no');
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
    function resetAlertModal () {
        setTimeout(() => setAlertModal('no'), 3000)

    }
    function checkLetter (): void {
        const regexRu = /[а-яА-ЯЁё]/;
        const value: string = letterOBJ.current!.value.toLowerCase();
        letterOBJ.current!.value = '';
        if ( !regexRu.test(value) ) {
            setAlertModal('wrong_letter');
            resetAlertModal();
            return;
        }
        if ( usedLetters.includes(value) ) {
            setAlertModal('reiteration')
            resetAlertModal();
            return;
        }
        letterInputed(value);
    }

    return (
        <div className="input">
            {alertModal === 'no' ? null : (
                <div className='input__alert'>
                    <p>
                        {alertModal === 'wrong_letter' ?
                        'Введите букву на русском языке!':
                        'Вы уже вводили эту букву!'}
                    </p>
                </div>
            )}
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


const mapStateToProps = ({ wrongLetters, usedLetters, gameState }: IStateToProps) => ({ wrongLetters, usedLetters, gameState })
export default connect(mapStateToProps, actions)(LetterInput)