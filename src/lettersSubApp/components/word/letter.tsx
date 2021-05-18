type TLetter = {
    letter: string,
    isOpen: boolean,
    usedLetters: string[]
};
const Letter = ({ letter, isOpen, usedLetters }: TLetter) => {
    return (
        <div className='letter'>
            <div className={`letter__wrapper
                ${ isOpen ? 'letter__wrapper_open' : '' }
                ${ usedLetters.length ? '' : 'zero-click' }`}>
                <div className='letter__item'>{ letter }</div>
                <div className='letter__backface'></div>
            </div>
        </div>
    )
}

export default Letter
