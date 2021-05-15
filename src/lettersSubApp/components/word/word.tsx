import { connect } from "react-redux";
import Letter from './letter';
import { TWord } from '../../types';

interface IWord {
    word: TWord,
    players: number
}
const Word = ({word, players}: IWord) => {
    console.log('word', word.map(({letter}) => letter).join(''))
    
    return (
        <div className='word-box'>
            {word.map(({letter, isOpen}, id) => <Letter key={id} letter={letter} isOpen={isOpen} />)}
        </div>
    )
}
const mapStateToProps = ({word, players}: IWord) => ({word, players})

export default connect(mapStateToProps)(Word)
