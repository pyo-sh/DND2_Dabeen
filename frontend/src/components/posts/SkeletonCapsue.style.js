import styled from 'styled-components';

export const PostCapsuleUpperDiv = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 300px;
  /* margin-top : 15px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  & .CapsuleMain {
    width: 100%;
    height: 246px;
    /* border: solid 1px #d0d0d0; */
    border-radius: 5px;
    box-shadow: 0 3.5px 10px 2px #E9E9E9;
    overflow:hidden;
    z-index: 0;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .CapsuleMainLocation {
      height: 31px;
      align-self: flex-end;
      display: flex;
      z-index: 0;
      color: #F2F2F2;
      animation : shining 1s ease-in-out infinite;
      & .CapsuleMainLocationTriangle{
        border-top: 15.5px solid #F2F2F2;
        border-right: 15.5px solid #F2F2F2;
        border-bottom: 15.5px solid transparent;
        border-left: 15.5px solid transparent;
        opacity: 0.9;
        animation : shining 1s ease-in-out infinite;
      }
      & .CapsuleMainLocationInfo{
        width: 170px;
        height : 31px;
        background: #F2F2F2;
        animation : shining 1s ease-in-out infinite;
        opacity: 0.9;
        padding: 5px 10px 5px 0;
      }
    }
    & .CapsuleMainImage{
      width: 100%;
      height: -webkit-calc(100% - 39px);
      margin: -31px 0 -56px 0;
      background : #E6E6E6;
    }
    & .CapsuleMainProfile {
      z-index: 0;
      & .CapsuleMainPicture {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background : #DDDDDD;
        animation : shining 1s ease-in-out infinite;
      }
      & .CapsuleMainUserInfo {
        display: flex;
        align-items: flex-end;
        text-align: start;
        margin-top: -50px;
        padding-left: 110px;
        padding-bottom: 6px;
        & .CapsuleMainNickname {
          height: 27px;
          width: 50px;
          margin-right : 5px;
          background : #F2F2F2;
          border-radius : 4px;
          animation : shining 1s ease-in-out infinite;
        }
        & .CapsuleMainId {
          height: 22px;
          width: 65px;
          background : #F2F2F2;
          border-radius : 4px;
          animation : shining 1s ease-in-out infinite;
        }
      }
    }
  }
`;

export const CapsuleTitleWrapper = styled.div`
  width: 100%;
  padding: 20px 10px 15px 15px;
  margin-top: -10px;
  height : 119px;
  border-radius: 5px;
  box-shadow: 0 3px 10px 2px #E9E9E9;
  & .CapsuleTitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    & .CapsuleTitleMain {
      margin: 0px;
      width : 100px;
      height : 20px;
      background : #F2F2F2;
      border-radius : 4px;
      animation : shining 1s ease-in-out infinite;
    }
  }
  & .CapsuleTitleCheck {
      min-width: 60px;
      height: 25px;
      padding: 2px;
      margin: 10px 10px 2px 10px;
      border-radius: 10px;
      background:#F2F2F2;
      animation : shining 1s ease-in-out infinite;
  }
  & .CapsuleFinishTime, .CapsuleDoingTime{
    margin-top : 10px;
    width : 150px;
    height : 20px;
    background : #F2F2F2;
    border-radius : 4px;
    animation : shining 1s ease-in-out infinite;
  }

  @keyframes shining {
      0% {
          opacity : 0.7;
      }
      50% {
          opacity : 1;
      }
      100% {
          opacity : 0.7;
      }
  }
`;