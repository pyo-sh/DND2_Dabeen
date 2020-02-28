import React , {useCallback} from 'react';
import { Modal, Button, Input, Select } from "antd";
import styled from "styled-components";
const banks = [
  "카카오",
  "신한",
  "우리",
  "국민",
  "IBK",
  "하나",
  "제일",
  "한국씨티",
  "농협",
  "부산",
  "수협"
];
const RefundWrite = ({visible, setAccountNumber, setRefundPrice, setSelectBank, setVisible, setChecking}) => {
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
        setVisible(prev => !prev);
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
          <select
            className="bankSelect"
            placeholder="은행선택"
            onChange={selectOnChange}
          >
            {banks.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>
          <Input
            type="number"
            placeholder="계좌번호"
            onChange={accountNumberOnChange}
          />
        </div>
        <div className="refundMoneyBox">
          <Input
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
    & .bankSelect {
      width: 120px;
      border-radius: 5px;
      color: tomato;
      & :focus,
      :hover {
        border: 1px solid tomato;
        box-shadow: none;
        outline: tomato;
      }
    }
    & span {
      color: tomato;
    }
  }
  & input {
    & :focus,
    :hover {
      border: 1px solid tomato;
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
      & :focus,
      :hover {
        box-shadow: none;
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