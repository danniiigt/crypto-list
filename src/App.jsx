import React, {useState, useRef} from 'react';
import styled from 'styled-components';

//COMPONENTS
import CryptoTable from './components/CryptoTable';

//STYLES
import GlobalStyles from './styles/GlobalStyles';

const ContentWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 15px;
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

`

const App = ({}) =>{
    //STATE
    const [currency, setCurrency] = useState({
        symbol: "$",
        name: "USD"
    })
    
    //REFS
    const currencyRef = useRef()

    //FUNCTIONS
    const changeCurrency = () =>{
        const selectedIndex = currencyRef.current.options.selectedIndex
        const selectedName = currencyRef.current.options[selectedIndex].textContent

        if(selectedName === "EUR"){
            setCurrency({
                symbol: "€",
                name: "eur"
            })
        } else if(selectedName === "USD") {
            setCurrency({
                symbol: "$",
                name: "usd"
            })
        } else if(selectedName === "JPY"){
            setCurrency({
                symbol: "¥",
                name: "jpy"
            })
        } else if(selectedName === "GBP"){
            setCurrency({
                symbol: "£",
                name: "gbp"
            })
        }
    }

    return(
        <>
            <GlobalStyles />
            <ContentWrapper>
                <HeaderWrapper>
                    <SearchBox placeholder="Search a Coin"/>
                    <CurrencyBox ref={currencyRef} onChange={changeCurrency}>
                        <option value="">USD</option>
                        <option value="">EUR</option>
                        <option value="">JPY</option>
                        <option value="">GBP</option>
                    </CurrencyBox>
                </HeaderWrapper>
                <CryptoTable currency={currency}/>
            </ContentWrapper>
        </>
    )
}

export default App