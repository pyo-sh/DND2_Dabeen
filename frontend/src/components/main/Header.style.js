import styled from 'styled-components';

export const Menubar = styled.nav`
  position: fixed;
  height : 9vh;
  min-height : 50px;
  top: 0;
  width: 100%;
  padding: 10px 0;
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
  & .HeaderSearch{
    margin-bottom: -5px;
    margin-left: 10px;
    & .HeaderSearchInput{

    }
  }
  & .menuToggle {
    position: absolute;
    /* top: 13px; */
    right: 20px;
    cursor: pointer;
    color: black;
    font-size: 24px;
  }
  & .menuLeft {
    display: flex;
    margin-top: -5px;
    margin-left: 5px;
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
  }
  & .ant-input-group {
    display : flex;
    align-items : center;
    & select {
      border: 1px solid #DDDDDD;
      border-radius: 5px;
      height: 38px;
      &:focus {
        outline: #ff4300 solid 1px;
      }
    }
  }
  & .ant-input-search {
    height : 38px;
    & span i {
      color : black;
      font-size: 18px;
    }
  }
  & .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 17px;
    top: 62px;
    right: 5px;
    background: rgba(255, 99, 71, 0.9);
    border-radius: 5px;
    & a {
      color: white;
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
      background: rgba(255, 99, 71);
      top: -5px;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
    }
  }
}

  @media screen and (min-width: 768px) {
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
      width: 40vw;
      list-style: none;
      font-size: 22px;
      margin: 0;
      }
      & a[name~=${props => props.selected}]{
      color : #ff4300;
      }
    & .loginBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 18vw;
     & .userPageBox {
       position: relative;
       & .userPageList {
        position : absolute;
        width : 100px;
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