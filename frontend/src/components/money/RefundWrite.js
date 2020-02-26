import React, { useCallback } from 'react';
import { Button,} from "antd";
import Banks from './banks';
import { RefundModal } from './Refund.style';

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
          <p>저희 서비스를 이용해주셔서 감사합니다.</p>
        </div>
      </div>
    </RefundModal>
  );
};

export default RefundWrite;