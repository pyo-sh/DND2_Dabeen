import styled from 'styled-components';
import {Icon} from 'antd';

export const LocationIcon = styled(Icon)`
  color: #ff4300;
`;

export const PostCapsuleUpperDiv = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 300px;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 5px;
  box-shadow: 0 3.5px 10px 2px #E9E9E9;
  overflow: hidden;
  cursor: pointer;

  & :hover {
    /* border: solid 1px #ff4300; */
    box-shadow: 0 5px 10px 5px #BFC7CE;
  }

  & .CapsuleMain {
    width: 100%;
    height: 246px;
    /* border: solid 1px #d0d0d0; */
    overflow:hidden;
    z-index: 0;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .CapsuleMainLocation {
      height: 32px;
      align-self: flex-end;
      display: flex;
      z-index: 0;
      /* border-radius: 15px; */
      color: #424242;
      & .CapsuleMainLocationTriangle{
        border-top: 15.5px solid white;
        border-right: 15.5px solid white;
        border-bottom: 15.5px solid transparent;
        border-left: 15.5px solid transparent;
        opacity: 0.9;
      }
      & .CapsuleMainLocationInfo{
        width: 170px;
        background: white;
        opacity: 0.9;
        padding: 5px 10px 5px 0;
      }
    }
    & .CapsuleMainImage{
      width: 100%;
      height: -webkit-calc(100% - 39px);
      margin: -31px 0 -56px 0;
    }
    & .CapsuleMainProfile {
      z-index: 0;
      & .CapsuleMainPicture {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid #E9E9E9;
      }
      & .CapsuleMainUserInfo {
        display: flex;
        align-items: flex-end;
        text-align: start;
        margin-top: -50px;
        padding-left: 110px;
        padding-bottom: 6px;
        & .CapsuleMainNickname {
          font-size: 18px;
          height: 27px;
        }
        & .CapsuleMainId {
          padding-left: 10px;
        }
      }
    }
  }

  & .CapsuleTitleMain, .CapsuleMainLocationInfo, .CapsuleContentMoneyValue{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CapsuleTitleWrapper = styled.div`
  width: 100%;
  padding: 5px 10px 15px 15px;
  
  margin-top: 0px;

  border-top: 1px solid #E9E9E9;
  & .CapsuleTitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    & .CapsuleTitleMain {
      font-size: 25px;
      font-weight: bold;
      margin: 0px;
    }
    & .CapsuleTitleCheck {
      min-width: 60px;
      height: 25px;
      padding: 2px;
      border-radius: 10px;
      margin: 10px 0 2px 10px;

      font-size: 14px;
      text-align: center;

      color: ${props => (props.setcolor === "true" ? "#7A7A7A" : "white")};
      background: ${props =>
        props.setcolor === "false" ? "#F0F0F0" : "#FF4300"};
    }
  }
  & .CapsuleDoingTime{
    padding-top: 8px;
  }
  & .CapsuleContentValueWrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .CapsuleFinishTime{
    padding-top: 3px;
  }
  & .CapsuleContentMoney{
    padding-top: 3px;
    padding-right: 2px;
    color: #FF9644;
    display: flex;
    align-items: flex-end;
    font-size: 15px;

    & .CapsuleContentMoneyValue{
      max-width: 105px;
    }
  }
`;