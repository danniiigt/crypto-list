import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {generate as id} from "shortid"
import { useHistory } from 'react-router';

//STYLES
const TableWrapper = styled.table`
    margin-top: ${({noMarginTop}) => noMarginTop ? "0" : "10px"};
    width: 100%;
    font-weight: lighter;
    background-color: ${({color}) => color ? "#131722" : "#282c34"};

    .others-td{
        display: none;

        @media only screen and (min-width: 860px) {
            display: table-cell;
            text-align: center;
        }
    }

    tr{
        cursor: pointer;

        &:hover{
            background-color: #30363a;
        }
    }

    tr.selected{
        background-color: #30363a;
    }

    .contract-btn{
        position: absolute;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;

        h1{
            transition: all  ease-in-out;
            text-align: center;
            width: fit-content;
            background-color: #47484b;
            font-size: 1em;
            font-weight: lighter;
            padding: 0 10px;
            margin-top: -2px;
            width: 100px;

            &.up{
                margin-top: -25px;
                background-color: #282c34;
                border: 1px solid #47484b;
                border-bottom: none;
            }
        }
    }

    td.last-child-1{
        text-align: right;
        padding-right: 5px;

        span{
            display: block;
            font-size: 0.8em;

            @media only screen and (min-width: 860px) {
                display: none;
            }
        }

        @media only screen and (min-width: 860px) {
            text-align: center;
        }
    }

    td:first-child{
        padding: 0 5px;
        text-align: center;
    }

    td.text-success,
    span.text-success{
        color: #17be17;

        &:before{
            content: "+";
        }
    }

    td.text-danger,
    span.text-danger{
        color: #ce1111;
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
            /* height: 52px; */

            height: ${({tiny}) => tiny ? "52px" : "42px"};

            @media only screen and (min-width: 860px) {
                height: 45px;
            }
        }
    }

    td.coin{
        display: flex;
        align-items: center;
        padding-left: 5px;
        padding-left: ${({noEnumeration}) => noEnumeration ? "10px" : "0"};

        img{
            max-width: 22px;
            max-height: 22px;
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

const TableFooter = styled.div`
    width: 100%;
    height: 50px;
    background-color: #282c34;
    display: flex;
    justify-content: flex-end;

    .cryptos-qtty{
        display: flex;
        align-items: center;
        margin-right: 5px;
        
        input{
            min-height: 32px;
            min-width: 200px;
            background-color: #282c34;
            border: 2px solid #161616;
            color: #c7c7c7;
            padding-left: 5px;

            &:focus{
                outline: none;
            }
        }
    }

    .add-cryptos-box{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 4px;

        button{
            color: #c7c7c7;
            background-color: #282c34;
            border: 2px solid #161616;
            min-width: 51px;
            min-height: 32px;
            margin-right: 5px;
        }
    }
