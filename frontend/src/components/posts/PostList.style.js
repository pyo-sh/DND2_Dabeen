import styled from 'styled-components';
import {Col} from 'antd';

export const PostListUpperDiv = styled.div`
  padding: 20px 0;
  & .PostListPagination{
    width: 180px;
    font-size: 18px;
      & input {
        width: 50px;
        margin: 0;
      }
      margin: 20px auto;
  }
`;
export const ColCapsule = styled(Col)`
  display: flex;
  justify-content: center;
`;
