import styled from 'styled-components';

export const SignUpUpperDiv = styled.div`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .SignupTitle {
    font-size: 50px;
    font-weight: bold;
    width: 100%;
    max-width: 600px;
    min-width: 320px;
  }
  & .SignupContent {
    border: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    width: 100%;
    max-width: 600px;
    min-width: 320px;
    /* height: 1120px; */
    & .SignupContentButton {
      width: 100%;
      height: 100vh;
      margin-top: 40px;
      max-width: 420px;
      max-height: 50px;
      min-width: 270px;
      min-height: 35px;
      background: #ff4300;
      color: white;
    }
  }
`;
export const SignUpGetDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 5px;
  max-width: 425px;
  min-width: 270px;
  width: 100%;
  & .SignupContentBirth {
    & .SignupContentBirthYear {
      width: 140px;
      margin-left: 10px;
    }
    & .SignupContentBirthMonth {
      width: 100px;
      margin-left: 10px;
    }
    & .SignupContentBirthDay {
      width: 100px;
      margin-left: 10px;
    }
  }
  & .SignupContentTitle {
    font-weight: bold;
  }
  & .SignupContentCheck {
    height: 30px;
    color: red;
    align-self: flex-end;
  }
  & .SignupContentCheckAll {
    margin-top: 20px;
    height: 30px;
    color: red;
    align-self: flex-end;
  }
`;