import styled from 'styled-components';

export const Menubar = styled.header`
  position: fixed;
  height : 9vh;
  min-height : 50px;
  top: 0;
  width: 100%;
  padding: 10px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  text-align: center;
  color: black;
  z-index: 1;
  /* opacity : 0.9; */
  /* border-bottom: 1px solid #BFC7CE; */
  box-shadow: 0 2px 5px 0.5px #BFC7CE;
  & .HeaderSearchInput{
    display : flex;
    border : 1px solid #DDDDDD;
    height : 38px;
    width : 100%;
    min-width : 100px;
    align-items : center;
    margin-top: 5px;
    margin-left : 10px;
    justify-content : space-between;
    border-radius : 5px;
    &:hover, :focus {
      border-color : #ff4300;
    }
    & select {
      min-width: 50px;
      width: 100%;
      height : 95%;
      max-width : 65px;
      border : 0;
      border-radius : 5px;
      text-align: center;
      &:focus, :hover{
        outline: none;
      }
    }
    & input {
      border : 0;
      height : 100%;
      width : 100%;
      padding: 0 5px;
      &:focus {
        outline : none;
        border : none;
        box-shadow: none;
      }
      }
    & i {
      font-size: 20px;
      margin-right : 5px;
      &:hover {
        color : #ff4300;
      }
    }
  }
  & hr {
      width : 80%;
  }
  & .menuToggle {
    position: absolute;
    /* top: 13px; */
    right: 32px;
    cursor: pointer;
    color: black;
    font-size: 24px;
  }
  & .menuLeft {
    display: flex;
    margin-top: -5px;
    padding-left: 15px;
    align-items : center;
    width: 80vw;
    & span .ant-input {
      & :hover,
      :focus {
        border: 1px solid #ff4300;
        box-shadow: none;
      }
    }
  }
  & .menuRight {
    display: none;
    font-weight : bold;
  }
  & .userMileage {
    display : none;
  }

  & .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 14px;
    font-weight: bold;
    top: 62px;
    right: 10px;
    background: white;
    border-radius: 5px;
    border: 1px solid #595959;
    padding : 8px;
    & a {
      color: #595959;
    }
    & ul {
      display: flex;
      margin: 0;
      padding: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
    & ::before {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      background: white;
      border-top : 1px solid #595959;
      border-left : 1px solid #595959;
      top: -5px;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
    }
  }
}

  @media screen and (min-width: 769px) {
    & .menuToggle {
      display: none;
    }
    & .menuLeft {
      display: flex;
      width: 40vw;
    }
    & .ant-input-group {
      flex-direction : row;
    }
    & .menuRight {
      display: flex;
      width: 60vw;
      justify-content: space-around;
      & a {
        color: black;
      }
      & a.click{
          color : #ff4300;
        }
      & a:hover{
          color : #ff4300;
        }
    }
    & .menuRight ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 35vw;
      max-width: 500px;
      list-style: none;
      font-size: 22px;
      margin: 0;
      padding-right : 20px;
      & li {
        padding : 0 10px;
      }
      }
      & a[name~=${props => props.selected}]{
      color : #ff4300;
      }
    & .loginBox {
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
      align-items: center;
      width: 18vw;
      & .loginBoxRight{
        margin-left: 18px;
      }
      & .userMileage {
        display : flex;
        align-items : center;
      }
     & .userPageBox {
       position: relative;
       & .userPageList {
        position : absolute;
        width : 100px;
        padding : 10px;
        top : 35px;
        left : -42px;
        z-index : 1;
        background : white;
        border-radius : 5px;
        border : 1px solid darkgrey;
        & ul {
          width : 100%;
          font-size: 14px;
          margin :0;
          padding : 0;
          display: flex;
          color : #ff4300;
          flex-direction : column;
          & i, span {
          color : #ff4300;
          }
          & li {
            color : black;
          }
          & hr {
          width : 80%;
          }
        }
        
        &::before {
          content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        background: white;
        border-top: 1px solid darkgrey;
        border-left: 1px solid darkgrey;
        top: -5px;
        left: 50%;
        transform: translate(-50%) rotate(45deg);
        }
    }
     }
      
    }
  }
`;