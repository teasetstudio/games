// actions
interface IPlayers {
    type: string,
    players: number
}
interface IRestart {
    type: string,
    size: number
}
interface IOpen {
    type: string,
    memoId: number,
    imgNum: number
}
interface ISave {
    type: string,
    name: string
}
export type Actions = IPlayers | IRestart | IOpen | ISave

// reducer