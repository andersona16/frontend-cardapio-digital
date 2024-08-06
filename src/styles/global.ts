import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    font-family: "Inter", sans-serif;

  html, body {
    overflow-x: hidden;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;

    -webkit-font-smoothing: antialiased; 
  }

  input, select { 
    font-family: "Inter" ,sans-serif;    
  }

  button {
    cursor: pointer;
  }
}
`;
