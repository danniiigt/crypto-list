import React from 'react';
import styled from 'styled-components';

import logo3 from "../assets/images/logo3.png"

const MenuWrapper = styled.div`
    background-color: #282c34;
    padding: 10px 15px;
    padding-left: 3px;
    border-bottom: 0.3px solid rgba(128, 128, 128, 0.24);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

    img{
        max-height: 45px;
        max-width: 240px;
    }

    svg{
        margin-right: 10px;
    }
`

const Menu = () => {
    return (
        <>
            <MenuWrapper>
                <img src={logo3} alt="logo" />

                <div className="buttons-box">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24px" width="24px" viewBox="0 0 24 24" className="sc-16r8icm-0 jZwKai">
                        <path d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454 4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
                        </path>
                    </svg>
                    <img src="https://img.icons8.com/external-gradak-royyan-wijaya/24/ffffff/external-article-basic-interface-iii-gradak-royyan-wijaya-2.png" />
                </div>
            </MenuWrapper>
        </>
    )
}

export default Menu