import React from 'react';
import styled from 'styled-components';

//COMPONENTS
import CryptoTable from '../components/CryptoTable';
import CryptoPercentChange from '../components/CryptoPercentChange';

//STYLES
const ChartWrapper = styled.div`
    min-height: 225px;
    width: 100%;
    display: block;
    border-bottom: 5px solid #47484b;
`

const CryptoTableWrapper = styled.div`
    overflow-x: auto;
    height: 268px;
    background-color: #282c34;
    border-bottom: 5px solid #47484b;
`

const CryptoInfoWrapper = styled.div`
    min-height: 500px;
    width: 100%;
    display: block;
    background-color: #282c34;
    padding-top: 20px;
`

const ChartPage = ({history, location}) =>{
    return(
        <>
            <ChartWrapper />
            <CryptoTableWrapper>
                <CryptoTable 
                    currency={{symbol: "$",name: "USD"}} 
                    noHeader tiny={false} 
                    noEnumeration
                    noMarginTop
                    location={location}
                    history={history}
                />
            </CryptoTableWrapper>
            <CryptoInfoWrapper>
                <CryptoPercentChange location={location}/>
            </CryptoInfoWrapper>
        </>
    )
}

export default ChartPage