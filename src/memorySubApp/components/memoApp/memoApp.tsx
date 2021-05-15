import MemoTable from '../memoTable/memoTable';
import Header from '../header/header';
import { Helmet } from 'react-helmet-async';
import icon from '../../img/21.png';

const MemoApp = () => {
    return (
        <main className='memory-page'>
            <Helmet>
                <title>Memory</title>
                <link rel="icon" href={icon} />
            </Helmet>
            <Header />
            <MemoTable />
        </main>
    )
}
export default MemoApp;