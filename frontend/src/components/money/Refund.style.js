import { Modal } from 'antd';
import styled from 'styled-components';

export const ConfirmModal = styled(Modal)`
  & .ant-modal-header div {
    font-size: 25px;
  }
  & .ant-modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  & .refundPrice {
    font-size: 35px;
    border-bottom: 1px solid black;
    & b {
      color: #ff4300;
    }
  }
  & .ant-modal-footer {
    display: flex;
    justify-content: center;
    & .BtnWrapper{
      display: flex;
    }
    & div .confirmText {
      color: #ff4300;
    }
    & div .okBtn {
      width: 100%;
      background: #ff4300;
      color: white;
      & :hover {
        border: 1px solid #ff4300;
      }
    }
    & div .noBtn {
      width:100%;
      &:hover {
        border: 1px solid #ff4300;
        color: #ff4300;
      }
    }
  }
`;

export const RefundModal = styled(Modal)`
  & .ant-modal-header div {
    font-size: 25px;
  }
  & .bankSelectBoX {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & input {
    margin-left: 10px;
    border: 1px solid #BFC7CE;
    border-radius: 5px;
    height: 38px;
    padding-left: 10px;
    &:focus,
    :hover {
      outline: none;
      border: 1px solid #FF9644;
      box-shadow: none;
    }
    & ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  & .refundMoneyBox {
    display: flex;
    justify-content: center;
    align-items: center;
    & input {
      border: none;
      border-bottom: 1px solid black;
      border-radius: 0px;
      width: 80%;
      height: 10vh;
      font-size: 30px;
      padding-bottom: 0;
      &::placeholder{
        color: #BFC7CE;
        font-style: italic;
      }
      & ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    & span {
      font-size: 40px;
    }
  }
  & .warnText {
    text-align: center;
    margin: 14px 0;
    font-size: 15px;
  }
  & .ant-modal-footer {
    display: flex;
    justify-content: center;
    & button {
      background: #ff4300;
      color: white;
      & :hover {
        border: 1px solid #ff4300;
        background : rgba(255,67,0, 0.9)
      }
    }
  }
`;