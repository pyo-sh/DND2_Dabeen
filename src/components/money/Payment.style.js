import {Modal} from 'antd';
import styled from 'styled-components';

export const PaymentModal = styled(Modal)`
    & .ant-modal-header div {
        font-size: 25px;
    }
    & .ant-modal-close{
        width: 56px;
    }
    & input {
        &:hover, :focus {
            border: 1px solid #ff4300;
            box-shadow : none;
        }
    }
    & .paymentTitle {
      font-size: 50px;
      font-weight: bold;
      width: 100%;
      max-width: 600px;
      min-width: 320px;
    }
    & .paymentPrice {
        display: flex;
        align-items: flex-end;
        font-size : 28px;
        padding-bottom: 3px;
        /* border-bottom: 1px solid #E9E9E9; */
        margin-bottom: 25px;
        & div{
            color: #FF9644;
            font-size: 30px;
        }
    }
    & button {
        width : 80px;
    }
    & .cancel {
        &:hover, :focus {
            color : #ff4300;
            border : 1px solid #ff4300;
        }
    }
    & .pay {
        margin-left : 5px;
        background: #ff4300;
        color : white;
        transition : 0.3s;
        &:hover, :focus {
          outline: none;
          background: rgba(255,67,0,0.8);
          border : none;
        }
    }
    & .bankInfo {
      display : flex;
      justify-content: center;
      align-items : center;
      & input {
          height : 38px;
      }
    }
`;