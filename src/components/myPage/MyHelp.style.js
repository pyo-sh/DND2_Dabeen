import styled from 'styled-components';
import { Col } from 'antd';

export const MyHelpUpperDiv = styled.div`
  width: 100%;
  & .Myhelp {
    display: flex;
    flex-direction: column;
    & .MyhelpTitle {
      font-size: 40px;
      font-weight: bold;
      padding-bottom: 25px;
      border-bottom: 1px solid #bfc7ce;
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
`;
export const MyHelpCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;