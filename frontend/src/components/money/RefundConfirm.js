import React, { useCallback } from "react";
import { Button } from "antd";
import { ConfirmModal } from './Refund.style';

// 정보들 받게 해줘야함. redux로 하던지..
const RefundConfirm = ({ visible, setVisible, accountNumber, refundPrice, selectBank, setChecking }) => {
  const handleOk = useCallback(e => {
    e.preventDefault();
    // 다른 행동 취해야함. 받은 은행, 계좌번호, 환불 등을 통해 신청!!
    setChecking(prev => !prev);
    setVisible();
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
          <div className="BtnWrapper">
            <Button className="noBtn" onClick={handleCancel}>
              아니요
            </Button>
            <Button className="okBtn" onClick={handleOk}>
              예
            </Button>
          </div>
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

export default RefundConfirm;
