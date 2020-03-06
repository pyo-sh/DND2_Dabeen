import styled from "styled-components";
import { Icon } from 'antd';

export const PostBasketCapsuleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostBasketCapsuleUpperDiv = styled.div`
  width: 100%;
  max-width: 450px;
  min-width: 250px;
  margin: 20px 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  box-shadow: 0 0 10px 3px #E9E9E9;
  &:hover{
    box-shadow: 0 0 10px 2px #BFC7CE;
  }
  cursor: pointer;

  & .BasketCapsuleCapture {
    flex: 1;
    width: 100%;
    min-width: 250px;
    height: 30vw;
    min-height: 175px;
    max-height: 220px;
    background-color: white;
    margin-top: -32px;
  }
  & .checkWrapper{
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: flex-end;
    & .PostBasketTriangle{
      border-top: 15.5px solid white;
      border-right: 15.5px solid white;
      border-bottom: 15.5px solid transparent;
      border-left: 15.5px solid transparent;
      opacity: 0.9;
    }
  }
  & .PostBasketPayCheck, .PostBasketPayUncheck {
    padding: 5px 15px 5px 2px;
    background: white;
    opacity: 0.9;
    font-size: 15px;
    font-weight: bold;
  }
  & .PostBasketPayCheck{
    color: #FF9644;
  }
  & .PostBasketPayUncheck{
    color: #7A7A7A;
  }

  & .PostBasketTitle, .PostBasketMoneyValue, .PostBasketPeopleApplied, .PostBasketPeopleApply{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const PostBasketCheckIcon = styled(Icon)`
  margin: 0 10px 0 20px;
  font-size: 23px;
  color: ${props => (props.setcolor==="true" ? "#FF3400" : "none")};
  cursor: pointer;
`;
export const PostBasketContent = styled.div`
  width: 100%;
  font-size: 15px;
  border-top: 1px solid #E9E9E9;

  & .PostBasketTitle {
    height: 35px;
    margin: 10px 15px 5px 15px;

    font-size: 23px;
    font-weight: bold;
  }
  & .PostBasketFinishTime {
    margin: 0 15px;
  }
  & .PostBasketDoingTime {
    margin: 3px 15px 8px 15px;
  }
`;

export const PostBasketContentBox = styled.div`
  padding: 10px 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  border-top: 1px solid #E9E9E9;

  & .PostBasketMoneyWrapper{
    display: flex;
    align-items: center;
  }
  & .PostBasketMoney{
    display: flex;
    align-items: center;
    margin-right: 10px;
    color: #FF9644;
    & .PostBasketMoneyValue{
      max-width: 130px;
      margin-left: 5px;
      font-size: 17px;
    }
  }
  & .PostBasketPeople{
    display: flex;
    align-items: center;
    & .PostBasketPeopleApplied {
      max-width: 100px;
      margin: 0 5px;
    }
    & .PostBasketPeopleApply{
      max-width: 100px;
      margin-left: 5px;
    }
  }
`;