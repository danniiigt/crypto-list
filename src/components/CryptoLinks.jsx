import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom"

const LinksWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
`

const StyledLink = styled.a`
    background-color: #3c414d;
    color: #c7c7c7;
    text-decoration: none;
    min-height: 28px;
    min-width: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 7px;
    border-radius: 10px;

    &:last-child{
        margin-right: 0;
    }

    img{
        max-width: 15px;
        max-height: 15px;
        margin-right: 5px;
    }
`

const CryptoLinks = ({location}) =>{
    //USESTATE
    const [crypto, setCrypto] = useState(false)

    //FUNCTIONS
    const getCryptoLinks = async () =>{
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${location.state.cryptoID}`)
        const data = await res.json()
        setCrypto(data)
    }

    //USEEFFECT
    useEffect(() => {
        getCryptoLinks()
    }, [location]);

    return(
        <>
            {crypto && (
                <LinksWrapper>
                    <StyledLink href={crypto.links.homepage[0]} target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Chain_link_icon_slanted.png" alt="icon" />
                        Website
                    </StyledLink>
                    <StyledLink href={crypto.links.repos_url.github[0]} target="_blank">
                        <img src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/code-512.png" alt="icon" />
                        Src Code
                    </StyledLink>
                    <StyledLink href={crypto.links.blockchain_site[0]} target="_blank">
                        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/blockchain-5-539188.png" alt="icon" />
                        Blockchain
                    </StyledLink>
                </LinksWrapper>
            )}
        </>
    )
}

export default CryptoLinks