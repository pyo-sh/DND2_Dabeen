import styled from 'styled-components';
import Column from 'antd/lib/table/Column';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const BanksUpperDiv = styled.div`

`;

export const BanksItemBox = styled(TabPane)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: 18px;
  & .BanksAccount{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .BanksAccountValue, .BanksMileageValue{
    font-size: 20px;
    color: #FF4300;
  }
`;

export const Select = styled.select`
      width: 75px;
      height: 38px;
      border-radius: 5px;
      color: #7A7A7A;
      & :focus,
      :hover {
        border: 1px solid #FF4300;
        box-shadow: none;
        outline: #FF4300;
      }
     & span {
      color: #7A7A7A;
    }
`;