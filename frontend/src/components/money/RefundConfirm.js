import React, { useCallback } from "react";
import { Modal, Button } from "antd";
import styled from "styled-components";

// 정보들 받게 해줘야함. redux로 하던지..
const RefundConfirm = ({ visible, setVisible, accountNumber, refundPrice, selectBank, setChecking }) => {
  const handleOk = useCallback(e => {
    e.preventDefault();
    // 다른 행동 취해야함. 받은 은행, 계좌번호, 환불 등을 통해 신청!!
    setChecking(prev => !prev);
    setVisible(prev => !prev);
  }, []);
  const handleCancel = useCallback(() => {
    setChecking(prev => !prev);
    setVisible(prev => !prev);
  }, []);
  return (
    <ConfirmModal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="환급 확인"
      footer={[
        <div>
          <div className="confirmText">해당정보로 환급하겠습니까?</div>
          <Button className="noBtn" onClick={handleCancel}>
            아니요
          </Button>
          <Button className="okBtn" onClick={handleOk}>
            예
          </Button>
        </div>
      ]}
    >
      <div className="refundInfo">{selectBank} 은행 {accountNumber}(수령인)</div>
      <div className="refundPrice">
        <b>{refundPrice}</b> 원
      </div>
    </ConfirmModal>
  );
};

const ConfirmModal = styled(Modal)`
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
    & div .confirmText {
      color: #ff4300;
    }
    & div .okBtn {
      background: #ff4300;
      color: white;
      & :hover {
        border: 1px solid #ff4300;
      }
    }
    & div .noBtn {
      &:hover {
        border: 1px solid #ff4300;
        color: #ff4300;
      }
    }
  }
`;

export default RefundConfirm;
