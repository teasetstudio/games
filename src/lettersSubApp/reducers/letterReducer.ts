import { AnyAction } from 'redux';
import { TWord, Rec, TScore } from '../types';
import { letterRec, letterRec2 } from './initialRecords';
import getRandWord from './words_db';

// get a guess word and transform it to array
const getWordArr = (word: string = getRandWord()): TWord => word.split('')
    .map(l => ({letter: l, isOpen: false}));

// transform number of attempts to array with attempts length ( 1 - available attempt, 0 - wasted )
const _transformAttempts = (attempts: number): number[] => Array(attempts).fill(1);

// save player records in local storage
function saveRec ( name: string, score: number, records: Rec, attempts: number): Rec {
    let newRec = [...records, {name, score}].sort((a, b) => b.score - a.score );
    newRec.pop();
    const category = attempts === 13 ? 'letterRecords' : 'letterRecords2';
    localStorage.setItem(category, JSON.stringify(newRec));
    return newRec;
}

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
    attempts: _transformAttempts(13),
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
        usedLetters, gameState, seconds, score, guessedWords, records } = state;
    const { type, letter, addScore, name, newWord, level } = actions;
    switch (type) {
        case 'START__LEVEL': {
            const statesToUpdate = players === 1 ? {
                word:  getWordArr(),
            } : {
                gameState: 'nextword',
                startedPlayer: curPlayer
            }
            return { ...state, ...statesToUpdate,
                attempts: _transformAttempts(level),
                wrongLetters: [],
                usedLetters: [],
                score: initialState.score,
                seconds: 0,
                guessedWords: 0,
                isTimerOn: false
            }}
        case 'ONE__PLAYER': {
            return { ...state,
                players: 1,
                word:  getWordArr(),
                attempts: [...attempts.fill(1)],
                curPlayer: 'blue',
                wrongLetters: [],
                usedLetters: [],
                score: initialState.score,
                seconds: 0,
                guessedWords: 0,
                gameState: 'game',
                records: letterRec,
                isTimerOn: false
            }}
        case 'TWO__PLAYERS': {
            const randNum: number = Math.floor(Math.random() * 2);
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
                records: letterRec2,
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
                word: getWordArr(newWord),
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
                word: getWordArr(),
                attempts: [...attempts.fill(1)],
                gameState: 'game',
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
                seconds: 0,
                gameState: 'nextword'
            }}
        case 'RESTART': {
            const updateGameState = players === 1 ? 'game' : 'nextword';
            return { ...state,
                word: getWordArr(),
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
                word: getWordArr(),
                attempts: [...attempts.fill(1)],
                score: initialState.score,
                wrongLetters: [],
                usedLetters: [],
                seconds: 0,
                guessedWords: 0,
                gameState: 'game',
                records: saveRec(name, score.blue, records, attempts.length)
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