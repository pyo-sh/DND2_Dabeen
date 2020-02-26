import styled from 'styled-components';
import { Button } from 'antd';

const FormDiv = styled.div`
  width: 100%;
  height : 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 80%;
    margin-bottom: 20px;
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

  @media only screen and (max-width: 425px) {
    width: 320px;
    height: 330px;
  }

  & > .loginForm {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  & .confirmIDPasswordText {
    font-size: 14px;
    color: #ff4300;
  }
`;

export const InputUser = styled.input`
  border: none;
  border-bottom: 1px solid #bfc7ce;
  width: 15vw;
  margin-bottom: 2vh;
  font-size: 17.5px;

  :hover {
    border-bottom: 2px solid #ff4300;
  }

  @media only screen and (max-width: 1440px) {
    width: 22vw;
  }

  @media only screen and (max-width: 1024px) {
    width: 30vw;
  }

  @media only screen and (max-width: 425px) {
    width: 40vw;
  }
`;

export const LoginButton = styled(Button)`
  margin-bottom: 20px;
  width: 15vw;
  height: 50px;
  margin-top: 20px;
  background: #ff4300;
  border: #ff4300;
  color: white;
  font-weight: bold;
  font-size: 20px;
  box-shadow: 2px 3px 5px #bfc7ce;

  @media only screen and (max-width: 1440px) {
    width: 22vw;
  }

  @media only screen and (max-width: 1024px) {
    width: 30vw;
  }

  @media only screen and (max-width: 425px) {
    width: 40vw;
  }

  :hover {
    opacity: 0.9;
    background: #ff4300;
    border: #ff4300;
    color: white;
  }

  :focus {
    background: #ff4300;
    border: #ff4300;
    color: white;
  }
`;

export const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25vw;
  & a {
    color: black;
    & :hover {
      color: #ff4300;
    }
  }
  & > .idAndPasswordFind {
    display: flex;
  }
`;

export default FormDiv;