import React, { useEffect, useRef } from 'react'
import { connect } from "react-redux";
import * as actions from '../../letterActions';
import { Rec, TWord, TScore } from '../../types';
// styled in modalSet.scss

interface IState {
    word: TWord,
    score: TScore,
    attempts: number[],
    records: Rec,
    players: number,
    curPlayer: string,
    startedPlayer: string
}
interface IEndModal extends IState{
    saveResult(name: Rec): void,
    restart(): void,
    lastWord(): void
}

const EndModal = ({ word, score, attempts, records , players, curPlayer,
    startedPlayer, restart, saveResult, lastWord }: IEndModal) => {

    const wordString: string = word.map(({letter}) => letter).join('');
    const name = useRef<HTMLInputElement>(null);
    const btn = useRef<HTMLButtonElement>(null)

    let place: number = 1;
    for (let rec of records){
        if (rec.score <= score[curPlayer]){
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
            const inputName: string = name.current.value;
            let newRec: Rec = [...records, {name: inputName, score: score.blue}].sort((a, b) => b.score - a.score );
            newRec.pop();
            const category = attempts.length === 13 ? 'letterRecords' : 'letterRecords2';
            localStorage.setItem(category, JSON.stringify(newRec));
            saveResult(newRec);
        }
    }

    useEffect(() => {
        if (name.current){
            setTimeout(()=>{
                name.current!.focus();
            }, 200)
        }
        if (btn.current && !name.current){
            setTimeout(()=>{
                btn.current!.focus();
            }, 200)
        }
    })

    const onePlayerForm: React.ReactElement = (
        <form className='modal-set' onSubmit={setRec} onKeyDown={IsEnterPressed}>
            <h3>?????????? ???????? <br />
                <span className='modal-set__score'>{wordString}</span>
            </h3>
            <p className='modal-set__text'>???? ???????????? <span className="modal__result">{score[curPlayer]}</span> ??????????(??).</p>
            <p className='modal-set__text'>?????????? <span className="modal__place">{place}</span> ??????????.</p><br />
            {place < 10 ? (<>
                    <p className='modal-set__text'>?????????? ???????? ??????, ??????????!</p>
                    <input type="text" ref={name} required maxLength={12} /><br />
                    <button className="modal-set__btn" type='submit'>Enter</button>
                    </>
                ): (
                    <p className='modal-set__text'>
                        ?? ??????????????????, ?????? ?????????????????? ??????????.<br/>
                        ?????? ?????????????????? ???? ?????????? ????????????????.(
                    </p>
                )}
            
            <button className="modal-set__btn modal-set__bg2"  ref={btn} onClick={() => restart()}>??????????????</button>
        </form>)
    const twoPlayerForm: React.ReactElement = (
        <div className='modal-set'>
            {curPlayer !== startedPlayer && startedPlayer !== 'lastturn' ? ( <>
                <h3>?????????? ???????? <br />
                    <span className='modal-set__score'>{wordString}</span>
                </h3>
                <p>?????????? ???????????????? ?????? ???????? ?????? ?????????????????? ??????????????.</p>
                <button className="modal-set__btn modal-set__bg2" ref={btn} onClick={() => lastWord()}>??????????????</button>
                </> ) : ( <>
                {score.blue === score.purple ? (
                    <h3>??????????</h3>
                ) : ( <>
                    <h3>??????????????</h3>
                    {score.blue > score.purple ? ( <>
                        <h3><span className='modal-set__player modal-set__blue'>C????????</span></h3>
                        <p>???????????? {score.blue} ??????????(??)</p>
                    </> ) : ( <>
                        <h3><span className='modal-set__player modal-set__purple'>????????????????????</span></h3>
                        <p>???????????? {score.purple} ??????????(??)</p>
                    </>)}
                </>)}
                <button className="modal-set__btn modal-set__bg2" ref={btn} onClick={() => restart()}>??????????????</button>
                </>
            )}
            
        </div>)


    return (
        <>
            {players === 1 ? onePlayerForm : twoPlayerForm}
        </>
    )
}
const mapStateToProps = ({ word, score, attempts, records, players, curPlayer, startedPlayer  }: IState) =>
    ({ word, score, attempts, records, players, curPlayer, startedPlayer  })
export default connect(mapStateToProps, actions)(EndModal)
