import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const CryptoInfoWrapper = styled.div`
    padding: 0 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #47484b;

    .crypto-name{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .crypto-info{
            display: flex;
            align-items: center;
        }

        .crypto-price{
            h1{
                font-weight: 600;
            }
        }

        img{
            max-width: 30px;
            max-height: 30px;
            margin-right: 10px;
        }

        h1{
            font-size: 1.5em;
            font-weight: 500;
        }
    }
`



const CryptoInfo = ({location}) =>{

    const [crypto, setCrypto] = useState({})

    const getCryptoData = async () =>{
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${location.state.cryptoID}`)
        const data = await res.json()
        setCrypto(data)
    }

    useEffect(() => {
        getCryptoData()
    }, [location])

    return(
        <>  
            <CryptoInfoWrapper>
                {crypto.image && (
                    <div className="crypto-name">
                        <div className="crypto-info">
                            <img src={crypto.image.small} alt="" />
                            <h1>{crypto.name}</h1>
                        </div>
                        <div className="crypto-price">
                            <h1>{crypto.market_data.current_price.usd.toFixed(2)}$</h1>
                        </div>
                    </div>
                )}
                
            </CryptoInfoWrapper>
            
        </>
    )
}

export default CryptoInfo