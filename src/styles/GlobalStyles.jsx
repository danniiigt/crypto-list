import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
      margin: 0;
      padding: 0;
      background:#141414;
      color: #c7c7c7;
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