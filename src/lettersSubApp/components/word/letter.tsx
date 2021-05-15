type TLetter = {
    letter: string,
    isOpen: boolean
};
const Letter = ({letter, isOpen}: TLetter) => {
    return (
        <div className='letter'>
            <div className={`letter__wrapper ${isOpen ? 'letter__wrapper_open' : ''}`}>
                <div className='letter__item'>{letter}</div>
                <div className='letter__backface'></div>
            </div>
        </div>
    )
}

export default Letter
