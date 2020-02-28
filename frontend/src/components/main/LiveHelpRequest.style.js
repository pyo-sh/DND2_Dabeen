import Slick from "react-slick";
import styled from "styled-components";

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

export const LiveHelpRequestContent = styled.div`
  position: relative;
  width : 95%;
  border: solid 1px gray;
  border-radius: 5px;
  cursor: pointer;
  transition : border 0.2s, box-shadow 0.3s ease-in-out;
  &::after {
    position: absolute;
    width : 100%;
    height : 100%;
    z-index : -1;
    top: 0;
    left: 0;
    content : "";
    border-radius: 4px;
    box-shadow: 0 5px 10px 0.5px #BFC7CE;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  &:hover::after {
    opacity: 1;
  }

   & .liveHelpRequestUserInfo {
    display: flex;
    justify-content : flex-start;
    align-items: center;
    margin-top: -37px;
    margin-bottom: 5px;
    & > div {
        display : flex;
        align-items : center;
        margin-top : 10px;
        margin-left : 10px;
    }
  }

  & .liveHelpRequestID {
    color: black;
    margin-right: 8px;
  }

  & .liveHelpRequestNickname {
    color: darkgray;
    font-size: 11px;
  }
`;

export const LiveHelpRequestContentInfo = styled.div`
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width : 90%;

  & > .titleDate {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > .location {
    border-top: solid 1px gray;
    text-align: right;
  }
`;