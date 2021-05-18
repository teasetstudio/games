import { Actions } from './types';

const levelStart = (level: number = 7): Actions => ({
    type: 'START__LEVEL',
    level
})
const onePlayer = (): Actions => ({
    type: 'ONE__PLAYER'
})
const twoPlayers = (): Actions => ({
    type: 'TWO__PLAYERS'
})
const nextWord = (addScore: number = 0): Actions => ({
    type: 'NEXT__WORD',
    addScore
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
    newWord
})
const restart = (): Actions => ({
    type: 'RESTART'
})
const saveResult = (name: string): Actions => ({
    type: 'SAVE__REC',
    name
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