import './memoItem.scss';

interface IMemoItem {
    id: number,
    imgNum: number,
    isOpen: boolean,
    clicks: number,
    openMemo(): void
}

const MemoItem: React.FC<IMemoItem> = ({id, imgNum, isOpen, clicks, openMemo}: any) => {
    const img = require(`../../img/${imgNum}.png`).default;
    return (
        <div className="memo"
            onClick={() => isOpen ? false : openMemo(id, imgNum)} >
            <div className={`memo__wrapper
                ${isOpen ? 'open' : null}
                ${clicks ? null : 'zero-click'}`}>
                <div className={`memo__face 
                    ${isOpen==='blue' ? 'bluePlayer'
                    : isOpen==='red' ? 'redPlayer' : null}`}>
                    <img src={img} alt=''/>
                </div>
                <div className="memo__back"></div>
            </div>
        </div>
    )
}


export default MemoItem;