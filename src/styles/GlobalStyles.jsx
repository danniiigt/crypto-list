import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
      margin: 0;
      padding: 0;
      background-color:#141414;
      color: #c7c7c7;

        &::-webkit-scrollbar{
            width: 8px;
            background:#141414;
        }

        &::-webkit-scrollbar-thumb{
            width: 4px;
            background-color: #282c34;
            border-radius: 10px;
        }
    }  

  *{
      box-sizing: border-box;
      font-family: 'Space Grotesk', sans-serif;
    }

  h1,p{
      margin: 0;
    }
`

export default GlobalStyles