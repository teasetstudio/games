import { Helmet } from 'react-helmet-async';
import hummer from '../../img/hammer.png';
import Header from '../header/header';
import MainTitle from '../mainTitle/mainTitle';
import Attempts from '../attempts/attempts';
import Word from '../word/word';
import Organaizer from '../organaizer/organaizer';
import ModalWrapper from '../modals/modalWrapper';

const LetterApp = () => {
    return (
        <div className='letters-page'>
            <Helmet>
                <title>Letter Hummer</title>
                <link rel="icon" href={hummer} />
            </Helmet>
            <Header />
            <ModalWrapper />
            <MainTitle />
            <Attempts hummer={hummer} />
            <Word />
            <Organaizer />
        </div>
    )
}
export default LetterApp;