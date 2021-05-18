import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import letterReducer from './reducers/letterReducer';
import LetterApp from './components/letterApp/letterApp';
import './letterHummer.scss';

// For redux dev tools - google chrome extention
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const letterStore = createStore(letterReducer, composeEnhancers());
const update = ()=>{
    // console.log('', letterStore.getState().word.map(({letter}) => letter).join(''))
}
letterStore.subscribe(update);

const LetterHummer = () => {
    return (
        <Provider store={letterStore}>
            <LetterApp />
        </Provider>
    )
}
export default LetterHummer;
