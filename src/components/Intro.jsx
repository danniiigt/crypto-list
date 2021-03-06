import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

const IntroWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(40, 44, 52);
    /* background-color: black; */
    position: absolute;

    &.disolve{
        animation: fadeOut 2s;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to{
            opacity: 0;
        }
    }

    img{
        margin-bottom: 20px;

        &.rotate{
            transform: rotate(360deg);
            transition: all 1.5s ease-in-out;
            scale: 1000px 1000px;
        }

        &.not-visible{
            display: none;
        }
    }

    h1{
        &.not-visible{
            color:rgb(40, 44, 52);
        } 
    }
`

const Intro = ({cryptoImg, cryptoName, location}) =>{
    //STATE
    const [intro, setIntro] = useState(true)

    //REFS
    const introH1 = useRef()
    const introImg = useRef()
    const introWrapper = useRef()

    //USEEFFECT
    useEffect(() => {
        setIntro(true)
    }, [location]);

    return(
        <>  
            {intro && (
                <IntroWrapper ref={introWrapper}>
                    <img src={cryptoImg} ref={introImg} alt="Crypto-Image" />
                    <h1 ref={introH1}>{cryptoName}</h1>
                </IntroWrapper>
            )}
        </>
    )
}

export default Intro