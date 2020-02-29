import styled from 'styled-components';

export const PostUpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & i, span {
    z-index : 0;
  }
  & .postmainWrapper {
    width: 100%;
    max-width: 1200px;
    min-width: 320px;
    padding: 0 10px;
  }
  & .postmainTitle {
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0 10px;
    & .postmainTitleMain {
      min-width: 100px;
      font-size: 50px;
    }
    & .postmainTitleSub {
      padding-left: 10px;
      font-size: 28px;
    }
  }
  & .postmainSearch {
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    background: #f0f0f0;
    font-size: 18px;
  }
  & .postmainContent {
    padding: 0 10px;
    & .helpCount {
      font-size: 20px;
      margin-top: 20px;
    }
  }
  & .postmainWrite {
    & .postmainWriteIcon {
      width: 10vw;
      max-width: 86px;
      min-width: 70px;
      cursor: pointer;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.05);
      }
    }
    position: fixed;
    right: 5vw;
    bottom: 100px;
    & .postmainWriteModal {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.65);
      z-index: 3;
    }
  }
  & .ant-pagination {
      & li:hover {
        border : 1px solid #ff4300;
        & a {
          color : #ff4300;
        }
      }
      & .ant-pagination-item-active {
        border-color : #ff4300;
        & a {
          color : #ff4300;
        }
      }
      & li[title*="Pages"] {
        &:hover {
          border : none;
        }
        & * {
          color : darkgrey;
        }  
      }
    }
   
`;