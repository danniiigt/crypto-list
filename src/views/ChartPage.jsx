import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components';

//COMPONENTS
import CryptoTable from '../components/CryptoTable';
import CryptoPercentChange from '../components/CryptoPercentChange';
import Forecast from '../components/Forecast';
import CryptoInfo from '../components/CryptoInfo';
import CryptoStats from '../components/CryptoStats';

//STYLES
const ChartWrapper = styled.div`
    min-height: 225px;
    width: 100%;
    display: block;
    border-bottom: 5px solid #47484b;
`

const CryptoTableWrapper = styled.div`
    overflow-x: auto;
    height: 270px;
    background-color: #282c34;
    border-bottom: 5px solid #47484b;
    transition: all 1s ease-in-out;

    &.hide{
        height: 0;
        border: none;
    }
`

const CryptoInfoWrapper = styled.div`
    min-height: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #282c34;
    padding-top: 10px;
`

const ChartPage = ({history, location}) =>{
    //REFS
    const TableWrapper = useRef()

    //FUNCTIONS
    const handleContract = (e) =>{
        console.dir(e.className)
        if(e.className === "down"){
            TableWrapper.current.classList.add("hide")
        } else if(e.className === "up"){
            TableWrapper.current.classList.remove("hide")
        }
    }

    //PAGE
    document.title = `${location.state.cryptoName} - Crypto App`
    return(
        <>
            <ChartWrapper />
            <CryptoTableWrapper onClick={(e) => handleContract(e.target)} ref={TableWrapper}>
                <CryptoTable 
                    currency={{symbol: "$",name: "USD"}} 
                    noHeader tiny={false} 
                    noEnumeration
                    noMarginTop
                    location={location}
                    history={history}
                    contract
                    cryptoSelected={location.state.cryptoName}
                />
            </CryptoTableWrapper>
            <CryptoInfoWrapper>
                <CryptoInfo location={location}/>
                <Forecast location={location}/>
                <CryptoStats location={location}/>
                <CryptoPercentChange location={location}/>
            </CryptoInfoWrapper>
        </>
    )
}

export default ChartPage