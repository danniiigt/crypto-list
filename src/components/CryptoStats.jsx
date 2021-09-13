import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const CryptoStatsWrapper = styled.div`
    width: 100%;
    height: 100%; 
    padding: 0 16px;
    margin-bottom: 30px;
    
    .stats-box{
        background-color: #3c414d;
        border-radius: 6px;
        padding: 16px;

        .stats{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 17.5px;
            margin-bottom: 17.5px;
            border-bottom: 1px solid #5c5d5e;

            &:last-child {
                padding: 0;
                margin: 0;
                border: none;
            }

            
            .header{
                display: flex;
                align-items: center;

                h1{
                    display: inline-block;
                    margin-right: 10px;
                    font-size: 1em;
                    font-weight: lighter;
                }
                label{
                    font-size: 0.7em;
                    padding: 3px 4px;
                    background-color: #141414;
                    border-radius: 4px;
                }
            }

            .stat{
                h1{
                    font-size: 1em;
                    font-weight: lighter;
                    text-align: right;
                }
            }
        }
    }
`

const CryptoStats = ({location, crypto}) =>{
    //STATE
    const [cryptos, setCryptos] = useState(false)

    //FUNCTIONS
    const getCryptoData = async () =>{
        const cryptoName = location.state.cryptoID
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}`)
        const data = await res.json()
        formatNumbers(data)
        setCryptos(data)
    }

    const formatNumbers = (data) =>{
        if(data !== undefined){
            data.market_data.price_change_24h = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.market_data.price_change_24h))
            data.market_data.market_cap.usd = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.market_data.market_cap.usd))
            data.market_data.high_24h.usd = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.market_data.high_24h.usd))
            data.market_data.low_24h.usd = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.market_data.low_24h.usd))
            data.market_data.circulating_supply = (new Intl.NumberFormat('en-US').format(data.market_data.circulating_supply))
            data.market_data.max_supply = (new Intl.NumberFormat('en-US').format(data.market_data.max_supply))
        }
    }

    //USEEFFECT
    useEffect(() => {
        getCryptoData(crypto)
    }, [location]);

    return(
        <> 
            <CryptoStatsWrapper>
                {cryptos && (
                    <div className="stats-box">
                        <div className="stats">
                            <div className="header">
                                <h1>Market Rank</h1>
                            </div>
                            <div className="stat">
                                <h1>#{cryptos.market_cap_rank}</h1>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="header">
                                <h1>Price Change</h1>
                                <label htmlFor="">24h</label>
                            </div>
                            <div className="stat">
                                <h1> {cryptos.market_data.price_change_24h} </h1>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="header">
                                <h1>Market Cap</h1>
                            </div>
                            <div className="stat">
                                <h1>{cryptos.market_data.market_cap.usd}</h1>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="header">
                                <h1>Highest Price</h1>
                                <label htmlFor="">24h</label>
                            </div>
                            <div className="stat">
                                <h1>{cryptos.market_data.high_24h.usd}</h1>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="header">
                                <h1>Lowest Price</h1>
                                <label htmlFor="">24h</label>
                            </div>
                            <div className="stat">
                                <h1>{cryptos.market_data.low_24h.usd}</h1>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="header">
                                <h1>Circulating Supply</h1>
                            </div>
                            <div className="stat">
                                <h1>{cryptos.market_data.circulating_supply}</h1>
                            </div>
                        </div>
                        <div className="stats">
                            <div className="header">
                                <h1>Max Supply</h1>
                            </div>
                            <div className="stat">
                                {cryptos.market_data.max_supply == 0 ? <h1>Infinite</h1> : <h1>{cryptos.market_data.max_supply}</h1>}
                            </div>
                        </div>
                    </div>
                )}
            </CryptoStatsWrapper>
        </>
    )
}

export default CryptoStats