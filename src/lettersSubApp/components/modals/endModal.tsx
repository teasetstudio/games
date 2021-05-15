import React, { useEffect, useRef } from 'react'
import { connect } from "react-redux";
import * as actions from '../../letterActions';
import { Rec, TWord, TScore } from '../../types';
// styled in modalSet.scss

interface IState {
    word: TWord,
    score: TScore,
    records: Rec
}
interface IEndModal extends IState{
    saveResult(name: string): void,
    restart(): void
}

const EndModal = ({ word, score, records , restart, saveResult }: IEndModal) => {
    const wordString: string = word.map(({letter}) => letter).join('');
    const name = useRef<HTMLInputElement>(null)
    let place: number = 1;
    for (let rec of records){
        if (rec.score <= score.blue){
            break;
        }
        place++;
    }

    function IsEnterPressed (e: any): void {
        if (e.key === 'Enter') {
            e.currentTarget.querySelector('.modal-set__btn').click();
        }
    }

    function setRec(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (name.current) {
            const inputName: string = name.current.value
            saveResult(inputName);
        }
    }

    useEffect(() => {
        if (name.current){
            setTimeout(()=>{
                name.current!.focus();
            }, 200)
        }
    })

    const onePlayerForm: React.ReactElement = (
        <form className='modal-set' onSubmit={setRec} onKeyDown={IsEnterPressed}>
            <h3>Слово было <br />
                <span className='modal-set__score'>{wordString}</span>
            </h3>
            <p className='modal-set__text'>Ты набрал <span className="modal__result">{score.blue}</span> очков(а).</p>
            <p className='modal-set__text'>Заняв <span className="modal__place">{place}</span> место.</p><br />
            {place < 10 ? (<>
                    <p className='modal-set__text'>Введи своё имя, герой!</p>
                    <input type="text" ref={name} required maxLength={12} /><br />
                    <button className="modal-set__btn" type='submit'>Enter</button>
                    </>
                ): (
                    <p className='modal-set__text'>
                        К сожалению, это последнее место.<br/>
                        Ваш результат не будет сохранен.(
                    </p>
                )}
            
            <button className="modal-set__btn modal-set__bg2" onClick={() => restart()}>Закрыть</button>
        </form>)


    return (
        <>
            {onePlayerForm}
        </>
    )
}
const mapStateToProps = ({ word, score, records  }: IState) => ({ word, score, records  })
export default connect(mapStateToProps, actions)(EndModal)
