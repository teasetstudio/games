import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../letterActions';
import showimg from '../../img/show.png';

interface IWordInput {
    curPlayer: string
}
interface IState extends IWordInput {
    setInputedWord(word:string): void
}

const WordInputModal = ({ curPlayer, setInputedWord }: IState) => {
    const name = useRef<HTMLInputElement>(null);

    const playerTitle = curPlayer === 'blue' ? 'Синий' : 'Фиолетовый';

    function IsEnterPressed (e: any): void {
        if (e.key === 'Enter') {
            e.currentTarget.querySelector('#input-submit-word').click();
        }
    }
    function setWord(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (name.current) {
            const inputName: string = name.current.value;
            setInputedWord(inputName);
        }
    }
    function showWord() {
        name.current!.type = 'text';
    }
    function hideWord() {
        name.current!.type = 'password';
        name.current!.focus();
    }

    useEffect(() => {
        if (name.current){
            setTimeout(()=>{
                name.current!.focus();
            }, 200)
        }
    })

    return (
        <form className='modal-set' onSubmit={setWord} onKeyDown={IsEnterPressed}>
            <h3><span className={`modal-set__player modal-set__${curPlayer}`}>{playerTitle}</span></h3>
            <p className='modal-set__text'>Загадывай слово ниже:</p>
            <input className='modal-set__input-word' type="password" ref={name} required maxLength={12} /><br />
            <button id='input-submit-word' className="modal-set__btn" type='submit'>Enter</button>
            <button className="modal-set__show-btn" type='button'
                onMouseDown={showWord} onMouseUp={hideWord} > 
                    <img src={showimg} height="30" alt="" />
            </button>
        </form>
    )
}
const mapStateToProps = ({ curPlayer }: IWordInput) => ({ curPlayer })
export default connect( mapStateToProps, actions )(WordInputModal)