import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from "react-chartjs-2"

const ChartWrapper = styled.div`
    width: 100%;
    height: 220px;
    background-color: #282c34;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Chart = ({location}) => {

    const [days, setDays] = useState([])
    const [prices, setPrices] = useState([])

    const state = {
        labels: days,
        datasets: [
            {
                label: location.state.cryptoName,
                fill: false,
                tension: 0,
                backgroundColor: '#a7a7a7',
                borderColor: '#a7a7a7',
                borderWidth: 2,
                pointBorderWidth: 0,
                data: prices,
                pointRadius: 2.2,
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

    useEffect(() => {
        getCryptoData()
    }, [location]);

    return (
        <>
            <ChartWrapper>
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
            </ChartWrapper>
        </>
    )
}

export default Chart