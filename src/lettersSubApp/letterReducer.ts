import { AnyAction } from 'redux';
import { TWord, Rec, TScore } from './types';
import { letterRec, letterRec2 } from './initialRecords';
import wordsArr from './words_db';

// get a guess word and transform it to array
const getRandWord = (): string => wordsArr[Math.floor(Math.random() * wordsArr.length)];
const getWordArr = (word: string = getRandWord()): TWord => word.split('')
    .map(l => ({letter: l, isOpen: false}));

// transform number of attempts to array with attempts length ( 1 - available attempt, 0 - wasted )
const _transformAttempts = (attempts: number): number[] => Array(attempts).fill(1);

// save player records in local storage
function saveRec ( name: string, score: number, records: Rec, attempts: number): Rec {
    let newRec = [...records, {name, score}].sort((a, b) => b.score - a.score );
    newRec.pop();
    const category = attempts === 7 ? 'letterRecords' : 'letterRecords2';
    localStorage.setItem(category, JSON.stringify(newRec));
    return newRec;
}

// reducer initial state
interface IState {
    players: number,
    score: TScore,
    curPlayer: string,
    word: TWord,
    attempts: number[],
    wrongLetters: string[],
    seconds: number,
    guessedWords: number,
    gameState: string,
    records: Rec
}
const initialState: IState = {
    players: 1,
    curPlayer: 'blue',
    word: getWordArr(),
    attempts: _transformAttempts(7),
    wrongLetters: [],
    score: {
        blue: 0,
        purple: 0
    },
    seconds: 0,
    guessedWords: 0,
    gameState: 'game',
    records: letterRec
}
// reducer
const letterReducer = ( state = initialState, actions: AnyAction ) => {
    const { players, curPlayer, word, attempts, wrongLetters, gameState, score, guessedWords, records } = state;
    const { type, letter, addScore, name, newWord } = actions;
    switch (type) {
        case 'ONE__PLAYER': {
            return { ...state,
                players: 1,
                word:  getWordArr(),
                attempts: [...attempts.fill(1)],
                curPlayer: 'blue',
                wrongLetters: [],
                score: initialState.score,
                seconds: 0,
                guessedWords: 0,
                gameState: 'game',
                records: letterRec
            }}
        case 'TWO__PLAYERS': {
            const randNum: number = Math.floor(Math.random() * 2);
            const firstPlayer: string = randNum ? 'blue' : 'purple';
            return { ...state,
                players: 2,
                curPlayer: firstPlayer,
                wrongLetters: [],
                score: initialState.score,
                seconds: 0,
                guessedWords: 0,
                gameState: 'nextword',
                records: letterRec2
            }}
        case 'LETTER__INPUT': {
            let isLetterRight: boolean = false;
            let updateGameState: string = gameState;
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
                    updateGameState = 'end';
                }
            }
            return { ...state,
                word: updateWordState,
                attempts: attemptsUpdate,
                wrongLetters: updateWrongLetter,
                gameState: updateGameState
            }}
        case 'SET__INPUTED_WORD': {
            let nextPlayer = curPlayer === 'blue' ? 'purple' : 'blue';
            return { ...state,
                curPlayer: nextPlayer,
                word: getWordArr(newWord),
                attempts: [...attempts.fill(1)],
                wrongLetters: [],
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
            } : {
                gameState: 'nextword'
            }

            return { ...state, ...statesToUpdate,
                seconds: 0,
                score: updateScore,
                guessedWords: guessedWords + 1,
            }}
        case 'RESTART': {
            return { ...state,
                word: getWordArr(),
                attempts: [...attempts.fill(1)],
                score: initialState.score,
                wrongLetters: [],
                seconds: 0,
                guessedWords: 0,
                gameState: 'game',
            }}
        case 'SAVE__REC': {
            return { ...state,
                word: getWordArr(),
                attempts: [...attempts.fill(1)],
                score: initialState.score,
                wrongLetters: [],
                seconds: 0,
                guessedWords: 0,
                gameState: 'game',
                records: saveRec(name, score.blue, records, attempts.length)
            }}
        default:
            return state;
    }

}
export default letterReducer;