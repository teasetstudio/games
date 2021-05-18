import { connect } from "react-redux";
import Letter from './letter';
import { TWord } from '../../types';

interface IWord {
    word: TWord,
    usedLetters: string[]
}
const Word = ({ word, usedLetters }: IWord) => {
    console.log('word', word.map(({letter}) => letter).join(''))
    return (
        <div className='word-box'>
            {word.map(({letter, isOpen}, id) => 
                <Letter key={id}
                    letter={letter}
                    isOpen={isOpen}
                    usedLetters={usedLetters} />)}
        </div>
    )
}
const mapStateToProps = ({ word, usedLetters }: IWord) => ({ word, usedLetters })

export default connect(mapStateToProps)(Word)
