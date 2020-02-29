import Slick from "react-slick";
import styled from "styled-components";
import { Icon } from "antd"

export const TestSlick = styled(Slick)`
  width: 85vw;
  margin-top: 40px;
  margin-bottom: 40px;
  /* @media only screen and (max-width: 768px) {
    display: flex;
    justify-items : center;
    align-items: center;
    flex-wrap : wrap;
  }  */
  & .slick-next, .slick-prev {
      display : block;
      background : white;
      &::before {
          color : #ff4300;
          line-height : 10px;
          font-size : 50px;
      }
  }
  & .slick-prev {
      margin-left : -10px;
  }
  & .slick-next::before {
    content : ">";
  }
  & .slick-prev::before {
    content : "<";
  }
  & .liveHelpRequestFlex {
    display: flex;
    padding : 0;
    margin : 0 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
     @media only screen and (max-width: 768px) {
      margin-top: 3vh;
    } 
   } 
`;

export const LiveHelpRequestWrapper = styled.div`
  margin: 15px;
  border-radius: 5px;
  overflow: hidden;

  /* border: solid 1px #d0d0d0; */
  border-radius: 5px;
  box-shadow: 0 3.5px 10px 2px #E9E9E9;

  cursor: pointer;

  & .liveHelpRequestContent{
    padding: 12.5px;

    & .liveHelpRequestTitle{
      font-size: 22px;
      font-weight: bold;
      height: 35px;
    }
    & .liveHelpRequestDeadline{
      padding-top: 5px;
      font-size: 15px;
    }
  }
  & .liveHelpRequestTitle, .liveHelpRequestDeadline, .LiveHelpRequestLocationInfo{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover{
    box-shadow: 0 5px 10px 4px #BFC7CE;
  }
`;

export const LocationIcon = styled(Icon)`
  color: #ff4300;
  margin-right: 5px;
`;

export const LiveHelpRequestUpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  border-bottom: solid 1px #E9E9E9;
  & .LiveHelpRequestLocation{
    height: 31px;
    align-self: flex-end;
    display: flex;
    align-items: center;
    z-index: 0;
    & .LiveHelpRequestLocationTriangle{
      border-top: 15.5px solid white;
      border-right: 15.5px solid white;
      border-bottom: 15.5px solid transparent;
      border-left: 15.5px solid transparent;
      opacity: 0.9;
    }
    & .LiveHelpRequestLocationInfo{
      min-width: 170px;
      max-width: 300px;
      background: white;
      opacity: 0.9;
      padding: 5px 10px 5px 0;
    }
  }
  & .LiveHelpRequestImage{
    width: 100%;
    height: -webkit-calc(100% - 39px);
    margin: -31px 0 -55px 0;
  }

  & .LiveHelpRequestUserPicture{
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
  & .liveHelpRequestUserInfo{
    display: flex;
    align-items: flex-end;
    text-align: start;
    margin-top: -50px;
    padding-left: 110px;
    padding-bottom: 6px;
  }
  & .liveHelpRequestNickname{
      font-size: 18px;
      font-weight: bold;
      /* height: 27px; */
    }
  & .liveHelpRequestID{
    padding-left: 10px;
  }
`;