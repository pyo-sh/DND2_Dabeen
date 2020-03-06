import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { PaymentModal } from './Payment.style';

import Banks from './Banks';
import PayResult from './PayResult';
import { check_num } from "../signUp/InputFunctions";
import { inputCheckChangeHook } from "../../hooks/inputChangeHook";
import { payPostRequestAction } from '../../reducers/basket';
import { getCookie } from '../../utils/cookieFunction';

/* <PayResult setVisible={clickResult}/> */

const Payment = ({ userNum, showPayment, clickPayment, allPrice, selectHelps, reRenderFunction }) => {
    const dispatch = useDispatch();
    const [payWay, setPayWay] = useState("d");  // 결제 방법에 대한 State [d:무통장입금 / c:카드 / p:휴대폰 / m:마일리지]
    const [selectCompany, setSelectCompany] = useState("카카오");   // 카드/휴대폰일 때 은행/통신사 선택하는 State
    const [accountNumber, setAccountNumber] = inputCheckChangeHook("", [check_num]);    // 계좌 / 전화번호를 받기위해서 숫자만 받는다.
    const { ownMilege } = useSelector(state => state.user.me);  // 현재 로그인한 사람의 마일리지를 가져온다.
    const { postPaid, isPayingPost, payPostErrorReason } = useSelector(state => state.basket);  // Post에 대한 값을 지불하고 있을 때의 처리를 위한 bool redux
    const [isResult, setIsResult] = useState(false);    // 결과창을 보여줄 것인지? 말 것인지.

    // 각 결제에 대해서 올바른 값을 입력했는지? -> return false면 결제명령을 내리지 않는다.
    const checkIsRight = () => {
        switch(payWay){
            case "d":{
                // 무통장은 확인해야하지만 지금은 매커니즘이 없으므로 패스
                break;
            }
            case "c":{
                // 계좌의 길이는 12자리를 넘는다.
                if(accountNumber.length < 12){
                    alert('카드번호를 알맞게 적어주세요');
                    return false;
                }
                break;
            }
            case "p":{
                // 전화번호의 길이는 11자이다.
                if(accountNumber.length !== 11){
                    alert('핸드폰 번호를 알맞게 적어주세요');
                    return false;
                }
                break;
            }
            case "m":{
                // 결제가격이 보유 마일리지보다 작으면 안된다.
                if(allPrice > ownMilege){
                    alert('마일리지 가격이 안됩니다.');
                    return false;
                }
                break;
            }
        }
        return true;
    };

    // 결제 버튼을 눌렀을 때 선택된 것들이 selectBank와 카드번호  allPrice만큼 결제되는 로직 = > 결제후 결제 된 애들은 장바구니에서 빠짐.
    const onOk = useCallback((e) => {
        // 선택된 도움이 하나도 없을 경우 = 창이 닫히면서 사용자에게 알려준다.
        if(selectHelps.length === 0){
            alert('선택 된 도움이 없습니다.');
            clickPayment();
        }
        // 선택된 도움이 있을 경우
        else {
            // 사용자가 결제할 방법에 대해서 결제방법이 올바르다면?
            if(checkIsRight()){
                // 결제 axios를 위해 dispatch 한다.
                dispatch(payPostRequestAction({userNum, helpNums: selectHelps, payWay: payWay, cookie: getCookie()}));
                // 결제할 때 사용한 은행/통신사 및 계좌/전화번호. 후에 이용한다면 사용할 듯
            }
            // 올바르지 않은 것은 checkIsRight 함수에서 각자의 경고에 대한 alert 할 것임.
        }
    }, [selectHelps, selectCompany, accountNumber, payWay]);

    // Tabs[결제 방법]를 선택하는 onChange 함수
    const onTabClick = useCallback((key, event) => {
        setPayWay(key);
    }, []);
    // 은행/통신사 를 선택하는 onChange 함수
    const onChangeSelectCompany = useCallback((e) => {
        setSelectCompany(e.target.value);
    }, []);

    // 결제가 완료되었다면? = 결과창을 보여준다
    useEffect(()=>{
        // 한번 결제를 하고나서 계속 postPaid는 true이기 때문에 helps가 하나도 없다면 작동할일 없는 postPaid는 결제완료일리가 없다.
        if(postPaid && selectHelps.length !== 0){
            setIsResult(true);
        }
        else if(payPostErrorReason){
            setIsResult(true);
        }
        else{
            setIsResult(false);
        }
    }, [postPaid && selectHelps.length !== 0, payPostErrorReason]);

    return(
        <PaymentModal
            visible={showPayment}
            onCancel={clickPayment}
            title={isResult ? "결제 결과" : isPayingPost ? "결제 대기" : "결제"}
            onOk = {onOk}
            footer={[ <div key={1} className="btnBox">
                {isResult
                ?   <Button className='pay' onClick={reRenderFunction}>돌아가기</Button>
                :   isPayingPost
                    ?   <Button className='pay' loading>결제</Button>
                    :   <>
                            <Button className='cancel' onClick={clickPayment}>취소</Button>
                            <Button className='pay' onClick={onOk}>결제</Button>
                        </>
                }
            </div>]}
            >
            {isResult
            ?   <PayResult/>
            :   <>
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
                </>
            }
        </PaymentModal>
    );
};

// Props 설명 / types
Payment.propTypes = {
    userNum: PropTypes.string,  // 유저의 넘버를 받는다
    showPayment: PropTypes.bool,    // 현재 결재창의 Modal을 보여줄지 / 안 보여줄지 [상위 컴포넌트의 bool State]
    clickPayment: PropTypes.func,   // 결제창 Modal을 끄고 닫는 함수
    allPrice: PropTypes.number,     // 현재 결제하는 가격
    selectHelps: PropTypes.array,   // 선택된 도움들
    reRenderFunction: PropTypes.func,   // 결재 완료창을 누르고 reRender을 위한 함수
        // [상위 컴포넌트에서 rendering하기 위한 함수를 넘겨주면 된다] render하기 싫다면 비어있는 함수
};

export default Payment;