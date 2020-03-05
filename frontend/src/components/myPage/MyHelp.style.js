import styled from 'styled-components';
import { Col } from 'antd';

export const MyHelpUpperDiv = styled.div`
  width: 100%;
  & .Myhelp {
    display: flex;
    flex-direction: column;
    & .MyhelpTitle {
      font-size: 33px;
      font-weight: bold;
      padding-bottom: 18px;
      border-bottom: 1px solid #E9E9E9;
    }
    & .MyhelpContent{
      padding: 20px 0;
    }
    & .MyhelpContentPage{
      width: 180px;
      & input {
        width: 50px;
        margin: 0;
      }
      margin: 20px auto;
    }
  }
  & .ant-pagination {
    & li:hover {
      border : 1px solid #ff4300;
      outline:none;
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
export const MyHelpCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;