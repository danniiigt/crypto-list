import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {generate as id} from "shortid"

//STYLES
const TableWrapper = styled.table`
    margin-top: 10px;
    background-color: #282c34;
    width: 100%;
    font-weight: lighter;

    .others-td{
        display: none;

        @media only screen and (min-width: 860px) {
            display: table-cell;
            text-align: center;
        }
    }

    td.last-child-1{
        text-align: right;
        padding-right: 5px;

        @media only screen and (min-width: 860px) {
            text-align: center;
        }
    }

    td:first-child{
        padding: 0 5px;
        text-align: center;
    }

    thead{
        td{
            border-bottom: 1.5px solid white;
            height: 47px;

            @media only screen and (min-width: 860px) {
                height: 52px;
            }
        }
    }

    tbody{
        td{
            border-bottom: 1px solid #525252;
            height: 40px;

            @media only screen and (min-width: 860px) {
                height: 45px;
            }
        }
    }

    td.coin{
        display: flex;
        align-items: center;
        padding-left: 5px;

        img{
            max-width: 16px;
            max-height: 16px;
            margin-right: 10px;

            @media only screen and (min-width: 860px) {
                max-width: 20px;
                max-height: 20px;
            }
            @media only screen and (min-width: 1200px) {
                max-width: 26px;
                max-height: 26px;
            }
        }
        span{
            margin-right: 10px;
        }
        span.abreviature{
            color: gray;
        }
    }

`

const CryptoTable = ({currency, url}) =>{
    //STATE
    const [cryptos, setCryptos] = useState([])

    //FUNCTIONS
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCryptoData = async (url) =>{
        const response = await fetch(url)
        const data = await response.json()
        formatNumbers(data)
        setCryptos(data)
    }

    const formatNumbers = (data) =>{
        if(data !== undefined){
            if(currency.name === "eur"){
                for (let index = 0; index < data.length; index++) {
                    data[index].current_price = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].current_price))
                    data[index].high_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].high_24h))
                    data[index].low_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].low_24h))
                    data[index].market_cap = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].market_cap))

                }
            } else if(currency.name === "USD" || currency.name === "usd"){
                for (let index = 0; index < data.length; index++) {
                    data[index].current_price = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].current_price))
                    data[index].high_24h = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].high_24h))
                    data[index].low_24h = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].low_24h))
                    data[index].market_cap = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].market_cap))

                }
            } else if(currency.name === "jpy"){
                for (let index = 0; index < data.length; index++) {
                    data[index].current_price = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].current_price))
                    data[index].high_24h = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].high_24h))
                    data[index].low_24h = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].low_24h))
                    data[index].market_cap = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].market_cap))
                }
            } else if(currency.name === "gbp"){
                for (let index = 0; index < data.length; index++) {
                    data[index].current_price = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].current_price))
                    data[index].high_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].high_24h))
                    data[index].low_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].low_24h))
                    data[index].market_cap = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].market_cap))
                }
            }
        }
    }

    useEffect(() => {
        getCryptoData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
    }, [currency])

    return(
        <>
            <TableWrapper>
                <thead>
                    <tr className="header-tr">
                        <td>#</td>
                        <td>Coin</td>
                        <td className="last-child-1">Price</td>
                        <td className="others-td">24H Change</td>
                        <td className="others-td">24H High</td>
                        <td className="others-td">24H LOW</td>
                        <td className="others-td">Market Cap</td>
                    </tr>
                </thead>
                <tbody>
                    {cryptos.map((crypto, index) => (
                        <tr className="coin-tr" key={id()}>
                        <td key={id()}>{index + 1}</td>
                        <td className="coin" key={id()}>
                            <img src={crypto.image} alt="" />
                            <span>{crypto.name}</span>
                            <span className="abreviature">{` ${(crypto.symbol).toUpperCase()}`}</span>
                        </td>
                        <td className="last-child-1" key={id()}>{`${crypto.current_price}`}</td>
                        <td className="others-td" key={id()}>{`${crypto.price_change_percentage_24h}%`}</td>
                        <td className="others-td" key={id()}>{`${crypto.high_24h}`}</td>
                        <td className="others-td" key={id()}>{`${crypto.low_24h}`}</td>
                        <td className="others-td" key={id()}>{`${crypto.market_cap}`}</td>
                    </tr>
                    ))}
                </tbody>
            </TableWrapper>
        </>
    )
}

export default CryptoTable