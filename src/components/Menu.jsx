import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {generate as id} from "shortid"

import logo3 from "../assets/images/logo3.png"
import SlideText from "./SlideText"

const MenuWrapper = styled.div`
    background-color: #282c34;
    padding: 10px 15px;
    padding-left: 3px;
    border-bottom: 0.3px solid rgba(128, 128, 128, 0.24);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

    img{
        max-height: 45px;
        max-width: 240px;
    }

    svg{
        margin-right: 10px;
    }
`

const SearchView = styled.div`
    position: absolute;
    z-index: 10;
    min-height: 100vh;
    width: 100vw;
    display: ${({searchView}) => searchView ? "block" : "none"};
    background-color: #282c34;

    header.searchbox{
        height: 60px;
        padding: 10px 20px;
        box-shadow: rgb(128 138 157 / 8%) 0px 1px 2px, rgb(128 138 157 / 12%) 0px 4px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        svg{
            margin-right: 15px;
        }

        input{
            width: 80%;
            background: transparent;
            border: none;
            font-family: 'Inter';
            height: 40px;
            padding: 5px 15px;
            outline: none;
            color: white;
            font-size: 14px;
        }

        button{
            background:#1a1c21;
            border: none;
            color: white;
            padding: 5px 12px;
            border-radius: 8px;
        }
    }

    header{
        padding: 0 20px;
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        h1{
            font-family: 'Inter';  
            font-weight: 400;
            font-size: 12px;
            color: white;
            margin-right: 7px;
        }
    }

    .cryptos-box{
        padding: 0 20px;


        .crypto-item{
            height: 40px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            img{
                max-width: 23px;
                max-height: 23px;
                border-radius: 25px;
            }

            h1{
                font-size: 14px;
                color: white;
                font-weight: 500px;
                font-family 'Inter';
                width: 70%;

                span{
                    color: gray;
                    font-weight: 300;
                    margin-left: 10px;
                }
            }

            label{
                font-weight: lighter;
            }
        }
    }
`

