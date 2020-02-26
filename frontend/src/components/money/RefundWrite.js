import React, { useCallback } from 'react';
import { Modal, Button, Input, Select } from "antd";
import styled from "styled-components";
import Banks from './banks';

const RefundWrite = ({ visible, setAccountNumber, setRefundPrice, setSelectBank, setVisible, setChecking }) => {
  const selectOnChange = useCallback(value => {
    setSelectBank(value);
  }, []);
  const accountNumberOnChange = useCallback(e => {
    setAccountNumber(e.target.value);
  }, []);
  const refundPirceOnChange = useCallback(e => {
    setRefundPrice(e.target.value);
  }, []);
  const handleOk = useCallback(e => {
    e.preventDefault();
    // 다른 행동 취해야함. 받은 은행, 계좌번호, 환불 등을 통해 신청!!
    setChecking(prev => !prev);
  }, []);
  const handleCancel = useCallback(() => {
    setVisible();
  }, []);
  return (
    <RefundModal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="환급"
      footer={[<Button onClick={handleOk}>환급하기</Button>]}
    >
      <div>
        <div className="bankSelectBoX">
          <Banks selectOnChange={selectOnChange} />
          <input
            type="number"
            placeholder="계좌번호"
            onChange={accountNumberOnChange}
          />
        </div>
        <div className="refundMoneyBox">
          <input
            placeholder="환급 금액"
            type="number"
            onChange={refundPirceOnChange}
          />
          <span>원</span>
        </div>
        <div className="warnText">
          <p>블라블라블라블라</p>
        </div>
      </div>
    </RefundModal>
  );
};

const RefundModal = styled(Modal)`
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
      background: tomato;
      color: white;
      & :hover {
        border: 1px solid #ff4300;
        color: black;
      }
    }
  }
`;
export default RefundWrite;