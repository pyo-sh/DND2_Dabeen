import React, { useState, useCallback } from 'react'; 
import Banks from '../components/money/banks';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const Payment = () => {
    const [selectBank, setSelectBank] = useState('');
    const selectOnChange = useCallback(() => {
        setSelectBank(value);
    }, []);

    return (
        <PaymentWrapper>
            <h1>결제</h1>
            <div>
                결제금액 : 10000원
            </div>
            <div className="bankInfo">
                <Banks selectOnChange={selectOnChange}/>
                <Input placeholder="계좌번호"/>  
            </div>
            <div className="btnBox">
            <Button>결제</Button><Button>취소</Button>
            </div>
        </PaymentWrapper>
    );
};

export default Payment;

const PaymentWrapper = styled.div`
    margin-top : 30px;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    height : 100%;
    width : 100%;

    & .bankInfo {
        display : flex;
    }
`;