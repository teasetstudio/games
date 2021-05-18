import { connect } from "react-redux";
import { Rec } from '../../types';

interface IState {
    records: Rec
}
const Records = ({ records }: IState) => {
    return (
        <div className="records">
            <div className='records__wrapper'>
                <p>Рекорды:</p>
                <ol>
                    {records.map(({name, score}, id) => {
                        return <li key={id}>{name}: {score}</li>
                    })}
                </ol>
            </div>
        </div>
    )
}
const mapStateToMap = ({ records }: IState) => ({ records })

export default connect(mapStateToMap)(Records)
