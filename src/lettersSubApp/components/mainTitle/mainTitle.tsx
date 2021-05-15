import React from 'react';
import { connect } from 'react-redux';
import { TScore } from '../../types';

interface IMainTitle {
    players: number,
    curPlayer: number,
    score: TScore
}

const MainTitle = ({ players, curPlayer, score }: IMainTitle) => {
    const playerClass = players === 1 ? '' : curPlayer;
    return (
        <div className={`title title_${playerClass}`}>
            <p className="title__text">Letter</p>

            <div className="title__block title__blue">
                <p>Очки</p>
                <div className="title__score">{score.blue}</div>
            </div>
            {players===2 && 
                <div className="title__block title__purple">
                    <p>Очки</p>
                    <div className="title__score">{score.purple}</div>
                </div>}

            <p className="title__text">Hammer</p>
        </div>
    )
}
const mapStateToProps = ({ players, curPlayer, score }: IMainTitle) => ({ players, curPlayer, score })

export default connect(mapStateToProps)(MainTitle)
