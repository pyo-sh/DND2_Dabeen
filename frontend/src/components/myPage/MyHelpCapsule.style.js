import styled from 'styled-components';

export const MyHelpCapsuleUpperDiv = styled.div`
  flex: 1;
  width: 100%;
  max-width: 350px;
  min-width: 280px;
  padding: 15px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  border: 1.5px solid ${props => (props.done ? "#BFC7CE" : "#ff4300")};
  border-radius: 5px;

  cursor: pointer;
  & .MyhelpCapsuleTitle {
    width: -webkit-calc(100% - 88px);
    display: flex;
    flex-direction: column;
    & .MyhelpCapsuleTitleMain {
      font-size: 22px;
      font-weight: bold;
    }
    & .MyhelpCapsuleContent {
      font-size: 15px;
    }
  }
  & .MyhelpCapsuleInfo {
    min-width: 80px;
    padding-left: 7px;
    border-left: 1px solid #f0f0f0;
    & .MyhelpCapsuleInfoPrice{
      display: flex;
    }
  }

  & .MyhelpCapsuleTitleMain, .MyhelpCapsuleContent, .MyhelpCapsuleInfoPriceValue{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .doing,
  .done {
    width: 60px;
    height: 23px;
    text-align: center;
    border-radius: 5px;
  }
  & .doing {
    background: #ff4300;
    color: white;
  }
  & .done {
    background: #BFC7CE;
  }
`;