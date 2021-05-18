// ACTIONS
interface ISetLevel{
    type: string,
    level: number,
    wordArr: TWord
}
interface IOnePlayersAndRe {
    type: string,
    wordArr: TWord
}
interface ITwoPlayers{
    type: string,
    wordArr: TWord,
    randNum: number
}
interface INextWord{
    type: string,
    addScore: number,
    wordArr: TWord
}
interface IInputed {
    type: string,
    letter: string
}
interface ISaveRec {
    type: string,
    newRec: Rec,
    wordArr: TWord
}
interface ITick {
    type: string
}

export type Actions = ISetLevel | IOnePlayersAndRe | ITwoPlayers | INextWord | IInputed | ISaveRec | ITick
// reducer
export type TWord = {letter: string, isOpen: boolean}[]
// records array
export type Rec = {name: string, score: number}[];
// records array
export type TScore = {[key: string]: number};