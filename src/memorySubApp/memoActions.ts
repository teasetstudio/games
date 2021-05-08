const setPlayers = (players: number = 1) => ({
    type: 'SET__PLAYERS',
    players
})
const restart = (size:number = 20) => ({
    type: 'RESTART',
    size
})
const openMemo = (memoId: number, imgNum: number) => ({
    type: 'OPEN__MEMO',
    memoId,
    imgNum
})
const saveResult = (name: string) => ({
    type: 'SAVE__RESULT',
    name
})

export {
    setPlayers,
    restart,
    openMemo,
    saveResult
}