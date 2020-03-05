import styled from 'styled-components';

export const ServiceWrapper = styled.div`
  width: 100%;
  & .ServiceTitle {
    display: flex;
    align-items: flex-end;
    padding-bottom: 18px;
    border-bottom: 1px solid #E9E9E9;
    font-size: 33px;
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
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      transition : 0.3s;
      & :hover, :focus {
        background : rgba(255,67,0,0.8);
        border: none;
        outline : none;
      }
    }
  }
  & .ServiceQuestion {
    border: 1px solid #E9E9E9;
    border-bottom: none;
    border-radius: 5px;
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
