import { connect } from "react-redux"

interface IAttempts {
    hummer?: string,
    attempts: number[]
}
const Attempts = ({hummer, attempts}: IAttempts) => {
    return (
        <div className='attempts'>
            <div className='container'>
                <div className='attempts__hummer-area'>
                    <img className='attempts__hummer-img' src={hummer} alt="" height='90' />
                </div>
                <div className='attempts__circle'>
                    {attempts.map((item, id) => 
                        <div key={id} className={`attempts__item ${item===1 ? '' : 'attempts__item_lose'}`}></div>
                    )}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({attempts}: IAttempts) =>({attempts});
export default connect(mapStateToProps)(Attempts)