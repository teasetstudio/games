import { connect } from 'react-redux';
import GuessedModal from './guessedModal';
import EndModal from './endModal';
import WordInputModal from './wordInputModal';

interface IStateModal {
    gameState: string
}

const ModalWrapper = ({ gameState }: IStateModal) => {
    if (gameState === 'game') {
        return null
    }
    return (
        <div className="modal-wrapper">
            <div className='modal-wrapper__rel'>
                {gameState === 'guessed' ? <GuessedModal /> : null}
                {gameState === 'end' ? <EndModal /> : null}
                {gameState === 'nextword' ? <WordInputModal /> : null}
            </div>
        </div>
    )
}

const mapStateToProps = ({ gameState }: IStateModal) => ({ gameState });

export default connect(mapStateToProps)(ModalWrapper)
