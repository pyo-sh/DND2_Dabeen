import styled from 'styled-components';
import {Icon} from 'antd';

export const PostCapsuleUpperDiv = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 300px;
  cursor: pointer;
  & .CapsuleMain {
    width: 100%;
    height: 240px;
    border: solid 1px #d0d0d0;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & :hover {
      border: solid 1px #ff4300;
    }
    & .CapsuleMainLocation {
      align-self: flex-end;
      padding: 5px 10px;
    }
    & .CapsuleMainProfile {
      & .CapsuleMainPicture {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      & .CapsuleMainUserInfo {
        display: flex;
        align-items: flex-end;
        text-align: start;
        margin-top: -44px;
        padding-left: 110px;
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

  & .CapsuleTitle {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    & .CapsuleTitleMain {
      font-size: 25px;
      margin: 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .CapsuleTitleCheck {
      min-width: 60px;
      height: 25px;
      padding: 2px;
      border-radius: 10px;
      margin: 10px 10px 2px 10px;

      font-size: 14px;
      text-align: center;

      color: ${props => (props.setcolor === "true" ? "#7A7A7A" : "white")};
      background: ${props =>
        props.setcolor === "false" ? "#F0F0F0" : "#FF4300"};
    }
  }
`;

export const LocationIcon = styled(Icon)`
  color: #ff4300;
`;
