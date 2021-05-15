interface IMemoItem {
    id: number,
    imgNum: number,
    isOpen: boolean | string,
    clicks: number,
    openMemo(id: number, imgNum: number): void
}

const MemoItem = ({id, imgNum, isOpen, clicks, openMemo}: IMemoItem) => {
    const img: string = require(`../../img/${imgNum}.png`).default;
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