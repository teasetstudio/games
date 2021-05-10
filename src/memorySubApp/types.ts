// ACTIONS
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

// STATES
// main memo table array
export type MemoTable = {
    imgNum: number,
    id: number,
    isOpen: boolean | string
}[]
// reacords array
export type Rec = {name: string, score: number}[];
// score object
export type Score = { [key: string]: number };

