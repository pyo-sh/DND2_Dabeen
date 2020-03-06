import styled from 'styled-components';

export const MainDaBeenerProfileForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 260px;
  flex-wrap : wrap;
  margin-top: 20px;
  & a {
      color: #424242;
  }

  /* @media only screen and (max-width: 1024px){
        width: 50vw;   
    } */

  /* @media only screen and (max-width: 425px) {
    width: 70vw;
    flex-wrap: wrap;
  } */
`;

export const MainDaBeenerProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
   
  & .MainProfilePicture{
    width: 105px;
    height: 100px;
    border: 1px solid #BFC7CE;
    border-radius: 50%;
    margin: 0 30px;
    transition : 0.3s;
    &:hover{
      transform : scale(1.1);
    }
    @media only screen and (max-width: 860px){
      margin: 0 20px;  
    }
    @media only screen and (max-width: 340px){
      margin: 0 15px;  
    }
  }
  & .MainProfileNickname{
    padding-top: 5px;
    font-size: 18px;
  }
  & .MainProfileId{
    color: #7A7A7A;
    font-size: 12;
    padding-bottom: 2px;
  }
  & .MainProfileRateValue{
    font-size: 16px;
    color: #424242;
    font-weight: bold;
  }
  
  & .ant-rate {
    color: #ff4300;
  }
`;