`

const CryptoTable = ({currency, searchBox, history, noHeader, tiny, tableFooter, color, noEnumeration, noMarginTop, location, contract, cryptoSelected}) =>{
    //STATE
    const [cryptos, setCryptos] = useState([])
    const [cryptoCount, setCryptoCount] = useState(75)
    const [isContract, setIsContract] = useState(false)
    const [intro, setIntro] = useState(true)

    //REFS
    const countRef = useRef()

    //FUNCTIONS
    const formatNumbers = (data) =>{
        if(currency && cryptoCount){
            if(data !== undefined){
                if(currency.name === "eur"){
                    for (let index = 0; index < data.length; index++) {
                        data[index].current_price = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].current_price))
                        data[index].high_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].high_24h))
                        data[index].low_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].low_24h))
                        data[index].market_cap = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data[index].market_cap))
                        data[index].price_change_percentage_24h = data[index].price_change_percentage_24h.toFixed(2)
    
                    }
                } else if(currency.name === "USD" || currency.name === "usd"){
                    for (let index = 0; index < data.length; index++) {
                        data[index].current_price = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].current_price))
                        data[index].high_24h = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].high_24h))
                        data[index].low_24h = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].low_24h))
                        data[index].market_cap = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data[index].market_cap))
                        data[index].price_change_percentage_24h = data[index].price_change_percentage_24h.toFixed(2)
                    }
                } else if(currency.name === "jpy"){
                    for (let index = 0; index < data.length; index++) {
                        data[index].current_price = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].current_price))
                        data[index].high_24h = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].high_24h))
                        data[index].low_24h = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].low_24h))
                        data[index].market_cap = (new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(data[index].market_cap))
                        data[index].price_change_percentage_24h = data[index].price_change_percentage_24h.toFixed(2)
                    }
                } else if(currency.name === "gbp"){
                    for (let index = 0; index < data.length; index++) {
                        data[index].current_price = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].current_price))
                        data[index].high_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].high_24h))
                        data[index].low_24h = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].low_24h))
                        data[index].market_cap = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GBP' }).format(data[index].market_cap))
                        data[index].price_change_percentage_24h = data[index].price_change_percentage_24h.toFixed(2)
                    }
                }
            }
        }
    }
    
    const getCryptoData = async (url) =>{
        const response = await fetch(url)
        const data = await response.json()
        formatNumbers(data)

        if(searchBox){
            if(searchBox.current.value !== ""){
                const searchedCoins = []
    
                const resultName = data.filter((crypto) => crypto.name.toLowerCase().includes(searchBox.current.value.toLowerCase()))
                const resultSymbol = data.filter((crypto) => crypto.symbol.toLowerCase().includes(searchBox.current.value.toLowerCase()))
                const result = resultName.concat(resultSymbol)
    
                //REMOVES REPEATED COINS
                result.forEach((item) => {
                    if(!searchedCoins.includes(item)) {
                        searchedCoins.push(item)
                    }
                })
    
                setCryptos(searchedCoins)
            } else{
                setCryptos(data)
            }
        } else{
            setCryptos(data)
        }
    }

    const incrementCryptoCount = (amount, input) =>{
        if(cryptoCount + amount >= 25 && cryptoCount + amount < 250 && input == false){
            setCryptoCount(cryptoCount + amount)
        } else if(cryptoCount === 225 && amount > 25 && input == false){
            setCryptoCount(250)
        } else if(amount >= 25 && amount <= 250 && input == true){
            setCryptoCount(amount)
        }
    }

    const cryptoLink = (cryptoName, cryptoID) =>{
        if(location.pathname != `/chart/${cryptoName.toLowerCase()}`){
            history.push(`/chart/${cryptoName.toLowerCase()}`, {cryptoID, cryptoName})
        }
    }

    const endIntro = () =>{
        setIntro(true)
        setTimeout(() => {
            setIntro(false)
        }, 3000);
    }

    const changeContract = () =>{
        setTimeout(() => {
            setIsContract(!isContract)
        }, 750);
    }

    useEffect(() => {
        endIntro()
        const cryptoInterval = setInterval(() => {
            if(currency && cryptoCount){
                getCryptoData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=${cryptoCount}&page=1&sparkline=false`)
            }
        }, 1500);
        return () => clearInterval(cryptoInterval)
    }, [currency, cryptoCount, location])  


    return(
        <>
            <TableWrapper tiny={tiny} color={color} noEnumeration={noEnumeration} noMarginTop={noMarginTop} contract={contract}>
                {!noHeader && (
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
                )}
                {contract && !intro && (
                    <div className="contract-btn">
                        {!isContract && (
                            <h1 className="down" onClick={changeContract}>CONTRACT</h1>
                        )}
                        {isContract && (
                            <h1 className="up" onClick={changeContract}>EXPAND</h1>
                        )}
                    </div>
                )}
                <tbody>
                    {cryptos.map((crypto, index) => (
                        <tr key={id()} onClick={() => cryptoLink(crypto.name, crypto.id)} className={`${cryptoSelected === crypto.name ? "selected" : ""} coin-tr`}>
                            {!noEnumeration && (
                                <td key={id()}>{index + 1}</td>
                            )}
                            <td className="coin" key={id()}>
                                <img src={crypto.image} alt="" />
                                <span>{crypto.name}</span>
                                <span className="abreviature">{` ${(crypto.symbol).toUpperCase()}`}</span>
                            </td>
                            <td className="last-child-1" key={id()}>{`${crypto.current_price}`}
                                <span className={`${crypto.price_change_percentage_24h > 0 ? "text-success" : "text-danger"} others-td`}>
                                    {`${crypto.price_change_percentage_24h}%`}
                                </span>
                            </td>
                            <td 
                                className={`${crypto.price_change_percentage_24h > 0 ? "text-success" : "text-danger"} others-td`} 
                                key={id()}>{`${crypto.price_change_percentage_24h}%`}
                            </td>
                            <td className="others-td" key={id()}>{`${crypto.high_24h}`}</td>
                            <td className="others-td" key={id()}>{`${crypto.low_24h}`}</td>
                            <td className="others-td" key={id()}>{`${crypto.market_cap}`}</td>
                        </tr>
                    ))}
                </tbody>
            </TableWrapper>
            {tableFooter && (
                <TableFooter>
                    <div className="cryptos-qtty">
                        <input 
                            type="number" 
                            placeholder={`Number of cryptos (${cryptoCount})`} 
                            min="1" 
                            max="250" 
                            ref={countRef}
                            onChange={() => incrementCryptoCount(parseInt(countRef.current.value), true)}
                        />
                    </div>
                    <div className="add-cryptos-box">
                        <button onClick={() => incrementCryptoCount(-50, false)}>-50</button>
                        <button onClick={() => incrementCryptoCount(50, false)}>+50</button>
                    </div>
                </TableFooter>
            )}
        </>
    )
}

export default CryptoTable