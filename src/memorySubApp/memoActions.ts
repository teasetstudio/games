import { Actions } from './types';

const setPlayers = (players: number = 1): Actions => ({
    type: 'SET__PLAYERS',
    players
})
const restart = (size:number = 20): Actions => ({
    type: 'RESTART',
    size
})
const openMemo = (memoId: number, imgNum: number): Actions => ({
    type: 'OPEN__MEMO',
    memoId,
    imgNum
})
const saveResult = (name: string): Actions => ({
    type: 'SAVE__RESULT',
    name
})

export {
    setPlayers,
    restart,
    openMemo,
    saveResult
}