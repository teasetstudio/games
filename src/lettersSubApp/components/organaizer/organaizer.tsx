import LetterInput from './letterInput';
import Info from './info';
import UsedLetters from './usedLetters';


const Organaizer = () => {
    
    return (
        <div className="organaizer">
            <div className="organaizer__side">
                <UsedLetters />
            </div>
            
            <LetterInput />

            <div className="organaizer__side">
                <Info />
            </div>
        </div>
    )
}

export default  Organaizer
