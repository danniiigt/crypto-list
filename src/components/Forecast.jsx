import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const ForecastWrapper = styled.div`
    padding: 0 18px;
    min-height: 25px;
    height: fit-content;
    margin: 25px 0;
    width: 100%;

    .forecast{
        display: ${({isPredicted}) => !isPredicted ? "flex" : "none"};
        justify-content: space-between;
    }

    .forecast-percentage{
        display: ${({isPredicted}) => isPredicted ? "block" : "none"};
    }

    h1{
        font-size: .9em;
        font-weight: lighter;
        display: inline-block;
        margin-right: 15px;
    }

    button{
        display: inline-block;
        margin-right: 8px;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 3px;
    }

    button.buy{
        background-color: #00800060;
    }

    button.sell{
        margin-right: 0;
        background-color: #ff000067;
    }

    .forecast-bar{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .buy-bar{
        width: ${({predictionData}) => predictionData.buy}%;
        height: 4px;
        background-color: green;

        label{
            text-align: right;
            font-size: 0.7em;
        }
    }

    .sell-bar{
        width: ${({predictionData}) => predictionData.sell}%;
        height: 4px;
        background-color: red;

        label{
            font-size: 0.7em;
        }
    }
`


const Forecast = ({location}) =>{

    const [isPredicted, setIsPredicted] = useState(false)
    const [predictionData, setPredictionData] = useState({})


    const getPredictionData = async () =>{
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${location.state.cryptoID}`)
        const data = await res.json()
        const prediction = {
            buy: data.sentiment_votes_up_percentage,
            sell: data.sentiment_votes_down_percentage
        }

        setPredictionData(prediction)
    }

    const showForecast = () =>{
        setIsPredicted(true)
    }

    useEffect(() => {
        setIsPredicted(false)
        getPredictionData()
    }, [location]);
    

    return(
        <>
            <ForecastWrapper isPredicted={isPredicted} predictionData={predictionData}>
                <div className="forecast">
                    <div className="header">
                        <h1>Predictions on {location.state.cryptoName}?</h1>
                    </div>
                    <div className="buttons">
                        <button className="buy" onClick={showForecast}>BUY</button>
                        <button className="sell" onClick={showForecast}>SELL</button>
                    </div>
                </div>
                <div className="forecast-percentage">
                    <div className="forecast-bar">
                        <div className="buy-bar">
                            <label htmlFor="">Buy - {predictionData.buy}%</label>
                        </div>
                        <div className="sell-bar">
                            <label htmlFor="">Sell - {predictionData.sell}%</label>
                        </div>
                    </div>
                </div>
            </ForecastWrapper>
        </>
    )
}

export default Forecast