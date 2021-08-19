import React from 'react';
import styled from 'styled-components';

//COMPONENTS

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

const App = () =>{
    return(
        <>
            <GlobalStyles />
            <ContentWrapper>
                <HeaderWrapper>
                    <SearchBox placeholder="Search a Coin"/>
                    <CurrencyBox>
                        <option value="">USD</option>
                        <option value="">EUR</option>
                        <option value="">CAD</option>
                        <option value="">JPY</option>
                    </CurrencyBox>
                </HeaderWrapper>
            </ContentWrapper>
        </>
    )
}

export default App