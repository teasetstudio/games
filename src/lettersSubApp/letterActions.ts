import { Actions, Rec } from './types';
import getWordArr from './reducers/initialWords';

const levelStart = (level: number = 7): Actions => ({
    type: 'START__LEVEL',
    level,
    wordArr: getWordArr()
})
const onePlayer = (): Actions => ({
    type: 'ONE__PLAYER',
    wordArr: getWordArr()
})
const twoPlayers = (): Actions => ({
    type: 'TWO__PLAYERS',
    wordArr: getWordArr(),
    randNum: Math.floor(Math.random() * 2)
})
const nextWord = (addScore: number = 0): Actions => ({
    type: 'NEXT__WORD',
    addScore,
    wordArr: getWordArr()
})
const lastWord = (): Actions => ({
    type: 'LAST__WORD'
})
const letterInputed = (letter: string): Actions => ({
    type: 'LETTER__INPUT',
    letter
})
const setInputedWord = (newWord: string): Actions => ({
    type: 'SET__INPUTED_WORD',
    wordArr: getWordArr(newWord)
})
const restart = (): Actions => ({
    type: 'RESTART',
    wordArr: getWordArr()
})
const saveResult = (newRec: Rec): Actions => ({
    type: 'SAVE__REC',
    newRec,
    wordArr: getWordArr()
})
const timerTick = (): Actions => ({
    type: 'TIMER__TICK'
})

export {
    levelStart,
    onePlayer,
    twoPlayers,
    nextWord,
    lastWord,
    letterInputed,
    setInputedWord,
    restart,
    saveResult,
    timerTick
}