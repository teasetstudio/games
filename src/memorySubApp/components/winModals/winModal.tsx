import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../memoActions';
import './winModal.scss';

// interface IWinModal {
//     players: number,
//     tableSize: number,
//     click: number,
//     records: {name: string, score: number}[],
//     blueScore: number,
//     redScore: number,
//     saveResult(): void,
//     restart(): void
// }

const WinModal: React.FC = ({ players, tableSize, clicks, records, redScore, blueScore, saveResult, restart }: any) => {
    let name = useRef<HTMLInputElement>(null);
    const whoWin = blueScore === redScore ? false : blueScore > redScore ? 'СИНИЙ' : 'КРАСНЫЙ';

    let place: number = 1;
    for (let el of records){
        if (el.score >= clicks){
            break;
        }
        place++;
    }

    function setName(e: React.FormEvent) {
        e.preventDefault();
        const inputName = name.current!.value

        saveResult(inputName);
    }

    useEffect(() => {
        if (name.current) {
            name.current!.focus();
        }
    });

    const onePlayerForm = (
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

    const twoPlayersForm = (
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

const mapStateToProps = ({ players, score, tableSize, records }: any) => ({
    players,
    tableSize,
    clicks: score.clicks,
    blueScore: score.blue,
    redScore: score.red,
    records
});

export default connect(mapStateToProps, actions)(WinModal);