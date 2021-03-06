import { heroes, heroes2 } from './initialRecords';
import { AnyAction } from 'redux';
import { MemoTable, Rec, Score } from './types';

function setMemoTable(size: number = 20): MemoTable {
    const IMGNUM_IN_FOLDER = 130
    let memoTable: any[] = [];
    for (let i = 0; i < size; i++) {
        let randomNum: number = Math.ceil(Math.random() * IMGNUM_IN_FOLDER);
        let noRepeat: number = 0;
        while (noRepeat === 0) {
            noRepeat = 1;
            for (let i of memoTable) {
                if (i === randomNum) {
                    randomNum = (Math.ceil(Math.random() * IMGNUM_IN_FOLDER));
                    noRepeat = 0;
                    break;
                }
            }
        }
        memoTable.push(randomNum);
    }
    // concat - doubled array; map - convert to react elements; sort - shuffle array.
    return memoTable.concat(memoTable)
        .sort(() => Math.round(Math.random() * 100) - 50)
        .map((imgNum, id) => ({ imgNum, id, isOpen: false }));
}

function toggleMemo (memoTable: MemoTable, memoId: number, isOpen: boolean | string): MemoTable {
    const old = memoTable[memoId];
    let newItem = { ...old, isOpen: isOpen };
    const newArr = [...memoTable.slice(0, memoId), newItem, ...memoTable.slice(memoId + 1)];
    return newArr;
}

function saveRes ( name: string, score: number, records: Rec, tableSize: number): Rec {
    let newRec = [...records, {name, score}].sort((a: any,b: any) => a.score - b.score);
    newRec.pop();

    const category = tableSize === 20 ? 'heroes' : 'heroes2';
    localStorage.setItem(category, JSON.stringify(newRec));
    return newRec;
}

// memoReducer
interface IState {
    players: number,
    tableSize: number,
    memoTable: MemoTable,
    clickIndex: number,
    memoPair: any[],
    curPlayer: string,
    score: Score,
    isWin: boolean,
    records: Rec
}
const initialState: IState = {
    players: 1,
    tableSize: 20,
    memoTable: setMemoTable(),
    clickIndex: 1,
    memoPair: [],
    curPlayer: 'blue',
    score: {
        total: 0,
        blue: 0,
        red: 0,
        clicks: 0
    },
    isWin: false,
    records: heroes
}
const memoReducer = (state = initialState, action: AnyAction) => {
    const { players, tableSize, memoTable, clickIndex, memoPair, curPlayer, score, records } = state;
    const { memoId, imgNum, size, type, name } = action;
    switch (type) {
        case 'SET__PLAYERS':
            const randNum: number = action.players === 1 ? 1 : Math.floor(Math.random() * 2);
            const firstPlayer: string = randNum ? 'blue' : 'red';
            return { ...state, players: action.players,
                clickIndex: 1,
                curPlayer: firstPlayer,
                score: initialState.score,
                memoTable: setMemoTable(tableSize),
                isWin: false
            };

        case 'RESTART':
            return {
                ...state, memoTable: setMemoTable(size),
                clickIndex: 1,
                tableSize: size,
                score: initialState.score,
                isWin: false,
                records: size === 20 ? heroes : heroes2
            };

        case 'OPEN__MEMO':
            const [ memo1, memo2 ] = memoPair;
            // open pressed memo
            let newMemoTable: MemoTable = toggleMemo(memoTable, memoId, true);
            // variables
            let nextClickIndex: number = clickIndex + 1;
            let updatedMemoPair: any[] = [...memoPair, { memoId, imgNum }];
            let nextPlayer: string = curPlayer;
            let isWinChecker: boolean = false;
            const updatedScore: Score = { ...score };

            updatedScore.clicks++;
            // close unequal memos pair
            if (clickIndex === 1 && memo2) {
                newMemoTable = toggleMemo(newMemoTable, memo1.memoId, false);
                newMemoTable = toggleMemo(newMemoTable, memo2.memoId, false);
                updatedMemoPair = [{ memoId, imgNum }];
            }
            // save opened equal memos pair
            if (nextClickIndex === 3) {
                nextClickIndex = 1;
                if (memo1.imgNum === imgNum) {
                    newMemoTable = toggleMemo(newMemoTable, memo1.memoId, curPlayer);
                    newMemoTable = toggleMemo(newMemoTable, memoId, curPlayer);
                    updatedMemoPair = [];
                    updatedScore.total++;
                    updatedScore[curPlayer]++;
                    // is the game won?
                    if (updatedScore.total === tableSize){
                        isWinChecker = true;
                    }
                // change next player (if there are two players)
                } else if (players === 2){
                    nextPlayer = curPlayer === 'red' ? 'blue' : 'red';
                }
            }
            return {
                ...state,
                memoTable: newMemoTable,
                clickIndex: nextClickIndex,
                memoPair: updatedMemoPair,
                score: updatedScore,
                curPlayer: nextPlayer,
                isWin: isWinChecker
            };

        case 'SAVE__RESULT':
            return {
                ...state, memoTable: setMemoTable(tableSize),
                clickIndex: 1,
                score: initialState.score,
                isWin: false,
                records: saveRes(name, score.clicks, records, tableSize)
            };

        default:
            return state;
    }
}
export default memoReducer;