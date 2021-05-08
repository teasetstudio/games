import MemoApp from './components/memoApp/memoApp';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import memoReducer from './memoReducer';

const memoStore = createStore(memoReducer);

const update = () => {
    // localStorage.setItem('players', JSON.stringify(memoStore.getState().players));
    //console.log(memoStore.getState().score.total);
    //console.log(memoStore.getState().records);
}
memoStore.subscribe(update);

const Memory = () => {
    return (
        <Provider store={memoStore}>
            <MemoApp />
        </Provider>

    )
}
export default Memory;