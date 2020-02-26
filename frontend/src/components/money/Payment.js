import React, { useState, useCallback, useEffect } from 'react'; 
import Banks from './banks';
import styled from 'styled-components';
import { Input, Button, Modal } from 'antd';

// 결제랑 그 다른 내용 받아서 결제르 좀 더 꾸며야할듯.
const Payment = ({showPayment, clickPayment, allPrice, selectHelps}) => {
    const [selectBank, setSelectBank] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    
    const onChangeCardNumber = useCallback((e) => {
        setCardNumber(e.target.value);
    }, []);
    const onChnageSelectBank = useCallback(() => {
        setSelectBank(value);
    }, []);

    const onOk = useCallback(() => {
       if(selectHelps.length !== 0){
        console.log('결제되었습니다.');
       }
       else {
           console.log('선택 된 도움이 없습니다.');
       }
       clickPayment();
    }, [selectHelps]); // 선택된 것들이 selectBank와 카드번호  allPrice만큼 결제되는 로직 = > 결제후 결제 된 애들은 장바구니에서 빠짐.

    return (
        <PaymentModal
            visible={showPayment}
            onCancel={clickPayment}
            title="결제"
            onOk = {onOk}
            footer={[ <div className="btnBox">
           <Button className='cancel' onClick={clickPayment}>취소</Button>,<Button className='pay' onClick={onOk}>결제</Button>
            </div>]}
        >
            <div className="bankInfo">
                <Banks selectOnChange={onChnageSelectBank}/>
                <Input placeholder="카드번호" onChange={onChangeCardNumber}/>  
            </div>
            <div className="paymentPrice">
                결제금액 : {allPrice}원
            </div>
            
        </PaymentModal>
    );
};

export default Payment;

const PaymentModal = styled(Modal)`
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