import styled from 'styled-components';

export const UserPageWrapper = styled.article`
  width: 100%;
  margin: 25px 0;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  & a {
    color: black;
  }
  & .profileSection {
    width: 80%;
    min-width: 200px;
    max-width: 300px;
    height: 100%;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .userInfomation {
      width: 100%;
      border: 1px solid #BFC7CE;
      border-radius: 5px;
      box-shadow: 0 5px 10px 3px #E9E9E9;
    }
    & .userImage {
      width: 100%;
      height: 80vw;
      min-height: 200px;
      max-height: 300px;
      border-radius: 5px;
    }
    & .userParagraph{
      padding-top: 17.5px;
    }
    & .userIntroduce{
      width: 100%;
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      & .userNickname{
          margin-bottom: 0;
      }
    }
    & .userRate{
      display: flex;
      align-items: center;
      /* padding-left: 3px; */
      & .userRateTitle{
        color: #FF4300;
        padding: 4px 0 0 13px;
        font-size: 15px;
        font-weight: bold;
      }
    }
    & .userRegistButton{
      width: 100%;
      border : 0;
      background : #F0F0F0;
      border-radius : 5px;
      height : 27px;
      cursor: pointer;
      &:hover, :focus {
          color : black;
          outline : none;
      }
    }
    & .contentNavbar {
      width : 100%;
      padding: 10px;
      margin: 25px 0;
      display : flex;
      flex-direction: column;
      justify-content : space-evenly;
      list-style : none;
      border: 1px solid #BFC7CE;
      border-radius: 4px;
      box-shadow: 0 5px 10px 3px #E9E9E9;
      & h1{
        padding-bottom: 10px;
        border-bottom: 1px solid #BFC7CE;
      }
      & li {
        margin: 5px;
        padding: 10px;
        border-radius: 2px;
        box-shadow: 3px 3px 10px 0.5px #E9E9E9;
        cursor: pointer;
      }
      & .click {
        & a{
          color : #FF9644;
        }
        background: #F0F0F0;
        border-right: 3px solid #FF4300
      }
    }
  }
  & .ant-rate {
    color: #ff4300;
  }
  & .contentSection {
    width: 75vw;
    max-width: 940px;
    min-width: 320px;
    padding: 0 20px 20px 20px;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
  }
`;