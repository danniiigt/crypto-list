import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

//STYLES
const TableWrapper = styled.table`
    margin-top: 10px;
    background-color: #282c34;
    width: 100%;
    font-weight: lighter;

    .others-td{
        display: none;
    }

    td.last-child-1{
        text-align: right;
        padding-right: 5px;
    }

    td:first-child{
        padding: 0 5px;
        text-align: center;
    }

    thead{
        td{
            border-bottom: 1.5px solid white;
            height: 47px;
        }
    }

    tbody{
        td{
            border-bottom: 1px solid #525252;
            height: 40px;
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
    const getCryptoData = async (url) =>{
        const response = await fetch(url)
        const data = await response.json()
        setCryptos(data)
    }

    const changeCurrency = () =>{
        console.log("change")
    }

    useEffect(() => {
        console.log("refresh");
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
                    </tr>
                </thead>
                <tbody onChange={changeCurrency}>
                    {cryptos.map((crypto, index) => (
                        <tr className="coin-tr">
                        <td>{index + 1}</td>
                        <td className="coin">
                            <img src={crypto.image} alt="" />
                            <span>{crypto.name}</span>
                            <span className="abreviature">{` ${(crypto.symbol).toUpperCase()}`}</span>
                        </td>
                        <td className="last-child-1">{`${crypto.current_price}${currency.symbol}`}</td>
                        <td className="others-td">2,733$</td>
                    </tr>
                    ))}
                </tbody>
            </TableWrapper>
        </>
    )
}

export default CryptoTable