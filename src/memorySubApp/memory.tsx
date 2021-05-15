import MemoApp from './components/memoApp/memoApp';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import memoReducer from './memoReducer';
import './memory.scss';

// For redux dev tools - google chrome extention
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const memoStore = createStore(memoReducer, composeEnhancers());

const Memory = () => {
    return (
        <Provider store={memoStore}>
            <MemoApp />
        </Provider>

    )
}
export default Memory;