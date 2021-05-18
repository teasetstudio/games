import React, { useRef } from 'react'
import { connect } from "react-redux"

interface IAttempts {
    hummer?: string,
    attempts: number[],
    wrongLetters: string[]
}
const Attempts = ({ hummer, attempts, wrongLetters }: IAttempts) => {

    // hummer animation (on wrong letter inputed)
    const hummerImg = useRef<HTMLImageElement>(null);
    const attemptDivList = useRef<HTMLDivElement>(null);
    let leftPos: number = -1;
    if ( attemptDivList.current && wrongLetters.length !== 0 && hummerImg.current ) {
        // @ts-ignore
        leftPos = attemptDivList.current.children[wrongLetters.length - 1].offsetLeft + 23;
        let curLeftPos: number = +hummerImg.current.style.left.replace('px','');
        // curLeftPos !== leftPos - it prevents animtaion on right letter input
        if (curLeftPos !== leftPos) {
            hummerImg.current.style.left = leftPos + 'px';
            hummerImg.current.animate ([
                {transform: 'rotate(0deg)'},
                {transform: 'rotate(-47deg)'},
                {transform: 'rotate(-24deg)'},
                {transform: 'rotate(0deg)'}
            ],  {
            duration: 1000,
            easing: 'ease-in',
            iterations: 1
            });
        }
    } // end hummer anim

    return (
        <div className='attempts'>
            <div className='container'>
                <div className='attempts__hummer-area'>
                    <img className='attempts__hummer-img' ref={hummerImg} src={hummer} alt="" height='90' />
                </div>
                <div className='attempts__circle' ref={attemptDivList}>
                    {attempts.map((item, id) => 
                        <div key={id} className={`attempts__item ${item===1 ? '' : 'attempts__item_lose'}`}></div>
                    )}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({ attempts, wrongLetters }: IAttempts) =>({ attempts, wrongLetters });
export default connect(mapStateToProps)(Attempts)