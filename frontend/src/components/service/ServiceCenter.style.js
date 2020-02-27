import styled from 'styled-components';

export const ServiceWrapper = styled.div`
  width: 100%;
  & .ServiceTitle {
    display: flex;
    align-items: flex-end;
    padding-bottom: 25px;
    border-bottom: 1px solid #bfc7ce;
    font-size: 40px;
    font-weight: bold;
  }
  & .ServiceContent {
    padding: 0 20px;
  }
  & .ServiceTitleMain {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 30px 0 15px -10px;
    font-size: 30px;
    font-weight: bold;
    & button {
      width: 70px;
      height: 30px;
      margin-left: auto;
      margin-top: 10px;
      color: white;
      background: #ff4300;
      border: none;
      border-radius: 2px;
      font-size: 14px;
      cursor: pointer;
      & :hover {
        color: #424242;
      }
    }
  }
  & .ServiceQuestion {
    border: 1px solid #bfc7ce;
    border-bottom: none;
    border-radius: 2px;
    & ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  }
  @media screen and (max-width: 768px) {
    /* 768보다 작을 때는 화면 크게 만들거임!!*/
    & .serviceBox {
      width: 100%;
      max-width: 612px;
    }
  }
`;
