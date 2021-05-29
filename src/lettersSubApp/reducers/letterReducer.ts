import { AnyAction } from 'redux';
import { TWord, Rec, TScore } from '../types';
import { letterRec, letterRec2 } from './initialRecords';
import getWordArr from './initialWords';

// reducer initial state
interface IState {
    players: number,
    score: TScore,
    curPlayer: string,
    startedPlayer: string,
    word: TWord,
    attempts: number[],
    wrongLetters: string[],
    usedLetters: string[],
    seconds: number,
    isTimerOn: boolean,
    guessedWords: number,
    gameState: string,
    records: Rec
}
const initialState: IState = {
    players: 1,
    curPlayer: 'blue',
    startedPlayer: 'blue',
    word: getWordArr(),
    attempts: [...Array(13).fill(1)],
    wrongLetters: [],
    usedLetters: [],
    score: {
        blue: 0,
        purple: 0
    },
    seconds: 0,
    isTimerOn: false,
    guessedWords: 0,
    gameState: 'game',
    records: letterRec
}
// reducer
const letterReducer = ( state = initialState, actions: AnyAction ) => {
    const { players, curPlayer, startedPlayer, word, attempts,wrongLetters,
        usedLetters, gameState, seconds, score, guessedWords } = state;
    const { type, letter, addScore, newRec, level, wordArr, randNum } = actions;
    switch (type) {
        case 'START__LEVEL': {
            const updateRec = level === 13 ? letterRec : letterRec2;
            const statesToUpdate = players === 1 ? {
                word:  wordArr,
            } : {
                gameState: 'nextword',
                startedPlayer: curPlayer
            }
            return { ...state, ...statesToUpdate,
                attempts: [...Array(level).fill(1)],
                wrongLetters: [],
                usedLetters: [],
                score: initialState.score,
                seconds: 0,
                guessedWords: 0,
                records: updateRec,
                isTimerOn: false
            }}
        case 'ONE__PLAYER': {
            return { ...state,
                players: 1,
                word:  wordArr,
                attempts: [...attempts.fill(1)],
                curPlayer: 'blue',
                wrongLetters: [],
                usedLetters: [],
                score: initialState.score,
                seconds: 0,
                guessedWords: 0,
                gameState: 'game',
                isTimerOn: false
            }}
        case 'TWO__PLAYERS': {
            const firstPlayer: string = randNum ? 'blue' : 'purple';
            return { ...state,
                players: 2,
                curPlayer: firstPlayer,
                startedPlayer: firstPlayer,
                wrongLetters: [],
                usedLetters: [],
                score: initialState.score,
                seconds: 0,
                guessedWords: 0,
                gameState: 'nextword',
                isTimerOn: false
            }}
        case 'LETTER__INPUT': {
            let isLetterRight: boolean = false;
            let updateGameState: string = gameState;
            let updateUsedLetters: string[] = [...usedLetters, letter];
            let updateTimerState: boolean = true;
            // inputed correct letter
            let correctLetters: number = 0;
            const updateWordState = word.map((item) => {
                if (!item.isOpen && item.letter === letter) {
                    item.isOpen = true;
                    isLetterRight = true;
                };
                // is won checker
                if (item.isOpen) {
                    correctLetters++;
                    if (correctLetters === word.length) {
                        updateTimerState = false;
                        updateGameState = 'guessed';
                    }
                }
                return item
            })
            // inputed wrong letter
            let attemptsUpdate: number[] = [...attempts];
            let updateWrongLetter: string[] = [...wrongLetters];
            if (!isLetterRight) {
                const index: number = attemptsUpdate.indexOf(1);
                attemptsUpdate[index] = 0;
                updateWrongLetter.push(letter);
                // is lose checker
                if (updateWrongLetter.length === attempts.length) {
                    updateTimerState = false;
                    updateGameState = 'end';
                }
            }
            return { ...state,
                word: updateWordState,
                attempts: attemptsUpdate,
                wrongLetters: updateWrongLetter,
                usedLetters: updateUsedLetters,
                gameState: updateGameState,
                isTimerOn: updateTimerState
            }}
        case 'SET__INPUTED_WORD': {
            let nextPlayer = curPlayer === 'blue' ? 'purple' : 'blue';
            return { ...state,
                curPlayer: nextPlayer,
                word: wordArr,
                attempts: [...attempts.fill(1)],
                wrongLetters: [],
                usedLetters: [],
                seconds: 0,
                gameState: 'game'
            }}
        case 'NEXT__WORD': {
            const updateScore: TScore = {...score};
            updateScore[curPlayer] += addScore;
            const statesToUpdate = players === 1 ? {
                word: wordArr,
                attempts: [...attempts.fill(1)],
                gameState: 'game',
                seconds: 0,
                wrongLetters: [],
                usedLetters: [],
            } : {
                gameState: startedPlayer !== 'lastturn' ? 'nextword' : 'end'
            }

            return { ...state, ...statesToUpdate,
                score: updateScore,
                guessedWords: guessedWords + 1
            }}
        case 'LAST__WORD': {
            return { ...state,
                startedPlayer: 'lastturn',
                gameState: 'nextword'
            }}
        case 'RESTART': {
            const updateGameState = players === 1 ? 'game' : 'nextword';
            return { ...state,
                word: wordArr,
                startedPlayer: curPlayer,
                attempts: [...attempts.fill(1)],
                score: initialState.score,
                wrongLetters: [],
                usedLetters: [],
                seconds: 0,
                guessedWords: 0,
                gameState: updateGameState,
                isTimerOn: false
            }}
        case 'SAVE__REC': {
            return { ...state,
                word: wordArr,
                attempts: [...attempts.fill(1)],
                score: initialState.score,
                wrongLetters: [],
                usedLetters: [],
                seconds: 0,
                guessedWords: 0,
                gameState: 'game',
                records: newRec
            }}
        case 'TIMER__TICK': {
            return { ...state,
                seconds: seconds + 1
            }}
        default:
            return state;
    }

}
export default letterReducer;