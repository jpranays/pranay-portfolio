import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
padding: 0;
margin: 0;
box-sizing: border-box;
}
body{
font-family: 'Poppins', sans-serif;
}  
::-webkit-scrollbar {
    width: 0.5rem;
}
::-webkit-scrollbar-track {
background:${({ theme }) => theme.body};
}
::-webkit-scrollbar-thumb {
background: #888;
border-radius: 1rem;
}
::-webkit-scrollbar-thumb:hover {
background: #555;
}
#projects,#contact,#interests{
    height : 100vh;
    width : 100%;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


`;
