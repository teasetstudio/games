import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../memoActions';
import { Rec } from '../../types';
import './winModal.scss';

interface IWinModal {
    players: number,
    tableSize: number,
    clicks: number,
    records: Rec,
    blueScore: number,
    redScore: number,
    saveResult(input: string): void,
    restart(size: number): void
}

const WinModal = ({ players, tableSize, clicks, records, redScore, blueScore, saveResult, restart }: IWinModal) => {
    let name = useRef<HTMLInputElement>(null);
    const whoWin: string | boolean = blueScore === redScore ? false : blueScore > redScore ? 'СИНИЙ' : 'КРАСНЫЙ';

    let place: number = 1;
    for (let rec of records){
        if (rec.score >= clicks){
            break;
        }
        place++;
    }

    function setName(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const inputName: string = name.current!.value

        saveResult(inputName);
    }

    useEffect(() => {
        if (name.current) {
            name.current.focus();
        }
    });

    const onePlayerForm: React.ReactElement = (
        <form onSubmit={setName}>
            <h3>Поздравляю!</h3>
            <p>Ты справился за <span className="modal__result">{clicks}</span> кликов.</p>
            <p>Ты занял <span className="modal__place">{place}</span> место.</p><br />
            {place < 10 ? (<>
                    <p>Введи своё имя, герой!</p>
                    <input type="text" ref={name} required /><br />
                    <button type='submit'>Ok</button>
                    </>
                ): (
                    <p>К сожалению, это последнее место.<br/>
                        Ваш результат не будет сохранен.(
                    </p>
                )}
            
            <button onClick={() => restart(tableSize)}>Close</button>
        </form>
    )

    const twoPlayersForm: React.ReactElement = (
        <form onSubmit={setName}>
            {whoWin ? (<h3>Победил <span className='winner'>{whoWin}</span></h3>) : <h3>Ничья</h3>}
            <p>Вместе вы использовали <span className="modal__result">{clicks}</span> кликов,</p>
            <p>заняв <span className="modal__place">{place}</span> место.</p><br />
            {place < 10 ? (<>
                    <p>Ваш общий результат будет сохранён!</p>
                    <p>Введите имя вашей команды.</p>
                    <input type="text" ref={name} required /><br />
                    <button type='submit'>Ok</button>
                    </>
                ): (
                    <p>К сожалению, это последнее место.<br/>
                        Ваш результат не будет сохранен.(
                    </p>
                )}
            
            <button onClick={() => restart(tableSize)}>Close</button>
        </form>
    )

    return (
        <div className='modal'>
            <div className='modal__menu'>
                {players === 1 ? onePlayerForm : twoPlayersForm}
            </div>
        </div>
    )
}
type TState = {
    players: number,
    tableSize: number,
    score: { [key: string]: number },
    records: Rec
}
const mapStateToProps = ({ players, tableSize, score, records }: TState) => ({
    players,
    tableSize,
    clicks: score.clicks,
    blueScore: score.blue,
    redScore: score.red,
    records
});

export default connect(mapStateToProps, actions)(WinModal);
