import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const PercentWrapper = styled.div`
    width: 100%;
    height: 100%;

    .row-1,
    .row-2{
        display: flex;
        justify-content: space-evenly;
    }

    .row-1{
        margin-bottom: 12px;
    }

    .row-2{
        justify-content: center;

        .change-item{
            margin-right: 15px;
        }
    }

    .change-item{
        text-align: center;
        display: inline-block;
        background-color: #1e2127;
        border-radius: 10px;
        padding: 7px 10px;
        min-width: 105px;
        height: 60px;

        &.positive{
            background-color: rgb(145, 235, 167, 0.15);
            color: rgb(41, 185, 77);

            h1::before{
                content: '+';
            }
        }

        &.negative{
            background-color: rgb(233, 136, 136, 0.15);
            color: rgb(211, 61, 61);
        }

        p{
            font-size: 0.7em;
            font-weight: 300;
            margin-bottom: 3px;
        }

        h1{
            font-size: 1.2em;
        }
    }
`   

const CryptoPercentChange = ({location}) =>{
    const [cryptos, setCryptos] = useState(false)

    const getCryptoData = async () =>{
        const cryptoName = location.state.cryptoID
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}`)
        const data = await res.json()
        setCryptos(data)
    }

    useEffect(() => {
        getCryptoData()
    }, [location]);

    return(
        <>
            <PercentWrapper>
                {cryptos && (
                    <>
                        <div className="row-1">
                            <div className={`${cryptos.market_data.price_change_percentage_24h > 0 ? "positive" : "negative"} change-item`} >
                                <p>24 H</p>
                                <h1>{cryptos.market_data.price_change_percentage_24h.toFixed(2)}%</h1>
                            </div>
                            <div className={`${cryptos.market_data.price_change_percentage_7d > 0 ? "positive" : "negative"} change-item`}>
                                <p>7 D</p>
                                <h1>{cryptos.market_data.price_change_percentage_7d.toFixed(2)}%</h1>
                            </div>
                            <div className={`${cryptos.market_data.price_change_percentage_14d > 0 ? "positive" : "negative"} change-item`}>
                                <p>14 D</p>
                                <h1>{cryptos.market_data.price_change_percentage_14d.toFixed(2)}%</h1>
                            </div>
                        </div>
                        <div className="row-2">
                            <div className={`${cryptos.market_data.price_change_percentage_30d > 0 ? "positive" : "negative"} change-item`}>
                                <p>1 M</p>
                                <h1>{cryptos.market_data.price_change_percentage_30d.toFixed(2)}%</h1>
                            </div>
                            <div className={`${cryptos.market_data.price_change_percentage_1y > 0 ? "positive" : "negative"} change-item`}>
                                <p>1 YEAR</p>
                                <h1>{cryptos.market_data.price_change_percentage_1y.toFixed(2)}%</h1>
                            </div>
                        </div>
                    </>
                )}
                
            </PercentWrapper>
        </>
    )
}

export default CryptoPercentChange