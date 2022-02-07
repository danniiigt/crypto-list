import React from 'react';
import styled from 'styled-components';

const SlideWrapper = styled.div`
    width: 100%;
    height: 100%;

    .container{
        display: flex;
        justify-content: center;
        height: 40px;
        width: 100%;
        background-color: #282c34;
        align-items: center;
        padding: 10px;
        overflow-Y: auto;
        scroll-margin: 0;

        h1{
            display: flex;
            margin: 0;
            font-size: 11px;
            margin-right: 16px;
            color: rgb(161 167 187);
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
        }

        span{
            color: #935ce7;
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            padding-left: 6px;
        }
    }

    .sub-container{
        display: ${({slideView}) => slideView ? "flex" : "none"};
        width: 100%;
        height: 100%;
        text-align: left;

        transform: translateX(100%);
        transform: translateX(100%);
        transform: translateX(100%); 
        
        transition: all ease-in 2s
        animation: my-animation 15s linear infinite;
        animation: my-animation 15s linear infinite;
        animation: my-animation 15s linear infinite;
    }

    @keyframes my-animation {
        from { -webkit-transform: translateX(0%); }
        to { -webkit-transform: translateX(-185%); }
    }

    .container::-webkit-scrollbar{
        width: 0px;
        height: 0px;
    }
`

const Menu = ({slideView}) => {
    return (
        <>
            <SlideWrapper slideView={slideView}>
                <div className="container">
                    <div className="sub-container">
                        <h1>Cryptos:<span>17.344</span></h1>
                        <h1>Exchanges:<span>457</span></h1>
                        <h1>Market Cap:<span>$1,705,357,824,281</span></h1>
                        <h1>24h Vol:<span>$74,940,092,343</span></h1>
                        <h1>Dominance:<span>BTC: 41,8% ETH: 17.8%</span></h1>
                        <h1>Cryptos:<span>17.344</span></h1>
                        <h1>Exchanges:<span>457</span></h1>
                        <h1>Market Cap:<span>$1,705,357,824,281</span></h1>
                    </div>
                </div>
            </SlideWrapper>
        </>
    )
}

export default Menu