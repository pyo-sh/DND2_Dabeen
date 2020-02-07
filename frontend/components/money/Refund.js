// 환불 부터 해야함!!
import React, { useState, useCallback } from 'react';
import { Modal, Button } from 'antd';
import styled from "styled-components";

const RefundModal = styled(Modal)`
`;
const banks = ["카카오" ,"신한", "우리", "국민", "IBK", "하나", "제일", "한국씨티", "농협","부산","수협"]
const Refund = ({visible, setVisible}) => {
    const [selectBank, setSelectBank] = useState('');
    const selectOnChange = useCallback((e) => {
        setSelectBank(e.target.value);
        console.log(e.target.value);
    }, []);
    const handleOk = useCallback(e => {
        e.preventDefault();
        // 다른 행동 취해야함.
        setVisible(prev => !prev);
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
      footer={[
        <Button key="submit" name="submit" onClick={handleOk}>
          예
        </Button>,
        <Button key="cancel" name="cancel" onClick={handleCancel}>
            아니요
        </Button>
      ]}
    >
        <div>
            <select onChange={selectOnChange}>
                {banks.map((b, i) => <option key={i} value={b}>{b}</option>)}
            </select>
            <input type= "number" placeholder="계좌번호"></input>
            <div>
                <input placeholder="환급 금액" type="number"></input>
            </div>
            <div>
                <div>블라블라블라블라</div>
                <Button>환급하기</Button>
            </div>
        </div>
    </RefundModal>
    );
};

export default Refund;