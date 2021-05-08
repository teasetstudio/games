import { connect } from 'react-redux';
import * as actions from '../../memoActions';
import MemoItem from '../memoItem/memoItem';
import './memoTable.scss';

// type TTable = {
//     memoTable: any[],
//     tableSize: number,
//     clicks: number,
//     openMemo(id:number): void
// }
const MemoTable = ({ memoTable, tableSize, clicks, openMemo }: any) => {

    return (
        <div className={`memo-body container ${tableSize >=30 ? 'width-1700' : null}`}>
            {memoTable.map(({id, imgNum, isOpen}: any) => {
                return(
                    
                    <MemoItem key={id} id={id} imgNum={imgNum} isOpen={isOpen} clicks={clicks}
                        openMemo={openMemo} />
                )
            })}
        </div>
    )
}
type TState = {
    memoTable: any[],
    tableSize: number,
    score: {[key: string]: number}
}
const setStateToProps = ({ memoTable, tableSize, score }: TState) => ({
    memoTable,
    tableSize,
    clicks: score.clicks
 });

export default connect(setStateToProps, actions)(MemoTable);