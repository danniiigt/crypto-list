import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { Line } from "react-chartjs-2"

const ChartWrapper = styled.div`
    width: 100%;
    height: 220px;
    background-color: #282c34;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 15px;
    padding-bottom: 5px;

    img{
        max-width: 100px;
        max-height: 100px;
    }
`

const ChartLegend = styled.div`
    position: absolute;
    z-index: 1;
    top: 110px;
    padding: 0px 5px;
    background-color: #3c414d;
    width: 100%;

    h1{
        font-size: 0.8em;
        font-weight: lighter;
        text-align: center;
    }
`

const Chart = ({location}) => {

    const [days, setDays] = useState([])
    const [prices, setPrices] = useState([])
    const [chartLoading, setChartLoading] = useState(true)

    const state = {
        labels: days,
        datasets: [
            {
                label: `${location.state.cryptoName} - 30 Days`,
                fill: false,
                tension: 0.4,
                borderWidth: 2,
                borderColor: '#1d1f25',
                backgroundColor: '#3c414dac',
                pointBorderColor: '#1d1f25',
                pointBorderWidth: 1,
                pointBorderWidth: 1,
                pointRadius: 3.5,
                data: prices,
                fill: true,
            }
        ]
    }

    const getCryptoData = async () =>{
        const pricesData = []
        const dateData = []

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${location.state.cryptoID}/market_chart?vs_currency=usd&days=30&interval=daily`)
        const data = await res.json()

        //GET DATE
        for (let index = 0; index < data.prices.length; index++) {
            const dateArray = data.prices[index][0]
            const dateConverted = new Date(dateArray).toLocaleDateString()
            const dateSplited = dateConverted.split("/")
            const date = `${dateSplited[0]}/${dateSplited[1]}`
            dateData.push(date)
        }

        //GET PRICES
        for (let index = 0; index < data.prices.length; index++) {
            const price = data.prices[index][1].toFixed(2)
            pricesData.push(price)
            
        }

        //SET STATES
        setDays(dateData)
        setPrices(pricesData)
    }

    const changeChartLoading = () =>{
        setChartLoading(true)
        setTimeout(() => {
            setChartLoading(false)
        }, 1500);
    }

    useEffect(() => {
        getCryptoData()
        changeChartLoading()
    }, [location]);

    return (
        <>
            <ChartWrapper>
                {chartLoading && (
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Loader.gif" alt="Loading" />
                )}
                {!chartLoading && (
                    <ChartLegend>
                        <h1> {location.state.cryptoName} - Last 30 days </h1>
                    </ChartLegend>
                )}
                {!chartLoading && (
                    <Line
                        data={state}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                }
                            },
                        }}
                    />
                )}
            </ChartWrapper>
        </>
    )
}

export default Chart