import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {generate as id} from "shortid"

//STYLES
const FilterBox = styled.div`
    background-color: #282c34;
    width: 100%;
    font-weight: lighter;
    height: 40vh;
    font-size: 0.9em;
    overflow-x: auto;

    &::-webkit-scrollbar{
        width: 3px;
    }

    &::-webkit-scrollbar-thumb{
        background-color: #3b3b3b;
        border-radius: 10px;
    }

    table{
        width: 100%;
        text-align: center;

        td:first-child{
            padding: 0 5px;
        }

        td.td-exchange{
            text-align: left;
            padding-left: 5px;
        }

        thead{
            td{
                border-bottom: 1.5px solid white;
                height: 40px;

                @media only screen and (min-width: 860px) {
                    height: 52px;
                }
            }
        }

        tbody{
            tr{
                &:hover{
                    cursor: pointer;
                    background-color: #2e2e2e;
                }
            }

            td{
                border-bottom: 1px solid #525252;
                height: 38px;

                a{
                    color: #c7c7c7;
                    text-decoration: none;

                    &:hover{
                        text-decoration: underline white;
                    }
                }
            }

            td.td-exchange{
                display: flex;
                align-items: center;

                img{
                    max-width: 23px;
                    max-height: 23px;
                    margin-right: 10px;
                    border-radius: 50%;
                }
            }
        }
    }

`

const FilterTable = () =>{
    const [exchanges, setExchanges] = useState([])
    //FUNCTIONS
    const getCryptoData = async (url) =>{
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        setExchanges(data)
    }

    useEffect(() => {
        getCryptoData(`https://api.coingecko.com/api/v3/exchanges`)
    }, [])

    return(
        <>
            <FilterBox>
                <table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td className="td-exchange">Exchange</td>
                            <td>Year Founded</td>
                            <td>Trust Score</td>
                        </tr>
                    </thead>
                    <tbody>
                        {exchanges.map((exchange, index) => (
                            <tr key={id()}>
                                <td>{index + 1}</td>
                                <td className="td-exchange">
                                    <img src={exchange.image} alt="" />
                                    <a href={exchange.url} target="_blank">{exchange.name}</a>
                                </td>
                                <td>{exchange.year_established}</td>
                                <td>{exchange.trust_score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </FilterBox>
        </>
    )
}

export default FilterTable