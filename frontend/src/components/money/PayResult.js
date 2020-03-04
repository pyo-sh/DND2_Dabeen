import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Result } from 'antd';

const PayResult = ({ setVisible }) => {
    const result = useSelector(state => state.basket.payResult);
    const errorReason = useSelector(state => state.basket.payPostErrorReason);
    return (
        <>
        {errorReason
        ?   <ResultPage
                status="404"
                title={errorReason.message}
                subTitle={errorReason.response.data.description}
                extra={[]}
                />
        :   <ResultPage
                status="success"
                title="결제가 성공적으로 완료되었습니다."
                subTitle={result.pymt_num&&"Order number : "+result.pymt_num+"   Price : "+result.pymt_price+"   Time : "+result.pymt_dttm.slice(0,10)+" T  "+result.pymt_dttm.slice(11,19)}
                extra={[]}
                />
        }
        </>
    );
};

const ResultPage = styled(Result)`
    & .pay {
        margin-left : 5px;
        background: #ff4300;
        color : white;
        transition : 0.3s;
        border: none;
        &:hover, :focus {
          outline: none;
          background: rgba(255,67,0,0.8);
          border : none;
        }
    }
`;

export default PayResult;