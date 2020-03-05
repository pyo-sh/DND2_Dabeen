import styled from 'styled-components';

export const TermsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  & img {
    width : 50%;
  }
  & .termsWrap {
    width: 60%;
    max-width : 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding : 15px;
    & .termTitle{
      font-size: 30px;
    }
    & .checkButton {
      border: none;
      background: none;
    }
    & .termBox {
      display: flex;
      width: 60%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
      & span{
        margin: 7px 0;
      }
    }
    & .terms {
      color: ${props => (props.termsCheck ? "#ff4300" : "grey")};
    }
    & .use {
      color: ${props => (props.useTermCheck ? "#ff4300" : "grey")};
    }
    & .privacy {
      color: ${props => (props.privacyInfoCheck ? "#ff4300" : "grey")};
    }
    & .term {
      width: 100%;
      height: 15vh;
      border: 1px solid #bfc7ce;
      border-radius: 4px;
      padding: 10px;
    }
    & .termDanger {
      color: red;
      margin: 20px 0 15px 0;
    }

    & > button {
      background: #ff4300;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      width: 25%;
      height : 30px;
    }
  }
  @media screen and (max-width: 768px) {
    & .termsWrap {
      width : 100%;
      max-width: 452px;
    }
  }
`;