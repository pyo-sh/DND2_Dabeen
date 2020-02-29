import styled from 'styled-components';

export const MainDaBeenerProfileForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  min-width: 350px;
  flex-wrap : wrap;
  margin-top: 20px;
  & a {
      color: #424242;
  }

  /* @media only screen and (max-width: 1024px){
        width: 50vw;   
    } */

  @media only screen and (max-width: 425px) {
    width: 70vw;
    flex-wrap: wrap;
  }
`;

export const MainDaBeenerProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
   
  & span.ant-avatar{
    transition : transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
  & .ant-rate {
    color: #ff4300;
  }
`;