const Menu = ({history, location}) => {

    const [cryptoTrend, setCryptoTrend] = useState([])
    const [cryptoSearch, setCryptoSearch] = useState([])
    const [searchView, setSearchView] = useState(false)
    const [slideView, setSlideView] = useState(false)

    const inputRef = useRef()


    const showSlideText = () => {
        //NO ESPERAR?? LOS 2.45 SEGUNDOS SI EL PATHNAME ES "/(CUALQUIER COSA)" POR ENDE SOLO LO HAR?? EN "/" PARA LA INTRO
        //HABR?? QUE FIXEARLO CUANDO SE HAGA EL CAMBIO DE CHARTPAGE A HOMEPAGE Y NO QUERRAMOS MOSTRAR LA INTRO

        if(location.pathname == "/") {
            setTimeout(() => {
                setSlideView(true)
            }, 2450);
        } else {
            setSlideView(true)
        }
    }

    const showSearchView = () => {
        
        if(searchView == false) {
            setSearchView(true)
            setSlideView(false)
        } else if(searchView == true) {
            setSearchView(false)
            setSlideView(true)
        }
    }

    const getTrendCrypto = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setCryptoTrend(data.coins)

    }

    const requestCryptoSearch = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setCryptoSearch(data.coins);
    }

    const handleCryptoSearch = () => {
        if(inputRef.current.value.length >= 2) {
            requestCryptoSearch(`https://api.coingecko.com/api/v3/search?query=${inputRef.current.value.trim()}`)
        } else if(inputRef.current.value.length == 0) {
            setCryptoSearch([])
        }
    }

    const cryptoLink = (cryptoName, cryptoID) =>{
        if(location.pathname != `/chart/${cryptoName.toLowerCase()}`){
            history.push(`/chart/${cryptoName.toLowerCase()}`, {cryptoID, cryptoName})
            showSearchView()
        }
    } 

    useEffect(() => {
        getTrendCrypto("https://api.coingecko.com/api/v3/search/trending")
        showSlideText()
    }, []);

    return (
        <>
            <SearchView searchView={searchView}>
                <header className='searchbox'>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={showSearchView} fill="none" height="24px" width="24px" viewBox="0 0 24 24" className="sc-16r8icm-0 jZwKai">
                        <path d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
                        </path>
                    </svg>
                    <input type="text" placeholder="What are you looking for?" onChange={handleCryptoSearch} ref={inputRef}/>
                    <button onClick={showSearchView}>Cancel</button>
                </header>

                <div className="trend-box">
                    <header>
                        <h1>Trending</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="16px" width="16px" viewBox="0 0 24 24" color="#FF775F" className="sc-16r8icm-0 hAMgar"><path d="M17.0881 9.42254C16.4368 8.90717 15.8155 8.35512 15.3012 7.71336C12.3755 4.06357 13.8912 1 13.8912 1C8.46026 3.18334 7.22337 6.64895 7.16462 9.22981L7.1675 9.2572C7.1675 9.2572 7.21498 10.7365 7.90791 12.3625C8.12481 12.8713 7.88299 13.4666 7.33195 13.6199C6.87638 13.7465 6.40822 13.5317 6.21571 13.1314C5.90413 12.4831 5.49262 11.4521 5.6109 10.7249C4.75064 11.817 4.1815 13.1452 4.03542 14.6184C3.65092 18.4924 6.43759 22.0879 10.4208 22.8488C14.9906 23.7217 19.3121 20.7182 19.9269 16.3623C20.3117 13.6367 19.1498 11.0538 17.0881 9.42254ZM14.3578 17.7393C14.3289 17.776 13.5893 18.6597 12.3501 18.7517C12.2829 18.7547 12.2124 18.7577 12.1452 18.7577C11.2902 18.7577 10.4226 18.3682 9.56103 17.5951L9.37219 17.4262L9.61243 17.3372C9.62843 17.3312 11.2742 16.7236 11.6778 15.4077C11.8155 14.9629 11.7707 14.4566 11.553 13.9842C11.2905 13.4075 10.7845 11.9564 11.7453 10.9041L11.9309 10.7015L12.0206 10.9561C12.0238 10.9714 12.6034 12.5911 13.9741 13.4379C14.3871 13.6957 14.6977 14.0086 14.8931 14.3644C15.2959 15.1132 15.533 16.3065 14.3578 17.7393Z"></path></svg>
                    </header>

                    <div className="cryptos-box">   
                        {cryptoSearch.length == 0 && cryptoTrend.map((crypto) => (
                            <div className="crypto-item" onClick={() => cryptoLink(crypto.item.name, crypto.item.id)} key={id()}>
                                <img src={crypto.item.small} alt="" />
                                <h1>{crypto.item.name} <span>{crypto.item.symbol}</span> </h1>
                                <label htmlFor="">#{crypto.item.market_cap_rank}</label>
                            </div>
                        ))}

                        {cryptoSearch.length > 0 && cryptoSearch.map((crypto) => (
                            <div className="crypto-item" onClick={() => cryptoLink(crypto.name, crypto.id)} key={id()}>
                                <img src={crypto.thumb} alt="crypto-logo" />
                                <h1>{crypto.name}<span>{crypto.symbol}</span></h1>
                                <label htmlFor="">#{crypto.market_cap_rank}</label>
                            </div>
                        ))}
                    </div>

                    
                </div>
            </SearchView>
            <MenuWrapper>
                <Link to="/">
                    <img src={logo3} alt="logo" />
                </Link>

                <div className="buttons-box">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={showSearchView} fill="none" height="24px" width="24px" viewBox="0 0 24 24" className="sc-16r8icm-0 jZwKai">
                        <path d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
                        </path>
                    </svg>
                    <img src="https://img.icons8.com/external-gradak-royyan-wijaya/24/ffffff/external-article-basic-interface-iii-gradak-royyan-wijaya-2.png" />
                </div>
            </MenuWrapper>
            <SlideText slideView={slideView}/>
        </>
    )
}

export default Menu