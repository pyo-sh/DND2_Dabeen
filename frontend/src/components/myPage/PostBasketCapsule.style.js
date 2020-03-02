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

  & .BasketCapsuleCapture {
    flex: 1;
    width: 100%;
    min-width: 250px;
    height: 30vw;
    min-height: 175px;
    max-height: 220px;
    margin-top: -25px;
    border: 5px solid #FF9644;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px #E9E9E9;
  }
  & .BasketCapsuleCapture:hover{
    box-shadow: 0 0 10px 2px #BFC7CE;
  }

  & .PostBasketTitle, .PostBasketMoneyValue, .PostBasketPeopleApplied, .PostBasketPeopleApply{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const PostBasketCheckIcon = styled(Icon)`
  font-size: 20px;
  color: ${props => (props.setcolor==="true" ? "#FF3400" : "none")};
  cursor: pointer;
`;
export const PostBasketContent = styled.div`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;

  & .PostBasketTitle {
    width: 100%;
    height: 35px;

    font-size: 23px;
    font-weight: bold;
  }
  & .PostBasketTimeWrapper {
    width: 100%;
    
    padding-top: 5px;
    margin-top: 5px;
    border-top: 1px solid #BFC7CE;
    & .PostBasketFinishTime {
    }
    & .PostBasketDoingTime {
    }
  }
`;

export const PostBasketContentBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
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
  & .PostBasketMoney{
    display: flex;
    align-items: center;
    margin-right: 10px;
    & .PostBasketMoneyValue{
      max-width: 135px;
      margin-left: 5px;
      color: #FF9644;
      font-size: 18px;
    }
    & .PostBasketPayCheck {

    }
  }
`;

export const BasketCapsuleCircle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & .Circle{
    width: 150px;
    height: 50px;
    border: 10px solid #FF9644;
    border-radius: 50%;

    overflow: hidden;
    /* box-shadow: 0 0 10px 1px #7A7A7A; */
  }
`;