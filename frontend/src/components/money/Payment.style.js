import {Modal} from 'antd';
import styled from 'styled-components';

export const PaymentModal = styled(Modal)`
    & .ant-modal-header div {
        font-size: 25px;
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
        font-size : 28px;
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
        transition : background 0.3s;
        &:hover, :focus {
          outline: none;
          background: rgba(255,67,0,0.8);
          border : none;
        }
    }
    & .bankInfo {
      display : flex;
    }
`;