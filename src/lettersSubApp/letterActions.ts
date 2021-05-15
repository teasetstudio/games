import { Actions } from './types';

const onePlayer = (): Actions => ({
    type: 'ONE__PLAYER'
})
const twoPlayers = (): Actions => ({
    type: 'TWO__PLAYERS'
})
const nextWord = (addScore: number = 1): Actions => ({
    type: 'NEXT__WORD',
    addScore
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

export {
    onePlayer,
    twoPlayers,
    nextWord,
    letterInputed,
    setInputedWord,
    restart,
    saveResult
}