import { connect } from 'react-redux'
import * as actions from '../../letterActions';

interface IOrgLeft {
    wrongLetters: string[]
}

const UsedLetters = ({ wrongLetters }: IOrgLeft) => {

    return (
        <div className="used-letters">
            {wrongLetters.map((item, id) => {
                return <p key={id} className='used-letters__item'>{item.toUpperCase()}</p>
            })}
        </div>
    )
}
const mapStateToProps = ({ wrongLetters }: IOrgLeft) => ({ wrongLetters })
export default connect(mapStateToProps, actions)(UsedLetters)