import React, { useState, useCallback } from 'react'; 
import Banks from '../components/money/banks';
import styled from 'styled-components';
import { Input, Button } from 'antd';

// 결제랑 그 다른 내용 받아서 결제르 좀 더 꾸며야할듯.
const Payment = () => {
    const [selectBank, setSelectBank] = useState('');
    const selectOnChange = useCallback(() => {
        setSelectBank(value);
    }, []);

    return (
        <PaymentWrapper>
            <div className="paymentTitle">결제</div>
            <div className="bankInfo">
                <Banks selectOnChange={selectOnChange}/>
                <Input placeholder="카드번호"/>  
            </div>
            <div className="paymentPrice">
                결제금액 : 10000원
            </div>
            <div className="btnBox">
            <Button className='cancel'>취소</Button><Button className='pay'>결제</Button>
            </div>
        </PaymentWrapper>
    );
};

export default Payment;

const PaymentWrapper = styled.div`
    margin : 30px auto;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
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