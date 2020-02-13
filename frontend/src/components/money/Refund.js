// 환불 부터 해야함!!
import React, { useState, useCallback } from "react";
import RefundWrite from "./RefundWrite";
import RefundConfirm from './RefundConfirm';

const Refund = ({ visible, setVisible }) => {
  const [checking, setChecking] = useState(false); // 확인하는 건지 아닌지

  const [selectBank, setSelectBank] = useState("");
  const [accountNumber, setAccountNumber] = useState(null);
  const [refundPrice, setRefundPrice] = useState(null);
  
  return (
    <>
    {visible && !checking ? 
    <RefundWrite
    visible={visible}
      setChecking={setChecking}
      setSelectBank={setSelectBank}
      setAccountNumber={setAccountNumber}
      setRefundPrice={setRefundPrice}
      setVisible={setVisible}
    /> : 
    <RefundConfirm
      setChecking={setChecking}
      selectBank = {selectBank}
      setVisible={setVisible}
      visible={visible}
      accountNumber={accountNumber}
      refundPrice={refundPrice}
    /> }
    </>
  );
};



export default Refund;
