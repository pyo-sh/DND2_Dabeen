import styled from 'styled-components';
import {Button} from 'antd';

export const Modal = styled.div`
background: rgba(0, 0, 0, 0.5);
position: fixed;
left: 0;
top: 0;
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
z-index : 2;
& form {
    z-index : 2;
}
`;

export const Content = styled.div`
background: white;
padding: 1rem;
width: 420px;
height: 430px;
display: flex; 
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 5px;
& .loginHeader {
    display: flex;
    width: 100%;
    height : 40%;
    padding : 0 0 20px 20px;
    & .dabainLogo {
        width : 80%;
        margin : auto;
    }
    & .closeIcon {
    font-size: 20px;
    margin-left: auto;
    margin-bottom : auto;
}
}
& > .loginName {
    font-size: 40px;
    text-align: center;
    margin-bottom: 10px;
}

& > .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items : center;
    width : 100%;
}

& .loginKeeping {
    display: flex;
    justify-content: space-around; 
    width: 100%;
    margin-bottom: 20px;
}

& .confirmIDPasswordText {
    font-size: 14px;
    color: #FF4300; 
}
`;

export const InputUser = styled.input`
border: none;
border-bottom: 1px solid #BFC7CE;
width: 65%;
margin-bottom: 2vh;
font-size: 17.5px;

:hover{
    border-bottom: 2px solid #FF4300;
}
`;

export const LoginButton = styled(Button)`
margin-bottom: 20px;
width: 50%;
height: 50px;
margin-top: 20px;
background: #FF4300;
border: #FF4300;
color: white;
font-weight: bold;
font-size: 20px;
box-shadow: 2px 3px 5px #BFC7CE;

:hover {
    opacity: 0.9;
    background: #FF4300;
    border: #FF4300;
    color: white;
}
`;

export const ContentBottom = styled.div`
display: flex;
justify-content: space-evenly;
width: 100%;
& a {
    color : black;
    & :hover {
        color : #ff4300;
    }
}
& > .idAndPasswordFind{
    display: flex;
}
`;
