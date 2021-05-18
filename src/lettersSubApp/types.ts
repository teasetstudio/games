// ACTIONS
interface ISetLevel {
    type: string,
    level: number
}
interface ISetPlayers {
    type: string
}
interface INextWord {
    type: string,
    addScore: number
}
interface IInputed {
    type: string,
    letter: string
}
interface ISaveRec {
    type: string,
    name: string
}
interface IRestart {
    type: string
}
interface ISetWord {
    type: string,
    newWord: string
}
export type Actions = ISetLevel | ISetPlayers | INextWord | IInputed | ISaveRec | IRestart | ISetWord
// reducer
export type TWord = {letter: string, isOpen: boolean}[]
// records array
export type Rec = {name: string, score: number}[];
// records array
export type TScore = {[key: string]: number};