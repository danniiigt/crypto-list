import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

//IMAGES
import logo2 from "../assets/images/logo2.png"

//COMPONENTS
import CryptoTable from '../components/CryptoTable';
import FilterTable from '../components/FilterTable';
import SlideText from "../components/SlideText";
import Menu from "../components/Menu";

//STYLES
import GlobalStyles from '../styles/GlobalStyles';

const ContentWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;

    .filter-box{
        width: 35%;
        margin-right: 15px;
        display: none;
        max-width: 500px;
    }

    .crypto-box{
        width: 100%;
    }

    @media only screen and (min-width: 860px) {
        padding: 15px 20px;
    }

    @media only screen and (min-width: 1200px) {
        .filter-box{
            display: block;
        }
    }
`
const HeaderWrapper = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
`
const SearchBox = styled.input`
    width: 78%;
    height: 40px;
    text-align: center;
    background-color: #282c34;
    border: none;
    color: #c7c7c7;

    &:focus{
        outline: none;
    }

    @media only screen and (min-width: 860px) {
        width: 79%;
    }
    @media only screen and (min-width: 1200px) {
        width: 84.5%;
    }
    @media only screen and (min-width: 1600px) {
        width: 89.5%;
    }
`
const CurrencyBox = styled.select`
    width: 20%;
    height: 40px;
    background-color: #282c34;
    border: none;
    color: #c7c7c7;
    padding: 0 10px;

    &:focus{
        outline: none;
    }

    @media only screen and (min-width: 1200px) {
        width: 15%;
    }
    @media only screen and (min-width: 1600px) {
        width: 10%;
    }
`
const IntroWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(40, 44, 52);
    /* background-color: black; */
    position: absolute;

    &.disolve{
        animation: fadeOut 2s;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to{
            opacity: 0;
        }
    }

    img{
        margin-bottom: 20px;

        &.rotate{
            transform: rotate(360deg);
            transition: all 1s ease-in-out;
            scale: 1000px 1000px;
        }

        &.not-visible{
            display: none;
        }
    }

    h1{
        &.not-visible{
            color:rgb(40, 44, 52);
        } 
    }
`

const HomePage = ({history, location}) =>{
    //STATE
    const [currency, setCurrency] = useState({
        symbol: "$",
        name: "USD"
    })

    const [intro, setIntro] = useState(true)
    
    //REFS
    const currencyRef = useRef()
    const searchBoxRef = useRef()
    const introImg = useRef()
    const introWrapper = useRef()
    const introH1 = useRef()

    //FUNCTIONS
    const changeCurrency = () =>{
        const selectedIndex = currencyRef.current.options.selectedIndex
        const selectedName = currencyRef.current.options[selectedIndex].textContent

        if(selectedName === "EUR"){
            setCurrency({
                symbol: "???",
                name: "eur"
            })
        } else if(selectedName === "USD") {
            setCurrency({
                symbol: "$",
                name: "usd"
            })
        } else if(selectedName === "JPY"){
            setCurrency({
                symbol: "??",
                name: "jpy"
            })
        } else if(selectedName === "GBP"){
            setCurrency({
                symbol: "??",
                name: "gbp"
            })
        }
    }

    const closeIntro = () =>{
        setTimeout(() => {
            if(introImg.current){
                introImg.current.classList.add("rotate")
            }
        }, 250);

        setTimeout(() => {
            if(introImg.current){
                introH1.current.classList.toggle("not-visible")
            }
        }, 1250);
        setTimeout(() => {
            if(introImg.current){
                introH1.current.classList.toggle("not-visible")
            }
        }, 1330);
        setTimeout(() => {
            if(introImg.current){
                introH1.current.classList.toggle("not-visible")
            }
        }, 1410);
        setTimeout(() => {
            if(introImg.current){
                introH1.current.classList.toggle("not-visible")
            }
        }, 1490);

        setTimeout(() => {
            if(introImg.current){
                introWrapper.current.classList.add("disolve")
            }
        }, 2250);
        
        setTimeout(() => {
            setIntro(false)
        }, 2750);
    }

    useEffect(() => {
        closeIntro()
    }, []);

    //PAGE TITLE
    document.title = "Home - Crypto App"

    return(
        <>
            <GlobalStyles />
            {intro && (
                <IntroWrapper ref={introWrapper}>
                    <img src={logo2} alt="Logo" ref={introImg}/>
                    <h1 ref={introH1}>Crypto List</h1>
                </IntroWrapper>
            )}
            <Menu history={history} location={location}/>
            <ContentWrapper>
                <div className="filter-box">
                    <FilterTable />
                </div>
                <div className="crypto-box">
                    {/* <HeaderWrapper>
                        <SearchBox placeholder="Search a Coin" ref={searchBoxRef}/>
                        <CurrencyBox ref={currencyRef} onChange={changeCurrency}>
                            <option value="">USD</option>
                            <option value="">EUR</option>
                            <option value="">JPY</option>
                            <option value="">GBP</option>
                        </CurrencyBox>
                    </HeaderWrapper> */}
                    <CryptoTable currency={currency} searchBox={searchBoxRef} history={history} tiny={true} tableFooter={true} location={location}/>
                </div>
            </ContentWrapper>
        </>
    )
}

export default HomePage