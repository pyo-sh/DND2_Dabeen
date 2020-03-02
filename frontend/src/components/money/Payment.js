import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { PaymentModal } from './Payment.style';

import Banks from './banks';
import { check_num } from "../signUp/InputFunctions";
import { inputCheckChangeHook } from "../../hooks/inputChangeHook";
import { PayPostRequestAction } from '../../reducers/basket';
import { getCookie } from '../../utils/cookieFunction';

// 결제랑 그 다른 내용 받아서 결제르 좀 더 꾸며야할듯.
const Payment = ({ userNum, showPayment, clickPayment, allPrice, selectHelps, setResultVisible }) => {
    const dispatch = useDispatch();
    const { postPaid } = useSelector(state => state.basket);
    const [selectCompany, setSelectCompany] = useState("카카오");
    const [accountNumber, setAccountNumber] = inputCheckChangeHook("", [check_num]);
    const [payWay, setPayWay] = useState("d");

    const onChangeSelectCompany = useCallback((e) => {
        setSelectCompany(e.target.value);
    }, []);

    const checkIsRight = () => {
        switch(payWay){
            case "d":{
                
                break;
            }
            case "c":{
                if(accountNumber.length < 12){
                    alert('카드번호를 알맞게 적어주세요');
                    return false;
                }
                break;
            }
            case "p":{
                if(accountNumber.length !== 11){
                    alert('핸드폰 번호를 알맞게 적어주세요');
                    return false;
                }
                break;
            }
            case "m":{

                break;
            }
        }
        return true;
    };
    // 선택된 것들이 selectBank와 카드번호  allPrice만큼 결제되는 로직 = > 결제후 결제 된 애들은 장바구니에서 빠짐.
    const onOk = useCallback(() => {
       if(selectHelps.length === 0){
            alert('선택 된 도움이 없습니다.');
            clickPayment();
       }
       else {
            if(checkIsRight()){
                // dispatch(PayPostRequestAction({userNum, helpNums: selectHelps, payWay: payWay, cookie: getCookie()}));
                console.log(selectCompany, accountNumber);
                setResultVisible();
                clickPayment();
            }
            console.log(selectHelps);
       }
    }, [selectHelps, selectCompany, accountNumber, payWay]);

    // 결제 방법을 선택하는 onChange 함수
    const onTabClick = useCallback((key, event) => {
        setPayWay(key);
    }, []);

    // 결제가 완료되었다면?
    useEffect(()=>{
        if(postPaid){
            setResultVisible();
        }
    }, [postPaid]);

    return(
        <PaymentModal
            visible={showPayment}
            onCancel={clickPayment}
            title="결제"
            onOk = {onOk}
            footer={[ <div className="btnBox">
                <Button className='cancel' onClick={clickPayment}>취소</Button>
                <Button className='pay' onClick={onOk}>결제</Button>
            </div>]}
            >
            <div className="paymentPrice">
                결제금액 : <div>{allPrice}</div>원
            </div>
            <Banks
                tabKey={payWay}
                onTabClick={onTabClick}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                selectOnChange={onChangeSelectCompany}
                />
        </PaymentModal>
    );
};

export default Payment;